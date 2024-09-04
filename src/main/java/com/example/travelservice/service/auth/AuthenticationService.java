package com.example.travelservice.service.auth;

import com.example.travelservice.models.dto.LoginUserDto;
import com.example.travelservice.models.dto.RegisterUserDto;
import com.example.travelservice.models.User;
import com.example.travelservice.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
@Service
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthenticationService(
            UserRepository userRepository,
            AuthenticationManager authenticationManager,
            PasswordEncoder passwordEncoder
    ) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User signup(RegisterUserDto input) {
        try {
            User user = new User(input.getFullName(), input.getEmail(), passwordEncoder.encode(input.getPassword()));
            return userRepository.save(user);
        } catch (Exception e) {
            // Log the error or handle it accordingly
            e.printStackTrace();  // Or use a logger
            throw new RuntimeException("Error saving user", e);
        }
    }

    public User authenticate(LoginUserDto input) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        input.getEmail(),
                        input.getPassword()
                )
        );

        return userRepository.findByEmail(input.getEmail())
                .orElseThrow();
    }
}
