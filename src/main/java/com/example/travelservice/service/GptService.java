package com.example.travelservice.service;

public interface GptService {
    String getResponse(String location, Double budget) throws Exception;
}
