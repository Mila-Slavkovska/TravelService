package com.example.travelservice.models.dto;


import com.example.travelservice.models.enumerations.AccommodationType;
import com.fasterxml.jackson.annotation.JsonProperty;

public record AccommodationDto(Long id, String name, String location, Double rating, @JsonProperty("price per night")Double pricePerNight, Integer amountOfPeople, @JsonProperty("type")AccommodationType accommodationType) {
    public AccommodationDto {
    }
}
