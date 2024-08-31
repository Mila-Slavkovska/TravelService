package com.example.travelservice.service;

import com.example.travelservice.models.Attraction;
import com.example.travelservice.models.dto.AttractionDto;
import com.example.travelservice.models.enumerations.AttractionType;

import java.util.List;
import java.util.Optional;

public interface AttractionsService {
    List<Attraction> getAll();
    Optional<Attraction> getById(Long Id);
    void deleteById(Long id);
    List<Attraction> findAllByLocation(String location);
    List<Attraction> search(String name, String location, AttractionType type);
    Optional<Attraction> save(AttractionDto attractionDto);
    Optional<Attraction> edit(Long id, AttractionDto attractionDto);
}
