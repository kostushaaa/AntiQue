package code.klein.demo.request;

import java.time.LocalDateTime;

public record CreateBookingRequest(Long carId,
                                   LocalDateTime startDate,
                                   LocalDateTime endDate) {
}
