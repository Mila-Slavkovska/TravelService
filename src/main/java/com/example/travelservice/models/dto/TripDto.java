package com.example.travelservice.models.dto;

import java.time.LocalDateTime;
import java.util.List;

public record TripDto(Long id, String name, Double budget, Integer numPeople, LocalDateTime date_from, LocalDateTime date_to, List<Long> attractions, List<Long> accommodations) {
}
