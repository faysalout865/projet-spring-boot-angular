package com.gt.produits.restcontrollers;

import com.gt.produits.dto.AuthResponseDTO;
import com.gt.produits.dto.LoginDto;
import com.gt.produits.dto.RegisterDto;
import com.gt.produits.entities.Role;
import com.gt.produits.entities.User;
import com.gt.produits.repos.RoleRepository;
import com.gt.produits.repos.UserRepository;
import com.gt.produits.security.JWTGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JWTGenerator jwtGenerator;

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody LoginDto loginDto) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtGenerator.generateToken(authentication);
        return new ResponseEntity<>(new AuthResponseDTO(token), HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterDto registerDto) {
        if (userRepository.findByUsername(registerDto.getUsername()).isPresent()) {
            return new ResponseEntity<>("Username is already taken!", HttpStatus.BAD_REQUEST);
        }

        User user = new User();
        user.setUsername(registerDto.getUsername());
        user.setPassword(passwordEncoder.encode(registerDto.getPassword()));

        // Default role is USER. If they register "admin", we can give ADMIN.
        // This is a basic rule just for testing convenience.
        Role role = null;
        if (registerDto.getUsername().equalsIgnoreCase("admin")) {
            role = roleRepository.findByName("ROLE_ADMIN").orElseGet(() -> {
                Role r = new Role("ROLE_ADMIN");
                return roleRepository.save(r);
            });
        } else {
            role = roleRepository.findByName("ROLE_USER").orElseGet(() -> {
                Role r = new Role("ROLE_USER");
                return roleRepository.save(r);
            });
        }

        user.setRoles(Collections.singletonList(role));
        userRepository.save(user);

        return new ResponseEntity<>("User registered successfully!", HttpStatus.OK);
    }
}
