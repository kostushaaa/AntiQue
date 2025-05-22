package code.klein.demo.DTO;

import code.klein.demo.entity.Booking;

public class BookingMapper {
    public static BookingDto toDto(Booking booking) {
        return new BookingDto(
                booking.getId(),
                booking.getCreatedAt(),
                booking.getStartDate(),
                booking.getEndDate(),
                booking.getStatus().name(),
                booking.getCar().getBrand() + " " + booking.getCar().getModelName(),
                booking.getUser().getUsername()
        );
    }
}