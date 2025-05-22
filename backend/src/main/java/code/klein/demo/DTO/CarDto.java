package code.klein.demo.DTO;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record CarDto (
        Long id,
        String brand,
        String modelName,
        BigDecimal pricePerDay,
        BigDecimal pricePerKm,
        String currency,
        LocalDateTime createdAt,
        boolean available
){}
