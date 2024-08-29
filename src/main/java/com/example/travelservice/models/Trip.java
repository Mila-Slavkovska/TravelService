package com.example.travelservice.models;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
public class Trip {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long Id;

    String name;
    @Min(value = 0, message = "Budget cannot be a negative number")
    Double budget;
    @Min(value = 0, message = "Number of people cannot be a negative number")
    Integer numPeople;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    LocalDateTime date_from;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    LocalDateTime date_to;
    @ManyToMany(fetch = FetchType.EAGER)
    List<Attraction> attractions;
    @ManyToMany(fetch = FetchType.EAGER)
    List<Accommodation> accommodations;


    public Trip() {
    }


    public Trip(String name, Double budget, Integer numPeople, LocalDateTime date_from, LocalDateTime date_to, List<Attraction> attractions, List<Accommodation> accommodations) {
        this.name = name;
        this.budget = budget;
        this.numPeople = numPeople;
        this.date_from = date_from;
        this.date_to = date_to;
        this.attractions = attractions;
        this.accommodations = accommodations;
    }
}
