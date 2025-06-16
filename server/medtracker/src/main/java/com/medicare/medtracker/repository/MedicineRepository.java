package com.medicare.medtracker.repository;

import com.medicare.medtracker.models.Medicine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MedicineRepository extends JpaRepository<Medicine, Long> {

    // You can define custom queries if needed, like:
    // List<Medicine> findByName(String name);
}
