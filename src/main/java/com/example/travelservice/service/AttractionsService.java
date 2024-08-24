package com.example.travelservice.service;

import com.example.travelservice.models.Attraction;
import com.example.travelservice.models.dto.AttractionDto;

import java.util.List;
import java.util.Optional;

public interface AttractionsService {
    List<Attraction> getAll();
    Optional<Attraction> getById(Long Id);
    void deleteById(Long id);
    List<Attraction> findAllByLocation(String location);
    Optional<Attraction> save(AttractionDto attractionDto);
    Optional<Attraction> edit(Long id, AttractionDto attractionDto);
}
