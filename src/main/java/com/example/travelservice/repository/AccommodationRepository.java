package com.example.travelservice.repository;

import com.example.travelservice.models.Accommodation;
import com.example.travelservice.models.enumerations.AccommodationType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface AccommodationRepository extends JpaRepository<Accommodation, Long> {
    List<Accommodation> findAllByLocationOrderByRatingDesc(String location);
    List<Accommodation> findAllByLocationLikeAndAccommodationTypeOrderByRatingDesc(String location, AccommodationType accommodationType);
    List<Accommodation> findAllByPricePerNightLessThanOrderByRatingDesc(Double price);
    List<Accommodation> findAllByNameContainingIgnoreCaseAndLocationContainingIgnoreCaseOrderByRatingDesc(String name, String location);
    List<Accommodation> findAllByNameContainingIgnoreCaseAndLocationContainingIgnoreCaseAndAccommodationTypeOrderByRatingDesc(String name, String location, AccommodationType type);
}
