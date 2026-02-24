package com.gt.produits;

import java.util.Date;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import com.gt.produits.entities.Produit;
import com.gt.produits.repos.ProduitRepository;

@SpringBootTest // Bach Spring lansi l'context dyal test
class ProduitsApplicationTests {

	@Autowired // Injection dyal repository bach n-khdmo b les méthodes dyalo
	private ProduitRepository produitRepository;

	// 1. Test dyal l'Ajout (Create)
	@Test
	public void testCreateProduit() {
		// Kan-creew objet jdid mn Produit
		Produit prod = new Produit("PC Dell", 2200.500, new Date());
		// Kan-sauvegarder l'objet f database
		produitRepository.save(prod);
	}

	// 2. Test dyal Recherche (Read)
	@Test
	public void testFindProduit() {
		// Kan-jibo l'produit lwel (dynamic ID)
		List<Produit> prods = produitRepository.findAll();
		if (!prods.isEmpty()) {
			Produit p = produitRepository.findById(prods.get(0).getIdProduit()).get();
			System.out.println(p); // Affichage f console
		}
	}

	// 3. Test dyal Modification (Update)
	@Test
	public void testUpdateProduit() {
		// Kan-jibo l'produit lwel
		List<Produit> prods = produitRepository.findAll();
		if (!prods.isEmpty()) {
			Produit p = prods.get(0);
			// Kan-bedlo lih l'prix
			p.setPrixProduit(1000.0);
			// Kan-sauvegarder l'modification
			produitRepository.save(p);
		}
	}

	// 4. Test dyal Suppression (Delete)
	@Test
	public void testDeleteProduit() {
		// Kan-ms-7o l'produit lwel
		List<Produit> prods = produitRepository.findAll();
		if (!prods.isEmpty()) {
			produitRepository.deleteById(prods.get(0).getIdProduit());
		}
	}

	// 5. Test dyal l'Affichage de tous les produits
	@Test
	public void testListerTousProduits() {
		// Kan-jibo liste fiha kolchi
		List<Produit> prods = produitRepository.findAll();
		for (Produit p : prods) { // Boucle bach n-affichiw kol wa7d
			System.out.println(p);
		}
	}
}
