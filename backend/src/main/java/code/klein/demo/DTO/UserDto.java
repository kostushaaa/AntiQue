package code.klein.demo.DTO;

public record UserDto(
        Long id,
        String uuid,
        String username,
        String email
) {}
