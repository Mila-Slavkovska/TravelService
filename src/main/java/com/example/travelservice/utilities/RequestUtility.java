package com.example.travelservice.utilities;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpHeaders;

public class RequestUtility {
    private static final ObjectMapper mapper = new ObjectMapper();

    public static HttpHeaders createHeaders(String apiKey) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");
        headers.set("Authorization", "Bearer " + apiKey);
        return headers;
    }

    public static String createRequestBody(String location, Double budget) throws Exception {
        String prompt = "Give me attraction and specific accommodation recommendations " +
                "(including their names) in " + location
                + " to plan a trip within the budget of " + budget + " EUR." +
                "The given suggestions should be in the form Attractions: Name Description Price" +
                "and then Accomodations: Name Price" +
                "without a summarized explanation";

        return "{"
                + "\"model\": \"gpt-3.5-turbo\","
                + "\"messages\": [{\"role\": \"user\", \"content\": \"" + prompt + "\"}],"
                + "\"max_tokens\": 1000"
                + "}";
    }

    public static String parseResponse(String responseBody) throws Exception {
        JsonNode jsonResponse = mapper.readTree(responseBody);
        JsonNode choicesNode = jsonResponse.get("choices");

        if (choicesNode != null && choicesNode.isArray() && choicesNode.size() > 0) {
            JsonNode messageNode = choicesNode.get(0).get("message");
            if (messageNode != null) {
                return messageNode.get("content").asText().trim();
            }
        }

        throw new RuntimeException();
    }
}
