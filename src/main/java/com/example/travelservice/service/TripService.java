package com.example.travelservice.service;

import com.example.travelservice.models.Trip;
import com.example.travelservice.models.dto.TripDto;

import java.util.List;
import java.util.Optional;

public interface TripService {
    //TODO: filter by user
    List<Trip> findAll();
    List<Trip> findByName(String name);
    Optional<Trip> findById(Long id);
    Optional<Trip> save(TripDto tripDto);
    Optional<Trip> edit(Long id, TripDto tripDto);
    void deleteById(Long id);
}
