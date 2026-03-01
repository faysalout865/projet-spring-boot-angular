package com.gt.produits.config;

import com.gt.produits.entities.Produit;
import com.gt.produits.entities.Role;
import com.gt.produits.entities.User;
import com.gt.produits.repos.ProduitRepository;
import com.gt.produits.repos.RoleRepository;
import com.gt.produits.repos.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.Date;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private ProduitRepository produitRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Initialize Roles if not exists
        Role adminRole = roleRepository.findByName("ROLE_ADMIN").orElse(null);
        if (adminRole == null) {
            adminRole = new Role();
            adminRole.setName("ROLE_ADMIN");
            adminRole = roleRepository.save(adminRole);
        }

        Role userRole = roleRepository.findByName("ROLE_USER").orElse(null);
        if (userRole == null) {
            userRole = new Role();
            userRole.setName("ROLE_USER");
            userRole = roleRepository.save(userRole);
        }

        // Initialize default Admin User
        if (!userRepository.existsByUsername("admin")) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("admin123")); // Default password
            admin.setRoles(Collections.singletonList(adminRole));
            userRepository.save(admin);
            System.out.println("Default Admin User created: admin / admin123");
        }

        // Initialize default Normal User for Testing
        if (!userRepository.existsByUsername("user")) {
            User normalUser = new User();
            normalUser.setUsername("user");
            normalUser.setPassword(passwordEncoder.encode("123")); // Testing password
            normalUser.setRoles(Collections.singletonList(userRole));
            userRepository.save(normalUser);
            System.out.println("Default Normal User created: user / 123");
        }

        // Initialize default Products
        if (produitRepository.count() == 0) {
            Produit p1 = new Produit("PC Dell G15", 12500.0, new Date(),
                    "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=1000&auto=format&fit=crop");
            Produit p2 = new Produit("MacBook Pro M3", 24000.0, new Date(),
                    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1000&auto=format&fit=crop");
            Produit p3 = new Produit("Souris Logitech G502", 450.0, new Date(),
                    "https://images.unsplash.com/photo-1615663245857-ac9319696043?q=80&w=1000&auto=format&fit=crop");
            produitRepository.save(p1);
            produitRepository.save(p2);
            produitRepository.save(p3);
            System.out.println("Default products created.");
        }
    }
}
