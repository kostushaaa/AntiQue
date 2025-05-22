package code.klein.demo.service;

import code.klein.demo.entity.User;
import code.klein.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.security.InvalidParameterException;
import java.util.Collections;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

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

    private boolean isBlank(String value) {
        return value == null || value.trim().isEmpty();
    }


    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));

        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                user.getAuthorities().stream()
                        .map(role -> new SimpleGrantedAuthority(role.name()))
                        .toList()
        );
    }

    public User getEntityByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
    }
}
