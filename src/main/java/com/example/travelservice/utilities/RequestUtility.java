package com.example.travelservice.utilities;

import com.example.travelservice.models.Accommodation;
import com.example.travelservice.models.Attraction;
import com.example.travelservice.models.dto.AccommodationDto;
import com.example.travelservice.models.dto.AttractionDto;
import com.example.travelservice.models.enumerations.AccommodationType;
import com.example.travelservice.models.enumerations.AttractionType;
import com.example.travelservice.repository.AccommodationRepository;
import com.example.travelservice.repository.AttractionsRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpHeaders;

import java.util.List;

public class RequestUtility {
    private static final ObjectMapper mapper = new ObjectMapper();

    public static HttpHeaders createHeaders(String apiKey) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");
        headers.set("Authorization", "Bearer " + apiKey);
        return headers;
    }

    public static String createRequestBody(String location, Double budget) throws Exception {
        String prompt = "Give me 5 attraction and 5 specific accommodation recommendations " +
                "(including their names, descriptions, and prices) in " + location +
                " within a budget of " + budget + " EUR. " +
                "Format the response as a JSON object with two arrays: " +
                "'attractions' and 'accommodations'. " +
                "Each attraction should have 'id', 'name', 'description', 'location, 'price' and 'type'. " +
                "Each accommodation should have 'id', 'name', 'location', 'rating', 'price per night', 'type'." +
                "The type for the attractions should be one of these 'PARK, BEACH, CAVE, MOUNTAIN, MUSEUM, GALLERY, HISTORIC_SITE, ENTERTAINMENT_PARK, SPORT'" +
                "The type for accommodations should be one of these 'HOTEL, STUDIO, APARTMENT'" +
                "The location should consist of the full address" +
                "Remember what ids you put on the previous request so you continue from that number onwards for the next";

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

    public static void saveParsedData(String jsonContent, AttractionsRepository attractionsRepository, AccommodationRepository accommodationRepository) throws Exception {

        JsonNode jsonNode = mapper.readTree(jsonContent);

        JsonNode jsonAttractionsNode = jsonNode.get("attractions");
        if (jsonAttractionsNode != null && jsonAttractionsNode.isArray()) {
            List<AttractionDto> attractionsDtos = mapper.readValue(jsonAttractionsNode.toString(), new TypeReference<List<AttractionDto>>() {});

            for (AttractionDto attractionDto : attractionsDtos) {
                if (attractionsRepository.findByName(attractionDto.name()).isEmpty()) {
                    Attraction attraction = new Attraction(
                            attractionDto.name(),
                            attractionDto.description(),
                            attractionDto.location(),
                            attractionDto.price(),
                            attractionDto.type()
                    );
                    attractionsRepository.save(attraction);
                }
            }
        }

        JsonNode jsonAccommodationsNode = jsonNode.get("accommodations");
        if (jsonAccommodationsNode != null && jsonAccommodationsNode.isArray()) {
            List<AccommodationDto> accommodationsDtos = mapper.readValue(jsonAccommodationsNode.toString(), new TypeReference<List<AccommodationDto>>() {});

            for (AccommodationDto accommodationDto : accommodationsDtos) {
                if (accommodationRepository.findByName(accommodationDto.name()).isEmpty()) {
                    Accommodation accommodation = new Accommodation(
                            accommodationDto.name(),
                            accommodationDto.location(),
                            accommodationDto.rating(),
                            accommodationDto.pricePerNight(),
                            1,
                            accommodationDto.accommodationType()
                    );
                    accommodationRepository.save(accommodation);
                }
            }
        }

    }
}
