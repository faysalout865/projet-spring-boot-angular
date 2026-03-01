import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProduitService, Produit } from '../../../services/produit.service';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inventory.component.html'
})
export class InventoryComponent implements OnInit {
  produits: Produit[] = [];
  filteredProduits: Produit[] = [];
  searchTerm: string = '';
  
  showModal: boolean = false;
  editingProduit: Produit = { nomProduit: '', prixProduit: 0, dateProduit: new Date(), imageUrl: '' };

  constructor(private produitService: ProduitService) {}

  ngOnInit() {
    this.loadProduits();
  }

  loadProduits() {
    this.produitService.getProduits().subscribe(data => {
      this.produits = data;
      this.filteredProduits = data;
    });
  }

  filter() {
    this.filteredProduits = this.produits.filter(p => 
      p.nomProduit.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  openModal(produit?: Produit) {
    if (produit) {
      // Create a copy to edit
      this.editingProduit = { ...produit };
      // Format date for date input
      if (this.editingProduit.dateProduit) {
        this.editingProduit.dateProduit = new Date(this.editingProduit.dateProduit);
      }
    } else {
      this.editingProduit = { nomProduit: '', prixProduit: 0, dateProduit: new Date(), imageUrl: '' };
    }
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  saveProduit() {
    const payload = { ...this.editingProduit };
    // Convert string date (yyyy-MM-dd) to actual JS Date so Spring parses it properly without crashing
    if (payload.dateProduit && typeof payload.dateProduit === 'string') {
      payload.dateProduit = new Date(payload.dateProduit);
    }
    
    if (payload.idProduit) {
      this.produitService.updateProduit(payload.idProduit, payload).subscribe(() => {
        this.loadProduits();
        this.closeModal();
      });
    } else {
      this.produitService.createProduit(payload).subscribe(() => {
        this.loadProduits();
        this.closeModal();
      });
    }
  }

  deleteProduit(id: number) {
    if(confirm('Are you sure you want to delete this product?')) {
      this.produitService.deleteProduit(id).subscribe(() => {
        this.loadProduits();
      });
    }
  }
}
