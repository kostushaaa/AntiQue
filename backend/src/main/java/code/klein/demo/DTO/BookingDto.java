package code.klein.demo.DTO;

import java.time.LocalDateTime;

public record BookingDto (
        Long id,
        LocalDateTime createdAt,
        LocalDateTime startDate,
        LocalDateTime endDate,
        String status,
        String carModel,
        String userName
) {}
