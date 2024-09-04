package com.example.travelservice.models.enumerations;

import com.fasterxml.jackson.annotation.JsonEnumDefaultValue;

public enum AttractionType {
    PARK, BEACH, CAVE, MOUNTAIN, MUSEUM, GALLERY, HISTORIC_SITE, ENTERTAINMENT_PARK, SPORT, @JsonEnumDefaultValue UNKNOWN
}
