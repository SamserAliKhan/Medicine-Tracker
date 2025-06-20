package com.medicare.medtracker.controller;

import com.medicare.medtracker.dot.*;
import com.medicare.medtracker.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<String> Signup(@Valid @RequestBody SignupRequest req){
        authService.signup(req);
      return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<String> Login(@RequestBody LoginRequest req){
         try{
             authService.login(req);
             return ResponseEntity.ok("Login Successful");
         }catch (RuntimeException err){
             return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(err.getMessage());
         }
    }
}
