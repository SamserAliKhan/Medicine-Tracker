package com.medicare.medtracker.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

import java.time.LocalDateTime;

@Entity
@Table(name = "medicines")
public class Medicine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message = "Medicine name cannot be blank")
    private String name;
    private int totalQuantity;
    private int refillThreshold;
    private LocalDateTime lastUpdated;

    //  Associate medicine with a user
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // Constructors
    public Medicine() {}

    public Medicine(String name, int totalQuantity, int refillThreshold) {
        this.name = name;
        this.totalQuantity = totalQuantity;
        this.refillThreshold = refillThreshold;
        this.lastUpdated = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public int getTotalQuantity() {
        return totalQuantity;
    }

    public int getRefillThreshold() {
        return refillThreshold;
    }

    public LocalDateTime getLastUpdated() {
        return lastUpdated;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setTotalQuantity(int totalQuantity) {
        this.totalQuantity = totalQuantity;
        this.lastUpdated = LocalDateTime.now();
    }

    public void setRefillThreshold(int refillThreshold) {
        this.refillThreshold = refillThreshold;
    }

    public void setLastUpdated(LocalDateTime lastUpdated) {
        this.lastUpdated = lastUpdated;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
