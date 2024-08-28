package com.example.travelservice.service.impl;

import com.example.travelservice.models.Attraction;
import com.example.travelservice.models.Accommodation;
import com.example.travelservice.models.Trip;
import com.example.travelservice.models.dto.TripDto;
import com.example.travelservice.models.exceptions.TripNotFoundException;
import com.example.travelservice.repository.TripRepository;
import com.example.travelservice.service.TripService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TripServiceImpl implements TripService {
    private final TripRepository tripRepository;

    public TripServiceImpl(TripRepository tripRepository) {
        this.tripRepository = tripRepository;
    }

    @Override
    public List<Trip> findAll() {
        return this.tripRepository.findAllByOrderByDate_from();
    }

    @Override
    public List<Trip> findByName(String name) {
        return this.tripRepository.findAllByNameContainingIgnoreCase(name);
    }

    @Override
    public Optional<Trip> findById(Long id) {
        return this.tripRepository.findById(id);
    }

    @Override
    public Optional<Trip> save(TripDto tripDto) {
        //TODO: handle hotels and attractions when CRUD is implemented
        List<Attraction> attractions = new ArrayList<>();
        List<Accommodation> accommodations = new ArrayList<>();
        Trip trip = new Trip(tripDto.name(), tripDto.budget(), tripDto.numPeople(), tripDto.date_from(), tripDto.date_to(), attractions, accommodations);
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
        // TODO: use Accommodations and Attractions service to map list of ids to list of entities
        trip.setAccommodations(new ArrayList<>());
        trip.setAttractions(new ArrayList<>());

        return Optional.of(this.tripRepository.save(trip));
    }

    @Override
    public void deleteById(Long id) {
        this.tripRepository.deleteById(id);
    }
}
