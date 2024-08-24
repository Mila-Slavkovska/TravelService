package com.example.travelservice.models;

import com.example.travelservice.models.enumerations.AttractionType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Attraction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long Id;
    String name;
    String description;
    String location;
    Double price;

    AttractionType type;

    public Attraction() {
    }

    public Attraction(String name, String description, String location, Double price, AttractionType type) {
        this.name = name;
        this.description = description;
        this.location = location;
        this.price = price;
        this.type = type;
    }
}
