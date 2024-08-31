package com.example.travelservice.web;

import com.example.travelservice.models.GptRequest;
import com.example.travelservice.service.GptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/gpt")
public class GptResponseController {

    @Autowired
    private GptService gptService;

    @PostMapping("/prompt")
    public String getGptReply(@RequestBody GptRequest gptRequest) {

        try {
            return gptService.getResponse(gptRequest.getPrompt());
        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }
}
