package code.klein.demo.controller;

import code.klein.demo.DTO.BookingDto;
import code.klein.demo.DTO.BookingMapper;
import code.klein.demo.businessLogic.booking.BookingService;
import code.klein.demo.entity.Booking;
import code.klein.demo.entity.Car;
import code.klein.demo.entity.User;
import code.klein.demo.request.CreateBookingRequest;
import code.klein.demo.service.AuditLogService;
import code.klein.demo.service.CarService;
import code.klein.demo.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/bookings")
@RequiredArgsConstructor
@RestController()
public class BookingController {

    private final BookingService bookingService;

    private final UserService userService;

    private final CarService carService;

    @Autowired
    private AuditLogService auditLogService;



    @PostMapping
    public ResponseEntity<Booking> createBooking(
            @RequestBody CreateBookingRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {

        System.out.println("UserDetails: " + userDetails);

        User user = userService.getEntityByUsername(userDetails.getUsername());
        Car car = carService.getCarById(request.carId());

        Booking booking = bookingService.createBooking(user, car, request.startDate(), request.endDate());
        return ResponseEntity.ok(booking);
    }

    @GetMapping("/me")
    public ResponseEntity<List<BookingDto>> getMyBookings(@AuthenticationPrincipal String userName) {
        User user = userService.getEntityByUsername(userName);
        List<Booking> bookings = bookingService.getBookingsForUser(user.getId());
        List<BookingDto> result = bookings.stream()
                .map(BookingMapper::toDto)
                .toList();
        return ResponseEntity.ok(result);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Booking>> getAllBookings() {
        return ResponseEntity.ok(bookingService.getAllBookings());
    }

    @DeleteMapping("/admin/delete")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteBooking(@RequestParam Long id) {
        bookingService.deleteBookingById(id);

        auditLogService.log(
                getCurrentUsername(),
                "BOOKING_DELETED",
                "Deleted booking with ID: " + id
        );


        return ResponseEntity.ok("Booking with ID " + id + " deleted");
    }

    private String getCurrentUsername() {
        var auth = SecurityContextHolder.getContext().getAuthentication();
        return auth != null ? auth.getName() : "UNKNOWN";
    }


}
