package com.medicare.medtracker.service;

import com.medicare.medtracker.dot.SignupRequest;
import com.medicare.medtracker.dot.LoginRequest;
import com.medicare.medtracker.models.User;
import com.medicare.medtracker.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    public String signup(SignupRequest req){
        if(userRepository.findByEmail(req.getEmail()).isPresent()){
            return "Email already registered!";
        }
        else{
            User user = new User();
            user.setEmail(req.getEmail());
            user.setPassword(encoder.encode(req.getPassword()));
            userRepository.save(user);
            return "user Registered successfully";
        }
    }
    public String login(LoginRequest req){
        return userRepository.findByEmail(req.getEmail()).map(
                user -> {
                    if(encoder.matches(req.getPassword(), user.getPassword()))
                        return "Login successful!";
                    else
                        return "Invalid password!";
                }
        ).orElse("User not found!");
    }
}
