package code.klein.demo.DTO;

import code.klein.demo.entity.User;

public class UserMapper {
    public static UserDto toDto(User user) {
        return new UserDto(
                user.getId(),
                user.getUuid(),
                user.getUsername(),
                user.getEmail()
                );
    }
}
