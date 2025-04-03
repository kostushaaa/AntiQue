package code.klein.demo.service;

import code.klein.demo.entity.Car;
import code.klein.demo.entity.Company;
import code.klein.demo.entity.User;
import code.klein.demo.repository.CarRepository;
import code.klein.demo.repository.CompanyRepository;
import code.klein.demo.repository.UserRepository;
import code.klein.demo.request.company.CreateCompanyRequest;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CompanyService {

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public Company createCompany(CreateCompanyRequest request) {
        if (request.name() == null || request.name().isBlank()) {
            throw new IllegalArgumentException("Company name is required");
        }

        User director = userRepository.findById(request.directorId())
                .orElseThrow(() -> new EntityNotFoundException("Director not found"));

        List<User> employees = userRepository.findAllById(request.employeeIds());

        Company company = Company.builder()
                .name(request.name().trim())
                .director(director)
                .employees(employees)
                .build();

        Company savedCompany = companyRepository.save(company);

        // Установим ссылку на компанию у сотрудников
        employees.forEach(user -> user.setCompany(savedCompany));
        userRepository.saveAll(employees);

        return savedCompany;
    }

    @Transactional
    public Car registerCar(Long companyId, Car car) {
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new EntityNotFoundException("Компания не найдена"));

        car.setCompany(company);
        return carRepository.save(car);
    }

    @Transactional
    public void unregisterCar(Long carId) {
        Car car = carRepository.findById(carId)
                .orElseThrow(() -> new EntityNotFoundException("Машина не найдена"));

        carRepository.delete(car);
    }
}
