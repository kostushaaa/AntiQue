package code.klein.demo.service;

import code.klein.demo.entity.User;
import code.klein.demo.repository.UserRepository;
import code.klein.demo.request.CreateUserRequest;
import code.klein.demo.request.UpdateUserRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.InvalidParameterException;
import java.util.Collections;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional
    public User createUser(CreateUserRequest request) {
        if (isBlank(request.username()) || isBlank(request.email())) {
            throw new InvalidParameterException("Username and email are required");
        }

        if (userRepository.existsByUsername(request.username()) || userRepository.existsByEmail(request.email())) {
            throw new InvalidParameterException("User with given username or email already exists");
        }

        User user = User.builder()
                .username(request.username())
                .email(request.email())
                .firstName(request.firstName())
                .lastName(request.lastName())
                .street(request.street())
                .city(request.city())
                .postalCode(request.postalCode())
                .country(request.country())
                .birthDate(request.birthDate())
                .build();

        return userRepository.save(user);
    }

    @Transactional
    public User updateUser(UpdateUserRequest request) {
        if (isBlank(request.lastUsername()) || isBlank(request.lastEmail()) ||
                isBlank(request.username()) || isBlank(request.email())) {
            throw new InvalidParameterException("Username and email are required");
        }

        User user = userRepository.findUserByUsername(request.lastUsername())
                .filter(u -> u.getEmail().equals(request.lastEmail()))
                .orElseThrow(() -> new InvalidParameterException("User with given current credentials does not exist"));

        if (!request.lastUsername().equals(request.username()) &&
                userRepository.existsByUsername(request.username())) {
            throw new InvalidParameterException("Username is already taken");
        }

        if (!request.lastEmail().equals(request.email()) &&
                userRepository.existsByEmail(request.email())) {
            throw new InvalidParameterException("Email is already taken");
        }

        user.setUsername(request.username());
        user.setEmail(request.email());
        user.setFirstName(request.firstName());
        user.setLastName(request.lastName());
        user.setStreet(request.street());
        user.setCity(request.city());
        user.setPostalCode(request.postalCode());
        user.setCountry(request.country());
        user.setBirthDate(request.birthDate());

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
                Collections.singleton(new SimpleGrantedAuthority("ROLE_" + user.getAuthorities()))
        );
    }

}
