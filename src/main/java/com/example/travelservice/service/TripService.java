package com.example.travelservice.service;

import com.example.travelservice.models.Trip;
import com.example.travelservice.models.dto.TripDto;

import java.util.List;
import java.util.Optional;

public interface TripService {
    List<Trip> findAll(String username);
    List<Trip> findByName(String username, String name);
    Optional<Trip> findById(Long id);
    Optional<Trip> save(TripDto tripDto, String username);
    Optional<Trip> edit(Long id, TripDto tripDto);
    void deleteById(Long id);
}
