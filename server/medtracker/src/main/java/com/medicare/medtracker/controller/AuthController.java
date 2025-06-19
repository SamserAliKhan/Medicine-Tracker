package com.medicare.medtracker.controller;

import com.medicare.medtracker.dot.*;
import com.medicare.medtracker.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/signup")
    public String Signup(@RequestBody SignupRequest req){
      return authService.signup(req);
    }

    @PostMapping("/login")
    public String Login(@RequestBody LoginRequest req){
        return authService.login(req);
    }
}
