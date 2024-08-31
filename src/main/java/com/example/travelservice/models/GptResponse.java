package com.example.travelservice.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class GptResponse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 1000)
    private String prompt;

    @Column(length = 1000)
    private String response;

    public GptResponse() {
    }

    public GptResponse(String prompt, String response) {
        this.prompt = prompt;
        this.response = response;
    }
}
