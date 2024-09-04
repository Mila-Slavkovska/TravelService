package com.example.travelservice.service.impl;

import com.example.travelservice.models.Attraction;
import com.example.travelservice.models.Accommodation;
import com.example.travelservice.models.Trip;
import com.example.travelservice.models.User;
import com.example.travelservice.models.dto.TripDto;
import com.example.travelservice.models.exceptions.TripNotFoundException;
import com.example.travelservice.models.exceptions.UserNotFoundException;
import com.example.travelservice.repository.TripRepository;
import com.example.travelservice.repository.UserRepository;
import com.example.travelservice.service.AccommodationService;
import com.example.travelservice.service.AttractionsService;
import com.example.travelservice.service.TripService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TripServiceImpl implements TripService {
    private final TripRepository tripRepository;
    private final AttractionsService attractionsService;
    private final AccommodationService accommodationService;
    private final UserRepository userRepository;

    public TripServiceImpl(TripRepository tripRepository, AttractionsService attractionsService, AccommodationService accommodationService, UserRepository userRepository) {
        this.tripRepository = tripRepository;
        this.attractionsService = attractionsService;
        this.accommodationService = accommodationService;
        this.userRepository = userRepository;
    }

    public List<Attraction> mapToAttractions(List<Long> attractionIds){
        List<Attraction> attractions;
        if(attractionIds != null && !attractionIds.isEmpty()){
            attractions = attractionIds.stream()
                    .map(a -> this.attractionsService.getById(a)
                            .orElseThrow(() -> new RuntimeException("Attraction not found for ID: " + a)))
                    .collect(Collectors.toList());
        } else {
            attractions = new ArrayList<>();
        }

        return attractions;
    }

    public List<Accommodation> mapToAccommodations(List<Long> accommodationIds){
        List<Accommodation> accommodations;
        if(accommodationIds != null && !accommodationIds.isEmpty()){
            accommodations = accommodationIds.stream()
                    .map(a -> this.accommodationService.findById(a)
                            .orElseThrow(() -> new RuntimeException("Accommodation not found for ID: " + a)))
                    .collect(Collectors.toList());
        } else {
            accommodations = new ArrayList<>();
        }

        return accommodations;
    }

    @Override
    public List<Trip> findAll(String username) {
        return this.tripRepository.findAllByOrderByDate_from(username);
    }

    @Override
    public List<Trip> findByName(String email, String name) {
        return this.tripRepository.findAllByUserEmailAndNameContainingOrderByDateFromDesc(email, name);
    }

    @Override
    public Optional<Trip> findById(Long id) {
        return this.tripRepository.findById(id);
    }

    @Override
    public Optional<Trip> save(TripDto tripDto, String username) {
        List<Attraction> attractions = mapToAttractions(tripDto.attractions());
        List<Accommodation> accommodations = mapToAccommodations(tripDto.accommodations());
        User user = this.userRepository.findByEmail(username)
                .orElseThrow(() -> new UserNotFoundException(username));

        Trip trip = new Trip(tripDto.name(), tripDto.budget(), tripDto.numPeople(), tripDto.date_from(), tripDto.date_to(), attractions, accommodations, user);
        return Optional.of(this.tripRepository.save(trip));
    }

    @Override
    public Optional<Trip> edit(Long id, TripDto tripDto) {
        Trip trip = this.tripRepository.findById(id)
                .orElseThrow(() -> new TripNotFoundException(id));

        trip.setName(tripDto.name() != null ? tripDto.name() : trip.getName());
        trip.setBudget(tripDto.budget() != null ? tripDto.budget() : trip.getBudget());
        trip.setNumPeople(tripDto.numPeople() != null ? tripDto.numPeople() : trip.getNumPeople());
        trip.setDate_from(tripDto.date_from() != null ? tripDto.date_from() : trip.getDate_from());
        trip.setDate_to(tripDto.date_to() != null ? tripDto.date_to() : trip.getDate_to());
        trip.setAccommodations(tripDto.accommodations() != null ? mapToAccommodations(tripDto.accommodations()) : trip.getAccommodations());
        trip.setAttractions(tripDto.attractions() != null ? mapToAttractions(tripDto.attractions()) : trip.getAttractions());

        return Optional.of(this.tripRepository.save(trip));
    }

    @Override
    public void deleteById(Long id) {
        this.tripRepository.deleteById(id);
    }
}
