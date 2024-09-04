package com.example.travelservice.web.rest;

import com.example.travelservice.models.Trip;
import com.example.travelservice.models.dto.TripDto;
import com.example.travelservice.service.TripService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
@RequestMapping("/api/trips")
public class TripRestController {
    private final TripService tripService;
    public TripRestController(TripService tripService) {
        this.tripService = tripService;
    }

    @GetMapping
    public List<Trip> findTrips(@RequestParam(required = false) String name, HttpServletRequest request){
        String username = "";
        if(request.getHeader("Authorization") != null ){
            username = request.getUserPrincipal().getName();
        }

        if(name == null || name.isEmpty() || name.isBlank()){
            return this.tripService.findAll(username);
        }
        return this.tripService.findByName(username, name);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Trip> findById(@PathVariable Long id){
        return this.tripService.findById(id)
                .map(trip -> ResponseEntity.ok().body(trip))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Trip> save(@RequestBody TripDto tripDto, HttpServletRequest request){
        String username = "";
        if(request.getHeader("Authorization") != null ){
            username = request.getUserPrincipal().getName();
        }

        return this.tripService.save(tripDto, username)
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
