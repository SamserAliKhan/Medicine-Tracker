package com.medicare.medtracker.service;

import com.medicare.medtracker.dot.SignupRequest;
import com.medicare.medtracker.dot.LoginRequest;
import com.medicare.medtracker.models.User;
import com.medicare.medtracker.repository.UserRepository;
import com.medicare.medtracker.security.jwt.JwtUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    public void signup(SignupRequest req){
        if(userRepository.findByEmail(req.getEmail()).isPresent()){
            throw new RuntimeException("Email already registered");
        }
        else{
            User user = new User();
            user.setName(req.getName());
            user.setEmail(req.getEmail());
            user.setPassword(encoder.encode(req.getPassword()));
            user.setPhoneNumber(req.getPhone_number());
            user.setAge(req.getAge());
            userRepository.save(user);
        }
    }
    @Autowired
    private JwtUtils jwtUtil;

    public String login(LoginRequest req) {
        User user = userRepository.findByEmail(req.getEmail())
                .orElseThrow(() -> new RuntimeException("User Not Found!"));
        if (!encoder.matches(req.getPassword(), user.getPassword()))
            throw new RuntimeException("Invalid Password!");

        return jwtUtil.generateToken(user.getEmail()); // Return token on successful login
    }

}
