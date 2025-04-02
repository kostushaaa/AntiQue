package code.klein.demo.controller;

import code.klein.demo.entity.Car;
import code.klein.demo.request.CreateCarRequest;
import code.klein.demo.request.EditCarRequest;
import code.klein.demo.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
public class CarsController {

    @Autowired
    private CarService carService;

    @GetMapping("cars/")
    public ResponseEntity<List<Car>> getCars() {
        return ResponseEntity.ok(carService.getCars());
    }

    @PostMapping("cars/new")
    public ResponseEntity<Car> addCar(@RequestBody CreateCarRequest request) {
        return ResponseEntity.ok(carService.createCar(request));
    }

    @GetMapping("cars/{id}")
    public ResponseEntity<Car> getCar(@PathVariable Long id) {
        Car car = carService.getCarById(id);
        return ResponseEntity.ok(car);
    }

    @PutMapping("cars/edit")
    public ResponseEntity<Car> updateCar(@RequestBody EditCarRequest request) {
        Car updatedCar = carService.updateCar(request);
        return ResponseEntity.ok(updatedCar);
    }

}
