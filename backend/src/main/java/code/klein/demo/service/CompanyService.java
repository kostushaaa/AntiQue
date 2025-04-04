package code.klein.demo.service;

import code.klein.demo.entity.Car;
import code.klein.demo.entity.Company;
import code.klein.demo.entity.User;
import code.klein.demo.repository.CarRepository;
import code.klein.demo.repository.CompanyRepository;
import code.klein.demo.repository.UserRepository;
import code.klein.demo.request.company.CreateCompanyRequest;
import code.klein.demo.request.company.EditCompanyRequest;
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

        employees.forEach(user -> user.setCompany(savedCompany));
        userRepository.saveAll(employees);

        return savedCompany;
    }

    @Transactional
    public Company editCompany(final EditCompanyRequest request) {
        if (request.id() == null || request.id() <= 0) {
            throw new IllegalArgumentException("Company ID is required");
        }

        Company company = companyRepository.findById(request.id())
                .orElseThrow(() -> new EntityNotFoundException("Company not found"));

        if (request.name() != null && !request.name().isBlank()) {
            company.setName(request.name().trim());
        }

        if (request.directorId() != null) {
            User director = userRepository.findById(request.directorId())
                    .orElseThrow(() -> new EntityNotFoundException("Director not found"));
            company.setDirector(director);
        }

        if (request.employeeIds() != null) {
            List<User> employees = userRepository.findAllById(request.employeeIds());
            company.setEmployees(employees);
        }

        return companyRepository.save(company);
    }


    @Transactional
    public Car registerCar(Long companyId, Car car) {
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new EntityNotFoundException("Company is not found"));

        car.setCompany(company);
        return carRepository.save(car);
    }

    @Transactional
    public void unregisterCar(Long carId) {
        Car car = carRepository.findById(carId)
                .orElseThrow(() -> new EntityNotFoundException("Car is not found"));

        carRepository.delete(car);
    }
}
