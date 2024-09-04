package com.example.travelservice.service.impl;

import com.example.travelservice.models.Attraction;
import com.example.travelservice.models.dto.AttractionDto;
import com.example.travelservice.models.enumerations.AttractionType;
import com.example.travelservice.repository.AttractionsRepository;
import com.example.travelservice.service.AttractionsService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AttractionsServiceImpl implements AttractionsService {
    private final AttractionsRepository attractionsRepository;

    public AttractionsServiceImpl(AttractionsRepository attractionsRepository) {
        this.attractionsRepository = attractionsRepository;
    }

    @Override
    public List<Attraction> getAll() {
        return this.attractionsRepository.findAll();
    }

    @Override
    public Optional<Attraction> getById(Long Id) {
        return this.attractionsRepository.findById(Id);
    }
    @Override
    public Optional<Attraction> save(AttractionDto attractionDto) {
        Attraction a = new Attraction(
                attractionDto.name(),
                attractionDto.description(),
                attractionDto.location(),
                attractionDto.price(),
                attractionDto.type());
        this.attractionsRepository.save(a);
        return Optional.of(a);
    }

    @Override
    public Optional<Attraction> edit(Long id, AttractionDto attractionDto) {
        Attraction a = this.attractionsRepository.findById(id).orElseThrow(() -> new RuntimeException("Attraction not found"));
        a.setName(attractionDto.name());
        a.setDescription(attractionDto.description());
        a.setLocation(attractionDto.location());
        a.setPrice(attractionDto.price());
        a.setType(attractionDto.type());
        this.attractionsRepository.save(a);
        return Optional.of(a);
    }

    @Override
    public List<Attraction> findByNameAndLocation(String name, String location) {
        return this.attractionsRepository.findAllByNameContainingIgnoreCaseAndLocationContainingIgnoreCase(name, location);
    }

    @Override
    public void deleteById(Long id) {
        this.attractionsRepository.deleteById(id);
    }

    @Override
    public List<Attraction> findAllByLocation(String location) {
        return this.attractionsRepository.findAllByLocationContainingIgnoreCase(location);
    }

    @Override
    public List<Attraction> search(String name, String location, AttractionType type) {
        String enteredName = name, enteredLocation = location;
        if(name == null){
            enteredName = "";
        }
        if(location == null){
            enteredLocation = "";
        }
        if(type != null){
            return this.attractionsRepository.findAllByNameContainingIgnoreCaseAndLocationContainingIgnoreCaseAndType(enteredName, enteredLocation, type);
        } else {
            return this.attractionsRepository.findAllByNameContainingIgnoreCaseAndLocationContainingIgnoreCase(enteredName, enteredLocation);
        }
    }

}
