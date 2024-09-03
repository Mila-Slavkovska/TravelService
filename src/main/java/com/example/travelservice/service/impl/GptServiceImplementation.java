package com.example.travelservice.service.impl;

import com.example.travelservice.models.GptResponse;
import com.example.travelservice.repository.GptResponseRepository;
import com.example.travelservice.service.GptService;
import com.example.travelservice.utilities.RequestUtility;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class GptServiceImplementation implements GptService {

    @Value("${openai.api.key}")
    private String apiKey;

    private static final String API_URL = "https://api.openai.com/v1/chat/completions";

    @Autowired
    private RestTemplate restTemplate;
    private final GptResponseRepository gptResponseRepository;

    public GptServiceImplementation(GptResponseRepository gptResponseRepository) {
        this.gptResponseRepository = gptResponseRepository;
    }

    @Override
    public String getResponse(String location, Double budget) throws Exception {
        HttpHeaders headers = RequestUtility.createHeaders(apiKey);
        String requestBody = RequestUtility.createRequestBody(location, budget);

        HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);
        ResponseEntity<String> response = restTemplate.exchange(API_URL, HttpMethod.POST, entity, String.class);

        String gptReply = RequestUtility.parseResponse(response.getBody());

        GptResponse gptResponse = new GptResponse(requestBody, gptReply);
        gptResponseRepository.save(gptResponse);

        return gptReply;
    }
}
