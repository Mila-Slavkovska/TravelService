package com.example.travelservice.models;

import lombok.Data;

@Data
public class GptRequest {
    private String location;
    private Double budget;
}
