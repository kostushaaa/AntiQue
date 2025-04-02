package code.klein.demo.service;

import code.klein.demo.entity.Car;
import code.klein.demo.repository.CarRepository;
import code.klein.demo.request.CreateCarRequest;
import code.klein.demo.request.EditCarRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.InvalidParameterException;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class CarService {
    @Autowired
    private CarRepository carRepository;

    public List<Car> getCars() {
        return carRepository.findAll();
    }

    public Car createCar(CreateCarRequest request) {
        if (isBlank(request.brand()) || isBlank(request.modelName()) || request.pricePerDay() == null || request.pricePerKm() == null || request.currency() == null) {
            throw new InvalidParameterException("All car fields are required");
        }

        Car car = Car.builder().brand(request.brand().trim()).modelName(request.modelName().trim()).pricePerDay(request.pricePerDay()).pricePerKm(request.pricePerKm()).currency(request.currency()).build();

        return carRepository.save(car);
    }

    public Car getCarById(Long id) {
        if (id == null || id <= 0) {
            throw new InvalidParameterException("Invalid car ID");
        }

        return carRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Car with ID " + id + " not found"));
    }

    public Car updateCar(EditCarRequest request) {
        if (request.id() == null || request.id() <= 0 || isBlank(request.brand()) || isBlank(request.modelName()) || request.pricePerDay() == null || request.pricePerKm() == null || request.currency() == null) {
            throw new InvalidParameterException("All fields are required");
        }

        Car car = carRepository.findById(request.id()).orElseThrow(() -> new NoSuchElementException("Car with ID " + request.id() + " not found"));

        car.setBrand(request.brand().trim());
        car.setModelName(request.modelName().trim());
        car.setPricePerDay(request.pricePerDay());
        car.setPricePerKm(request.pricePerKm());
        car.setCurrency(request.currency());

        return carRepository.save(car);
    }

    private boolean isBlank(String value) {
        return value == null || value.trim().isEmpty();
    }
}
