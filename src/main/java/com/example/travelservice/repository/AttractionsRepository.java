package com.example.travelservice.repository;

import com.example.travelservice.models.Attraction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AttractionsRepository extends JpaRepository<Attraction, Long> {
    List<Attraction> findAllByLocationContainingIgnoreCase(String location);
}
