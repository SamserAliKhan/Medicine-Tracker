package com.medicare.medtracker.controller;

import com.medicare.medtracker.models.Medicine;
import com.medicare.medtracker.repository.MedicineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/medicines")
@CrossOrigin(origins = "*") // allows frontend (like React) to access this API
public class MedicineController {

    @Autowired
    private MedicineRepository medicineRepository;

    // ✅ GET all medicines
    @GetMapping
    public List<Medicine> getAllMedicines() {
        return medicineRepository.findAll();
    }

    // ✅ GET medicine by ID
    @GetMapping("/{id}")
    public Optional<Medicine> getMedicineById(@PathVariable Long id) {
        return medicineRepository.findById(id);
    }

    // ✅ POST a new medicine
    @PostMapping
    public Medicine createMedicine(@RequestBody Medicine medicine) {
        return medicineRepository.save(medicine);
    }

    // ✅ PUT (update) an existing medicine
    @PutMapping("/{id}")
    public Medicine updateMedicine(@PathVariable Long id, @RequestBody Medicine updatedMedicine) {
        return medicineRepository.findById(id).map(medicine -> {
            medicine.setName(updatedMedicine.getName());
            medicine.setTotalQuantity(updatedMedicine.getTotalQuantity());
            medicine.setRefillThreshold(updatedMedicine.getRefillThreshold());
            medicine.setLastUpdated(updatedMedicine.getLastUpdated());
            return medicineRepository.save(medicine);
        }).orElseGet(() -> {
            updatedMedicine.setId(id);
            return medicineRepository.save(updatedMedicine);
        });
    }

    // ✅ DELETE a medicine by ID
    @DeleteMapping("/{id}")
    public void deleteMedicine(@PathVariable Long id) {
        medicineRepository.deleteById(id);
    }
}
