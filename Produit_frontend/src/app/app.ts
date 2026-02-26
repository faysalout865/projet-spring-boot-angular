import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProduitService } from './services/produit.service';
import { Produit } from './models/produit';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  produits: Produit[] = [];
  nouveauProduit: Produit = { nomProduit: '', prixProduit: 0, dateProduit: new Date() };
  produitEnEdition: Produit | null = null;
  isModalOpen = false;
  isSubmitting = false;

  constructor(private produitService: ProduitService) {}

  ngOnInit(): void {
    this.chargerProduits();
  }

  chargerProduits(): void {
    this.produitService.getAllProduits().subscribe(data => {
      this.produits = data;
    });
  }

  totalValue(): number {
    return this.produits.reduce((acc, p) => acc + p.prixProduit, 0);
  }

  ouvrirModal(produit?: Produit): void {
    if (produit) {
      this.produitEnEdition = { ...produit };
      this.nouveauProduit = { ...produit };
    } else {
      this.produitEnEdition = null;
      this.nouveauProduit = { nomProduit: '', prixProduit: 0, dateProduit: new Date() };
    }
    this.isSubmitting = false;
    this.isModalOpen = true;
  }

  fermerModal(): void {
    this.isModalOpen = false;
    this.isSubmitting = false;
  }

  sauvegarderProduit(): void {
    if (this.isSubmitting) return; // Prevent double clicks
    
    // Ensure prix is a number
    this.nouveauProduit.prixProduit = Number(this.nouveauProduit.prixProduit);
    
    this.isSubmitting = true;

    if (this.produitEnEdition) {
      this.produitService.updateProduit(this.nouveauProduit).subscribe({
        next: () => {
          this.chargerProduits();
          this.fermerModal();
        },
        error: (err) => {
          console.error("Error updating product:", err);
          alert("Erreur lors de la modification : " + (err.error?.message || err.message || 'Erreur inconnue'));
          this.isSubmitting = false;
        }
      });
    } else {
      this.nouveauProduit.dateProduit = new Date(); // Date du jour
      this.produitService.saveProduit(this.nouveauProduit).subscribe({
        next: () => {
          this.chargerProduits();
          this.fermerModal();
        },
        error: (err) => {
          console.error("Error saving product:", err);
          alert("Erreur lors de la sauvegarde : " + (err.error?.message || err.message || 'Erreur inconnue'));
          this.isSubmitting = false;
        }
      });
    }
  }

  supprimerProduit(p: Produit): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      if(p.idProduit) {
         this.produitService.deleteProduit(p.idProduit).subscribe({
           next: () => {
             this.chargerProduits();
           },
           error: (err) => {
             console.error("Error deleting product:", err);
             // Sometimes a backend returns 200 OK but invalid JSON, which throws an error. We refresh anyway.
             this.chargerProduits();
           }
         });
      }
    }
  }
}
