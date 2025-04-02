package code.klein.demo.request;

import code.klein.demo.entity.Car.CurrencyCode;

import java.math.BigDecimal;

public record CreateCarRequest(
        String brand,
        String modelName,
        BigDecimal pricePerDay,
        BigDecimal pricePerKm,
        CurrencyCode currency
) {}
