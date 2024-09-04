package com.example.travelservice.models;

import com.example.travelservice.models.enumerations.AccommodationType;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Accommodation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long Id;
    String name;
    String location;
    Double rating;
    Double pricePerNight;

    Integer amountOfPeople;
    @Enumerated(EnumType.STRING)
    AccommodationType accommodationType;


    public Accommodation() {
    }


    public Integer getAmountOfPeople() {
        return amountOfPeople;
    }

    public void setAmountOfPeople(Integer amountOfPeople) {
        this.amountOfPeople = amountOfPeople;
    }

    public Accommodation(String name, String location, Double rating, Double pricePerNight, Integer amountOfPeople, AccommodationType accommodationType) {

        this.name = name;
        this.location = location;
        this.rating = rating;
        this.pricePerNight = pricePerNight;

        this.amountOfPeople = amountOfPeople;
        this.accommodationType = accommodationType;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public Double getPricePerNight() {
        return pricePerNight;
    }

    public void setPricePerNight(Double pricePerNight) {
        this.pricePerNight = pricePerNight;
    }

    public AccommodationType getAccommodationType() {
        return accommodationType;
    }

    public void setAccommodationType(AccommodationType accommodationType) {
        this.accommodationType = accommodationType;
    }

}
