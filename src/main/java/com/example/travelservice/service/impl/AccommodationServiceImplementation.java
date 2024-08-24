package com.example.travelservice.service.impl;

import com.example.travelservice.models.Accommodation;
import com.example.travelservice.models.dto.AccommodationDto;
import com.example.travelservice.models.enumerations.AccommodationType;
import com.example.travelservice.models.exceptions.InvalidAccommodationIdException;
import com.example.travelservice.repository.AccommodationRepository;
import com.example.travelservice.service.AccommodationService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AccommodationServiceImplementation implements AccommodationService {

    private final AccommodationRepository accommodationRepository;

    public AccommodationServiceImplementation(AccommodationRepository accommodationRepository) {
        this.accommodationRepository = accommodationRepository;
    }

    @Override
    public List<Accommodation> listAllAccommodations() {
        return accommodationRepository.findAll();
    }

    @Override
    public Optional<Accommodation> findById(Long id) {
        return Optional.ofNullable(accommodationRepository.findById(id)
                .orElseThrow(InvalidAccommodationIdException::new));
    }

    @Override
    public Optional<Accommodation> create(AccommodationDto accommodationDto) {
        Accommodation accommodation = new Accommodation(accommodationDto.name(), accommodationDto.location(), accommodationDto.rating(), accommodationDto.pricePerNight(), accommodationDto.amountOfPeople(), accommodationDto.accommodationType());
        return Optional.of(this.accommodationRepository.save(accommodation));
    }

    @Override
    public Optional<Accommodation> update(Long id, AccommodationDto accommodationDto) {
//        Product product = this.productRepository.findById(id).orElseThrow
//                (() -> new ProductNotFoundException(id));
//        product.setName(productDto.getName());
//        product.setPrice(productDto.getPrice());
//        product.setQuantity(productDto.getQuantity());

        Accommodation accommodation = this.accommodationRepository.findById(id).orElseThrow(
                () -> new InvalidAccommodationIdException());
        accommodation.setName(accommodationDto.name());
        accommodation.setLocation(accommodationDto.location());
        accommodation.setPricePerNight(accommodationDto.pricePerNight());
        accommodation.setAccommodationType(accommodationDto.accommodationType());
        accommodation.setAmountOfPeople(accommodationDto.amountOfPeople());
        accommodation.setRating(accommodationDto.rating());
        this.accommodationRepository.save(accommodation);
        return Optional.of(accommodation);

    }

    @Override
    public void deleteById(Long id) {
        this.accommodationRepository.deleteById(id);
    }

    @Override
    public List<Accommodation> findByAccommodationTypeBasedOnTheLocation(String location, AccommodationType accommodationType) {
        if (accommodationType != null && location != null) {
            return accommodationRepository.findAllByLocationLikeAndAccommodationTypeOrderByRating(location, accommodationType);
        } else if (location != null) {
            return accommodationRepository.findAllByLocationOrderByRating(location);
        } else {
            return this.accommodationRepository.findAll();
        }
    }

    @Override
    public List<Accommodation> findAccommodationsByPriceLessThan(Double pricePerNight, Double rating) {
        if (pricePerNight != null && rating != null) {
            return accommodationRepository.findAllByPricePerNightLessThanOrderByRating(pricePerNight);
        } else {
            return this.accommodationRepository.findAll();
        }
    }


}
