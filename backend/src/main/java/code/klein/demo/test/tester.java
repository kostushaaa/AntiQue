package code.klein.demo.test;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.AbstractPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

public class tester {
    public static void main(String[] args) {
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

        String encodedPassword = "$2b$10$/AjATDO75NirWsELxms3JOPRfoOhqe1KyNxczw92vXgdgO/W6k8Ze";
        String rawPassword = "admin123";

        boolean matches = passwordEncoder.matches(rawPassword, encodedPassword);
        System.out.println("Password matches: " + matches);
    }
    }
