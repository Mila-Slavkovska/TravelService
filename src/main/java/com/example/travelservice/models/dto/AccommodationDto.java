package com.example.travelservice.models.dto;


import com.example.travelservice.models.enumerations.AccommodationType;

public record AccommodationDto(Long id, String name, String location, Double rating, Double pricePerNight, Integer amountOfPeople, AccommodationType accommodationType) {
    public AccommodationDto {
    }
}
