package com.medicare.medtracker.controller;

import com.medicare.medtracker.models.Medicine;
import com.medicare.medtracker.models.User;
import com.medicare.medtracker.repository.MedicineRepository;
import com.medicare.medtracker.security.jwt.CurrentUser;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/medicines")
@CrossOrigin(origins = "*")
public class MedicineController {

    @Autowired
    private MedicineRepository medicineRepository;

    @Autowired
    private CurrentUser currentUser;

    // ✅ GET all medicines for logged-in user
    @GetMapping
    public List<Medicine> getAllMedicinesForUser() {
        User user = currentUser.get();
        return medicineRepository.findByUser(user); // Requires this custom repo method
    }

    // ✅ GET medicine by ID for logged-in user
    @GetMapping("/{id}")
    public ResponseEntity<Object> getMedicineById(@PathVariable Long id) {
        User user = currentUser.get();

        return medicineRepository.findByIdAndUser(id, user)
                .<ResponseEntity<Object>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(403).body("Unauthorized access or medicine not found"));
    }


    // ✅ POST new medicine (for logged-in user)
    @PostMapping
    public ResponseEntity<?> addMedicine(@Valid @RequestBody Medicine medicine) {
        try{
            User user = currentUser.get();
            medicine.setUser(user); // Associate with logged-in user
            return ResponseEntity.ok(medicineRepository.save(medicine));

        }catch (Exception err){
            err.printStackTrace(); // log the error
            return ResponseEntity.status(500).body("🔥 Internal Error: " + err.getMessage());

        }
    }

    // ✅ UPDATE medicine only if belongs to user
    @PutMapping("/{id}")
    public ResponseEntity<Object> updateMedicine(@PathVariable Long id, @RequestBody Medicine updated) {
        User user = currentUser.get();

        return medicineRepository.findByIdAndUser(id, user)
                .<ResponseEntity<Object>>map(medicine -> {
                    medicine.setName(updated.getName());
                    medicine.setTotalQuantity(updated.getTotalQuantity());
                    medicine.setRefillThreshold(updated.getRefillThreshold());
                    medicine.setLastUpdated(updated.getLastUpdated());
                    Medicine saved = medicineRepository.save(medicine);
                    return ResponseEntity.ok(saved);
                })
                .orElseGet(() -> ResponseEntity.status(403).body("Unauthorized or not found"));
    }


    // ✅ DELETE medicine if owned by user
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMedicine(@PathVariable Long id) {
        User user = currentUser.get();
        return medicineRepository.findByIdAndUser(id, user).map(medicine -> {
            medicineRepository.delete(medicine);
            return ResponseEntity.ok("Deleted successfully");
        }).orElse(ResponseEntity.status(403).body("Unauthorized or not found"));
    }
}
