package com.gt.produits.restcontrollers;

import com.gt.produits.entities.Ticket;
import com.gt.produits.repos.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tickets")
@CrossOrigin
public class TicketRESTController {

    @Autowired
    private TicketRepository ticketRepository;

    @RequestMapping(method = RequestMethod.GET)
    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }

    @RequestMapping(value = "/stats", method = RequestMethod.GET)
    public Map<String, Object> getTicketStats() {
        Map<String, Object> stats = new HashMap<>();
        long count = ticketRepository.count();
        Double total = ticketRepository.sumTotalAmount();

        stats.put("totalTickets", count);
        stats.put("totalRevenue", total != null ? total : 0.0);
        return stats;
    }

    @RequestMapping(method = RequestMethod.POST)
    public Ticket createTicket(@RequestBody Ticket ticket) {
        return ticketRepository.save(ticket);
    }
}
