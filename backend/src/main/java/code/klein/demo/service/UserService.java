package code.klein.demo.service;

import code.klein.demo.entity.User;
import code.klein.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.InvalidParameterException;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User createUser(final String username, final String email) {
        if (username == null || email == null || username.isEmpty() || email.isEmpty()) {
            throw new InvalidParameterException("Username and email are required");
        }
        if (userRepository.existsByUsername(username) && userRepository.existsByEmail(email)) {
            throw new InvalidParameterException("This user already exists");
        }

        User user = User.builder()
                .username(username)
                .email("klein@example.com")
                .build();

        return userRepository.save(user);
    }
}
