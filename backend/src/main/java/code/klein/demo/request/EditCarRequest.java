package code.klein.demo.request;

import code.klein.demo.entity.Car.CurrencyCode;

import java.math.BigDecimal;

public record EditCarRequest(
        Long id,
        String brand,
        String modelName,
        BigDecimal pricePerDay,
        BigDecimal pricePerKm,
        CurrencyCode currency
) {}
