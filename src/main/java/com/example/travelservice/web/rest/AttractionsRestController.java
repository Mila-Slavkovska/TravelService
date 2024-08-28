package com.example.travelservice.web.rest;

import com.example.travelservice.models.Attraction;
import com.example.travelservice.models.dto.AttractionDto;
import com.example.travelservice.service.AttractionsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/attractions")
public class AttractionsRestController {

    private final AttractionsService attractionsService;

    public AttractionsRestController(AttractionsService attractionsService) {
        this.attractionsService = attractionsService;
    }
    @GetMapping
    private List<Attraction> findAll() {
        return this.attractionsService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Attraction> findById(@PathVariable Long id) {
        return this.attractionsService.getById(id)
                .map(attraction -> ResponseEntity.ok().body(attraction))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/add")
    public ResponseEntity<Attraction> save(@RequestBody AttractionDto attractionDto) {
        return this.attractionsService.save(attractionDto)
                .map(attraction -> ResponseEntity.ok().body(attraction))
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<Attraction> save(@PathVariable Long id, @RequestBody AttractionDto attractionDto) {
        return this.attractionsService.edit(id, attractionDto)
                .map(attraction -> ResponseEntity.ok().body(attraction))
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity deleteById(@PathVariable Long id) {
        this.attractionsService.deleteById(id);
        if (this.attractionsService.getById(id).isEmpty()) return ResponseEntity.ok().build();
        return ResponseEntity.badRequest().build();
    }

}
