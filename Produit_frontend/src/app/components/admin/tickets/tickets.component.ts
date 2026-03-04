import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketService, Ticket } from '../../../services/ticket.service';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.css',
})
export class TicketsComponent implements OnInit {
  tickets: Ticket[] = [];
  isLoading = true;

  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets(): void {
    this.isLoading = true;
    this.ticketService.getAllTickets().subscribe({
      next: (data) => {
        // Sort by id directly, assuming idTicket goes up over time
        this.tickets = data.sort((a, b) => (b.idTicket || 0) - (a.idTicket || 0));
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching tickets', error);
        this.isLoading = false;
      }
    });
  }
}

