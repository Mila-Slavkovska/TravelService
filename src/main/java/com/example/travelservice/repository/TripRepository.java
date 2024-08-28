package com.example.travelservice.repository;

import com.example.travelservice.models.Trip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TripRepository extends JpaRepository<Trip, Long> {
    List<Trip> findAllByNameContainingIgnoreCase(String name);
}
