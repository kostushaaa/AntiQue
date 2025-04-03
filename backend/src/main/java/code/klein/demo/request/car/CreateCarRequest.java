package code.klein.demo.request.car;

import code.klein.demo.entity.Car.CurrencyCode;
import lombok.Builder;

import java.math.BigDecimal;

@Builder
public record CreateCarRequest(
        String brand,
        String modelName,
        BigDecimal pricePerDay,
        BigDecimal pricePerKm,
        CurrencyCode currency
) {}
