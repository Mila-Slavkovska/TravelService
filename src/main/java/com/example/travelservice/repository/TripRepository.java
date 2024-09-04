package com.example.travelservice.repository;

import com.example.travelservice.models.Trip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TripRepository extends JpaRepository<Trip, Long> {
    @Query("SELECT t FROM Trip t WHERE t.user.email = :email AND LOWER(t.name) LIKE LOWER(CONCAT('%', :name, '%')) ORDER BY t.date_from DESC")
    List<Trip> findAllByUserEmailAndNameContainingOrderByDateFromDesc(@Param("email") String email, @Param("name") String name);

    @Query("SELECT t FROM Trip t WHERE t.user.email = :email ORDER BY t.date_from DESC")
    List<Trip> findAllByOrderByDate_from(@Param("email") String email);
}
