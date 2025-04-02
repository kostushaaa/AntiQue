package code.klein.demo.request;

import java.time.LocalDate;

public record CreateUserRequest(
        String username,
        String email,
        String firstName,
        String lastName,
        String street,
        String city,
        String postalCode,
        String country,
        LocalDate birthDate
) {}
