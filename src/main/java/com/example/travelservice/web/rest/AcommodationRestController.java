package com.example.travelservice.web.rest;

import com.example.travelservice.models.Accommodation;
import com.example.travelservice.models.dto.AccommodationDto;
import com.example.travelservice.service.AccommodationService;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/accommodations")
public class AcommodationRestController {
    private final AccommodationService accommodationService;

    public AcommodationRestController(AccommodationService accommodationService) {
        this.accommodationService = accommodationService;
    }
    @GetMapping
    private List<Accommodation> listAllAccommodations() {
        return this.accommodationService.listAllAccommodations();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Accommodation> findById(@PathVariable Long id) {
        return this.accommodationService.findById(id)
                .map(accommodation -> ResponseEntity.ok().body(accommodation))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }


    @PostMapping
    public ResponseEntity<Accommodation> save(@RequestBody AccommodationDto accommodationDto) {
        return this.accommodationService.create(accommodationDto)
                .map(accommodation -> ResponseEntity.ok().body(accommodation))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }


    @PutMapping("/{id}")
    public ResponseEntity<Accommodation> save(@PathVariable Long id, @RequestBody AccommodationDto accommodationDto) {
        return this.accommodationService.update(id, accommodationDto)
                .map(accommodation -> ResponseEntity.ok().body(accommodation))
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity deleteById(@PathVariable Long id) {
        this.accommodationService.deleteById(id);
        return ResponseEntity.ok().build();
    }



}