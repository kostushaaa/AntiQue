//package code.klein.demo.service;
//
//import code.klein.demo.entity.User;
//import code.klein.demo.repository.UserRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//
//import java.util.Optional;
//
////@Service
//public class CustomUserDetailService implements UserDetailsService {
//
//   // @Autowired
//    private UserRepository userRepository;
//
//    @Override
//    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        Optional<User> user = Optional.ofNullable(userRepository.findUserByUsername(username)
//                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username)));;
//
//        return new org.springframework.security.core.userdetails.User(
//                user.get().getUsername(),
//                user.get().getPassword(),
//                user.get().getAuthorities()
//        );
//    }
//}
