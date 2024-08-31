package com.example.travelservice.service.impl;

import com.example.travelservice.models.GptResponse;
import com.example.travelservice.repository.GptResponseRepository;
import com.example.travelservice.service.GptService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class GptServiceImplementation implements GptService {

    private String apiKey = "sk-8vACYkBjUPTfp_yNV6_gty_T0O_9BBT15lu4U90aUST3BlbkFJEKUy0pdzPFpOkN2PrkhOMUMS2Zr_QOInXQCPK5xk8A";

    private static final String API_URL = "https://api.openai.com/v1/chat/completions";

    @Autowired
    private RestTemplate restTemplate;
    private final GptResponseRepository gptResponseRepository;

    public GptServiceImplementation(GptResponseRepository gptResponseRepository) {
        this.gptResponseRepository = gptResponseRepository;
    }

    @Override
    public String getResponse(String prompt) throws Exception {
        HttpHeaders headers = new HttpHeaders();

        headers.set("Content-Type", "application/json");
        headers.set("Authorization", "Bearer " + apiKey);

        String requestBody = "{"
                + "\"model\": \"gpt-3.5-turbo\","
                + "\"messages\": [{\"role\": \"user\", \"content\": \"" + prompt + "\"}],"
                + "\"max_tokens\": 1000"
                + "}";

        /*System.out.println("Headers: " + headers);
        System.out.println("Request Body: " + requestBody);*/

        HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);

        ResponseEntity<String> response = restTemplate.exchange(API_URL, HttpMethod.POST, entity, String.class);

        /*System.out.println("Status Code: " + response.getStatusCode());
        System.out.println("Response Body: " + response.getBody());*/

        ObjectMapper mapper = new ObjectMapper();
        JsonNode jsonResponse = mapper.readTree(response.getBody());

        JsonNode choicesNode = jsonResponse.get("choices");
        if (choicesNode != null && choicesNode.isArray() && choicesNode.size() > 0) {
            JsonNode messageNode = choicesNode.get(0).get("message");
            if (messageNode != null) {
                String gptReply = messageNode.get("content").asText().trim();

                GptResponse gptResponse = new GptResponse(prompt, gptReply);
                gptResponseRepository.save(gptResponse);

                return gptReply;
            }
        }

        throw new RuntimeException();
    }
}
