package com.example.travelservice.models;
import jakarta.persistence.*;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
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
    Double budget;
    Integer numPeople;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    LocalDateTime date_from;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    LocalDateTime date_to;
    @ManyToMany
    List<Attractions> attractions;
    @ManyToOne
    Hotel hotel;

    public Trip() {
    }

    public Trip(String name, Double budget, Integer numPeople, LocalDateTime date_from, LocalDateTime date_to, List<Attractions> attractions, Hotel hotel) {
        this.name = name;
        this.budget = budget;
        this.numPeople = numPeople;
        this.date_from = date_from;
        this.date_to = date_to;
        this.attractions = new ArrayList<>();
        this.hotel = hotel;
    }
}
