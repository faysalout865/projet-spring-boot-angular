import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ProduitService, Produit } from '../../services/produit.service';
import { AuthService } from '../../services/auth.service';
import { TicketService } from '../../services/ticket.service';

interface CartItem extends Produit {
  quantity: number;
}

@Component({
  selector: 'app-pos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.css']
})
export class PosComponent implements OnInit {
  produits: Produit[] = [];
  cart: CartItem[] = [];
  taxRate = 0.20; // 20%
  currentDate = new Date();

  constructor(
    private produitService: ProduitService, 
    public authService: AuthService,
    private ticketService: TicketService,
    private router: Router
  ) {}

  ngOnInit() {
    this.produitService.getProduits().subscribe(data => this.produits = data);
    
    // Update receipt clock
    setInterval(() => {
      this.currentDate = new Date();
    }, 1000);
  }

  addToCart(produit: Produit) {
    const existing = this.cart.find(item => item.idProduit === produit.idProduit);
    if (existing) {
      existing.quantity++;
    } else {
      this.cart.push({ ...produit, quantity: 1 });
    }
  }

  updateQuantity(item: CartItem, delta: number) {
    item.quantity += delta;
    if (item.quantity <= 0) {
      this.cart = this.cart.filter(c => c.idProduit !== item.idProduit);
    }
  }

  getSubtotal() {
    return this.cart.reduce((acc, item) => acc + (item.prixProduit * item.quantity), 0);
  }

  getTax() {
    return 0; // Removed tax per user request
  }

  getTotal() {
    return this.getSubtotal();
  }

  currentTicketId: number = 12454;

  printReceipt() {
    if (this.cart.length === 0) return;
    const totalAmount = this.getTotal();
    
    this.ticketService.createTicket({ totalAmount }).subscribe({
      next: (ticket: any) => {
        this.currentTicketId = ticket?.idTicket || Math.floor(10000 + Math.random() * 90000);
        // Automatically open the print dialog when ticket is saved
        setTimeout(() => {
           window.print();
           this.cart = []; // clear cart after successful print dialog triggers
        }, 10); // Wait just enough a tick for binding update on currentTicketId
      },
      error: (err) => console.error('Could not save ticket', err)
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
