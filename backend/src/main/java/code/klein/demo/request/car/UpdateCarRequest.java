package code.klein.demo.request.car;

import code.klein.demo.entity.Car.CurrencyCode;

import java.math.BigDecimal;

public record UpdateCarRequest(
        Long id,
        String brand,
        String modelName,
        BigDecimal pricePerDay,
        BigDecimal pricePerKm,
        CurrencyCode currency
) {}
