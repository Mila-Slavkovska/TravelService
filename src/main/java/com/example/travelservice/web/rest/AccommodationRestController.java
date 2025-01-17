package com.example.travelservice.web.rest;

import com.example.travelservice.models.Accommodation;
import com.example.travelservice.models.dto.AccommodationDto;
import com.example.travelservice.models.enumerations.AccommodationType;
import com.example.travelservice.service.AccommodationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
@RequestMapping("/api/accommodations")
public class AccommodationRestController {
    private final AccommodationService accommodationService;

    public AccommodationRestController(AccommodationService accommodationService) {
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

    @GetMapping("/find")
    public List<Accommodation> search(@RequestParam(required = false) String name,
                                   @RequestParam(required = false) String location,
                                   @RequestParam(required = false) AccommodationType type){
        return this.accommodationService.search(name, location, type);
    }
    @GetMapping("/findAllByName")
    public List<Accommodation> search(@RequestParam(required = false) String name,
                                      @RequestParam(required = false) String location){
        return this.accommodationService.findByNameAndLocation(name, location);
    }

    @GetMapping("/toprated")
    public List<Accommodation> listTopRatedAccommodations() {
        return this.accommodationService.findAllByOrderByRatingDesc();
    }

}