package com.medicare.medtracker.controller;

import com.medicare.medtracker.dot.UserDTO;
import com.medicare.medtracker.models.User;
import com.medicare.medtracker.security.jwt.CustomUserDetails;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/user")
@CrossOrigin
public class UserController {

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@AuthenticationPrincipal CustomUserDetails userDetails) {
        try {
            if (userDetails == null) {
                return ResponseEntity.status(401).body(Map.of("error", "User not authenticated"));
            }

            User user = userDetails.getUserEntity();
            return ResponseEntity.ok(new UserDTO(
                    user.getName(),
                    user.getEmail(),
                    user.getPhoneNumber(),
                    user.getAge()
            ));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(Map.of("error", "User not authenticated"));
        }
    }
}

