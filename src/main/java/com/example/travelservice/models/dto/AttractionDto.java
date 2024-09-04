package com.example.travelservice.models.dto;

import com.example.travelservice.models.enumerations.AttractionType;

public record AttractionDto (Long id,
    String name,
    String description,
    String location,
    Double price,
    AttractionType type
){

}