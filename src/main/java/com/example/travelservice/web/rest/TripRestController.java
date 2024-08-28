package com.example.travelservice.web.rest;

import com.example.travelservice.models.Trip;
import com.example.travelservice.models.dto.TripDto;
import com.example.travelservice.service.TripService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trips")
public class TripRestController {
    private final TripService tripService;
    public TripRestController(TripService tripService) {
        this.tripService = tripService;
    }

    @GetMapping
    public List<Trip> findTrips(@RequestParam(required = false) String name){
        if(name == null || name.isEmpty() || name.isBlank()){
            return this.tripService.findAll();
        }
        return this.tripService.findByName(name);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Trip> findById(@PathVariable Long id){
        return this.tripService.findById(id)
                .map(trip -> ResponseEntity.ok().body(trip))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Trip> save(@RequestBody TripDto tripDto){
        return this.tripService.save(tripDto)
                .map(trip -> ResponseEntity.ok().body(trip))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Trip> edit(@PathVariable Long id, @RequestBody TripDto tripDto){
        return this.tripService.edit(id, tripDto)
                .map(trip -> ResponseEntity.ok().body(trip))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id){
        this.tripService.deleteById(id);
    }
}
