package com.gt.produits.repos;

import com.gt.produits.entities.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {

    @Query("SELECT SUM(t.totalAmount) FROM Ticket t")
    Double sumTotalAmount();
}
