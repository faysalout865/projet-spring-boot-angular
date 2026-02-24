package com.gt.produits.restcontrollers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.gt.produits.entities.Produit;
import com.gt.produits.service.ProduitService;

@RestController
@RequestMapping("/api")
@CrossOrigin // Mohima bzaf bach Angular y9der yconnecté
public class ProduitRESTController {

    @Autowired
    ProduitService produitService;

    // GET: Bach tjib ga3 les produits
    // URL: http://localhost:8080/api/all
    @RequestMapping(value="/all", method = RequestMethod.GET)
    public List<Produit> getAllProduits() {
        return produitService.getAllProduits();
    }

    // GET: Bach tjib produit wa7d b l'ID
    // URL: http://localhost:8080/api/1
    @RequestMapping(value="/{id}", method = RequestMethod.GET)
    public Produit getProduitById(@PathVariable("id") Long id) {
        return produitService.getProduit(id);
    }

    @RequestMapping(method = RequestMethod.POST)
    public Produit createProduit(@RequestBody Produit produit) {
        return produitService.saveProduit(produit);
    }

    // PUT: Bach tmodifier produit
    // URL: http://localhost:8080/api
    @RequestMapping(method = RequestMethod.PUT)
    public Produit updateProduit(@RequestBody Produit produit) {
        return produitService.updateProduit(produit);
    }

    // DELETE: Bach tsupprimer produit
    // URL: http://localhost:8080/api/1
    @RequestMapping(value="/{id}", method = RequestMethod.DELETE)
    public void deleteProduit(@PathVariable("id") Long id) {
        produitService.deleteProduitById(id);
    }
}