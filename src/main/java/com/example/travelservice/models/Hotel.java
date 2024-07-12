package com.example.travelservice.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
public class Hotel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long Id;
    String name;
    String location;
    Double rating;
    Double pricePerNight;

    public Hotel() {
    }

    public Hotel(String name, String location, Double rating, Double pricePerNight) {
        this.name = name;
        this.location = location;
        this.rating = rating;
        this.pricePerNight = pricePerNight;
    }
}
