package com.gt.produits.restcontrollers;

import com.gt.produits.entities.User;
import com.gt.produits.entities.Role;
import com.gt.produits.repos.UserRepository;
import com.gt.produits.repos.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class UserRESTController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @RequestMapping(method = RequestMethod.GET)
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @RequestMapping(method = RequestMethod.POST)
    public User createUser(@RequestBody User newUser) {
        if (userRepository.existsByUsername(newUser.getUsername())) {
            throw new RuntimeException("Username already exists!");
        }
        newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));

        Role userRole = roleRepository.findByName("ROLE_USER").orElse(null);
        if (userRole != null) {
            newUser.setRoles(Collections.singletonList(userRole));
        }

        return userRepository.save(newUser);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void deleteUser(@PathVariable("id") Long id) {
        userRepository.deleteById(id);
    }
}
