package code.klein.demo.request.user;

import java.time.LocalDate;

public record UpdateUserRequest(
        String lastUsername,
        String lastEmail,
        String username,
        String email,
        String firstName,
        String lastName,
        String street,
        String city,
        String postalCode,
        String country,
        LocalDate birthDate,
        Long companyId
) {}
