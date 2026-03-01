import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProduitService, Produit } from '../../../services/produit.service';
import { TicketService } from '../../../services/ticket.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  produits: Produit[] = [];
  ticketStats: any = { totalTickets: 0, totalRevenue: 0 };
  isLoading = true;

  constructor(
    private produitService: ProduitService,
    private ticketService: TicketService
  ) {}

  ngOnInit() {
    this.produitService.getProduits().subscribe(data => {
      this.produits = data;
    });

    this.ticketService.getTicketStats().subscribe(stats => {
      this.ticketStats = stats;
      this.isLoading = false;
    });
  }

  exportProducts() {
    if (this.produits.length === 0) return;
    const csvRows = [];
    const headers = ['ID', 'Nom Produit', 'Prix (MAD)', 'Date Ajout'];
    csvRows.push(headers.join(','));

    for (const p of this.produits) {
      const dateStr = p.dateProduit ? new Date(p.dateProduit).toLocaleDateString() : '';
      const row = [
        p.idProduit,
        `"${p.nomProduit}"`,
        p.prixProduit,
        `"${dateStr}"`
      ];
      csvRows.push(row.join(','));
    }

    const csvData = csvRows.join('\n');
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'produits_export.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}
