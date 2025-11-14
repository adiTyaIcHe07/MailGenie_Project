package com.aireply.MailGenie;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Map;

@Service
public class EmailGeneratorService {

    private final WebClient webClient;

    @Value("${gemini.api.url}")
    private String geminiApiUrl;

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    public EmailGeneratorService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.build();
    }

    public String generateEmailReply(EmailRequest req) {

        String prompt = buildPrompt(req);

        Map<String, Object> requestBody = Map.of(
                "contents", List.of(
                        Map.of("parts", List.of(
                                Map.of("text", prompt)
                        ))
                )
        );

        try {
            String response = webClient.post()
                    .uri(geminiApiUrl + "?key=" + geminiApiKey)
                    .header("Content-Type", "application/json")
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

            return extractResponseContent(response);

        } catch (Exception ex) {
            ex.printStackTrace();
            return "Error generating email: " + ex.getMessage();
        }
    }

    private String extractResponseContent(String response) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(response);

            return root.path("candidates")
                    .get(0)
                    .path("content")
                    .path("parts")
                    .get(0)
                    .path("text")
                    .asText();

        } catch (Exception e) {
            return "Error parsing response: " + e.getMessage() + "\nRaw: " + response;
        }
    }

    private String buildPrompt(EmailRequest req) {

        String tone = req.getTone() != null ? req.getTone() : "professional";
        String lang = req.getLanguage() != null ? req.getLanguage() : "en";

        return """
                You are an expert email writer AI.

                TASK:
                Generate a reply email based on the following content.
                Do NOT include any subject line.
                The reply must be written in the language: %s.
                The reply tone must be: %s.
                Keep the reply clean, natural, and human-like.

                EMAIL CONTENT:
                %s

                """.formatted(lang, tone, req.getEmailContent());
    }
}

