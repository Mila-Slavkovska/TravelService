package com.example.travelservice.repository;

import com.example.travelservice.models.GptResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GptResponseRepository extends JpaRepository<GptResponse, Long> {
}
