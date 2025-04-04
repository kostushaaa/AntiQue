package code.klein.demo;

import code.klein.demo.entity.Car;
import code.klein.demo.entity.User;
import code.klein.demo.request.car.CreateCarRequest;
import code.klein.demo.request.company.CreateCompanyRequest;
import code.klein.demo.request.user.CreateUserRequest;
import code.klein.demo.service.CarService;
import code.klein.demo.service.UserService;
import code.klein.demo.service.CompanyService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@SpringBootApplication
//@EnableJpaAuditing(auditorAwareRef = "auditorAware")
@CrossOrigin(origins = {"http://localhost:8080", "http://localhost:5173", "http://127.0.0.1:5173"})
public class AntiQueApplication {

    public static void main(String[] args) {
        SpringApplication.run(AntiQueApplication.class, args);
    }

    @Bean
    public CommandLineRunner commandLineRunner(CarService carService, CompanyService companyService, UserService userService) {
        return args -> {
            final var director = CreateUserRequest.builder().username("kostushaaa").email("kostushaaa@proton.me").firstName("Kostiantyn").lastName("Cheshykhin").street("Musterstrasse 4").city("Kassel").postalCode("34127").country("Kassel").birthDate(LocalDate.of(2006, 9, 16)).build();

            final var employee1 = CreateUserRequest.builder().username("efe_laftan").email("efe.laftan@example.com").firstName("Efe").lastName("Laftan").street("Bahnhofstraße 10").city("Berlin").postalCode("10115").country("Germany").birthDate(LocalDate.of(1990, 6, 12)).build();

            final var employee2 = CreateUserRequest.builder().username("daniel_dorsch").email("daniel.dorsch@example.com").firstName("Daniel").lastName("Dorsch").street("Königsallee 7").city("Düsseldorf").postalCode("40212").country("Germany").birthDate(LocalDate.of(1988, 2, 27)).build();

            final var employee3 = CreateUserRequest.builder().username("spiegel_timon").email("timon.spiegel@example.com").firstName("Timon").lastName("Spiegel").street("Maximilianstraße 22").city("Munich").postalCode("80539").country("Germany").birthDate(LocalDate.of(1992, 11, 5)).build();

            final var companyRequest = new CreateCompanyRequest("AntiQue", userService.createUser(director).getId(),
                    List.of(userService.createUser(employee1).getId(), userService.createUser(employee2).getId(), userService.createUser(employee3).getId())
            );
            final var company = companyService.createCompany(companyRequest);


            carService.registerCar(company.getId(), CreateCarRequest.builder().brand("Audi").modelName("80").pricePerDay(BigDecimal.valueOf(24.00)).pricePerKm(BigDecimal.valueOf(0.48)).currency(Car.CurrencyCode.EUR).build());
            carService.registerCar(company.getId(), CreateCarRequest.builder().brand("Audi").modelName("100").pricePerDay(BigDecimal.valueOf(50.00)).pricePerKm(BigDecimal.valueOf(1.00)).currency(Car.CurrencyCode.EUR).build());
            carService.registerCar(company.getId(), CreateCarRequest.builder().brand("Audi").modelName("Coupe S").pricePerDay(BigDecimal.valueOf(82.00)).pricePerKm(BigDecimal.valueOf(1.64)).currency(Car.CurrencyCode.EUR).build());
            carService.registerCar(company.getId(), CreateCarRequest.builder().brand("BMW").modelName("2800 GTS").pricePerDay(BigDecimal.valueOf(55.00)).pricePerKm(BigDecimal.valueOf(1.10)).currency(Car.CurrencyCode.EUR).build());
            carService.registerCar(company.getId(), CreateCarRequest.builder().brand("BMW").modelName("507").pricePerDay(BigDecimal.valueOf(65.00)).pricePerKm(BigDecimal.valueOf(1.30)).currency(Car.CurrencyCode.EUR).build());
            carService.registerCar(company.getId(), CreateCarRequest.builder().brand("Fiat").modelName("600 D").pricePerDay(BigDecimal.valueOf(5.00)).pricePerKm(BigDecimal.valueOf(0.22)).currency(Car.CurrencyCode.EUR).build());
            carService.registerCar(company.getId(), CreateCarRequest.builder().brand("DeLorean").modelName("DMC-12").pricePerDay(BigDecimal.valueOf(105.00)).pricePerKm(BigDecimal.valueOf(6.54)).currency(Car.CurrencyCode.EUR).build());
            carService.registerCar(company.getId(), CreateCarRequest.builder().brand("Mazda").modelName("626 V").pricePerDay(BigDecimal.valueOf(35.00)).pricePerKm(BigDecimal.valueOf(0.70)).currency(Car.CurrencyCode.EUR).build());
            carService.registerCar(company.getId(), CreateCarRequest.builder().brand("Mazda").modelName("R360").pricePerDay(BigDecimal.valueOf(40.00)).pricePerKm(BigDecimal.valueOf(0.80)).currency(Car.CurrencyCode.EUR).build());
            carService.registerCar(company.getId(), CreateCarRequest.builder().brand("Mazda").modelName("MX 81").pricePerDay(BigDecimal.valueOf(60.00)).pricePerKm(BigDecimal.valueOf(1.20)).currency(Car.CurrencyCode.EUR).build());
            carService.registerCar(company.getId(), CreateCarRequest.builder().brand("Mercedes").modelName("190").pricePerDay(BigDecimal.valueOf(75.00)).pricePerKm(BigDecimal.valueOf(1.50)).currency(Car.CurrencyCode.EUR).build());
            carService.registerCar(company.getId(), CreateCarRequest.builder().brand("Mercedes").modelName("230").pricePerDay(BigDecimal.valueOf(80.00)).pricePerKm(BigDecimal.valueOf(1.60)).currency(Car.CurrencyCode.EUR).build());
            carService.registerCar(company.getId(), CreateCarRequest.builder().brand("VW").modelName("Golf I").pricePerDay(BigDecimal.valueOf(40.00)).pricePerKm(BigDecimal.valueOf(0.80)).currency(Car.CurrencyCode.EUR).build());
            carService.registerCar(company.getId(), CreateCarRequest.builder().brand("VW").modelName("Passat 35i").pricePerDay(BigDecimal.valueOf(65.00)).pricePerKm(BigDecimal.valueOf(1.30)).currency(Car.CurrencyCode.EUR).build());

//            System.out.println("Directors token: " + service.register(admin).getAccessToken());
        };
    }

}
