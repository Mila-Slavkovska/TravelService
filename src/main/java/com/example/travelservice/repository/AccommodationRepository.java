package com.example.travelservice.repository;

import com.example.travelservice.models.Accommodation;
import com.example.travelservice.models.enumerations.AccommodationType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface AccommodationRepository extends JpaRepository<Accommodation, Long> {
    List<Accommodation> findAllByLocationOrderByRating(String location);
    List<Accommodation> findAllByLocationLikeAndAccommodationTypeOrderByRating(String location, AccommodationType accommodationType);
    List<Accommodation> findAllByPricePerNightLessThanOrderByRating(Double price);
}
