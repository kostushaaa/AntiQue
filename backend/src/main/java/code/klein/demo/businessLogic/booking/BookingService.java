package code.klein.demo.businessLogic.booking;

import code.klein.demo.config.BookingStatus;
import code.klein.demo.entity.Booking;
import code.klein.demo.entity.Car;
import code.klein.demo.entity.User;
import code.klein.demo.repository.BookingRepository;
import code.klein.demo.repository.CarRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;
    private final CarRepository carRepository;


    public Booking createBooking(User user, Car car, LocalDateTime start, LocalDateTime end) {
        if (!car.isAvailable()) {
            throw new IllegalStateException("Fahrzeug ist nicht verfügbar");
        }

        Booking booking = Booking.builder()
                .user(user)
                .car(car)
                .startDate(start)
                .endDate(end)
                .status(BookingStatus.ACTIVE)
                .build();


        car.setAvailable(false);
        carRepository.save(car);
        return bookingRepository.save(booking);
    }

    public List<Booking> getBookingsForUser(Long userId) {
        return bookingRepository.findByUserId(userId);
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public void deleteBookingById(Long id) {
        if (!bookingRepository.existsById(id)) {
            throw new IllegalArgumentException("Booking with ID " + id + " does not exist");
        }
        bookingRepository.deleteById(id);
    }


}
