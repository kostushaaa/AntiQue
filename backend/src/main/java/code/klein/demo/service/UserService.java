package code.klein.demo.service;

import code.klein.demo.config.Role;
import code.klein.demo.entity.User;
import code.klein.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.InvalidParameterException;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User createUser(final String username, final String email) {
        if (isBlank(username) || isBlank(email)) {
            throw new InvalidParameterException("Username and email are required");
        }

        if (userRepository.existsByUsername(username) || userRepository.existsByEmail(email)) {
            throw new InvalidParameterException("User with given username or email already exists");
        }

        User user = User.builder()
                .username(username)
                .email(email)
                .build();

        return userRepository.save(user);
    }

    public User updateUser(final String lastUsername, final String lastEmail, final String username, final String email) {
        if (isBlank(lastUsername) || isBlank(lastEmail) || isBlank(username) || isBlank(email)) {
            throw new InvalidParameterException("Username and email are required");
        }

        User user = userRepository.findUserByUsername(lastUsername)
                .filter(u -> u.getEmail().equals(lastEmail))
                .orElseThrow(() -> new InvalidParameterException("User with given current credentials does not exist"));

        if (!lastUsername.equals(username) && userRepository.existsByUsername(username)) {
            throw new InvalidParameterException("Username is already taken");
        }

        if (!lastEmail.equals(email) && userRepository.existsByEmail(email)) {
            throw new InvalidParameterException("Email is already taken");
        }

        user.setUsername(username);
        user.setEmail(email);

        return userRepository.save(user);
    }

    public User updateUserRole(String username, String role) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));

        try {
            Role newRole = Role.valueOf(role.toUpperCase());
            user.getAuthorities().clear();
            user.getAuthorities().add(newRole);
        } catch (IllegalArgumentException e) {
            throw new InvalidParameterException("Invalid role: " + role);
        }

        return userRepository.save(user);
    }

    public void deleteUserByUsername(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
        userRepository.delete(user);
    }


    private boolean isBlank(String value) {
        return value == null || value.trim().isEmpty();
    }


    public User getEntityByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public void resetPassword(String username, String newPassword) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    public Set<String> getUserRoles(String username) {
        User user = getEntityByUsername(username);
        return user.getAuthorities()
                .stream()
                .map(Enum::name)
                .collect(Collectors.toSet());
    }

}
