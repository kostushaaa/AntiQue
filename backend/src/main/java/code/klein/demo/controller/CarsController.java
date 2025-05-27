package code.klein.demo.controller;

import code.klein.demo.DTO.CarDto;
import code.klein.demo.DTO.CarMapper;
import code.klein.demo.request.car.CreateCarRequest;
import code.klein.demo.request.car.UpdateCarRequest;
import code.klein.demo.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController("")
public class CarsController {

    @Autowired
    private CarService carService;

    @GetMapping("/api/public/cars")
    public ResponseEntity<List<CarDto>> getCars() {
        List<CarDto> carDtos = carService.getCars()
                .stream()
                .map(CarMapper::toDto)
                .toList();
        return ResponseEntity.ok(carDtos);
    }

    @PostMapping("cars/new")
    public ResponseEntity<CarDto> addCar(@RequestBody CreateCarRequest request) {
        return ResponseEntity.ok(CarMapper.toDto(carService.createCar(request)));
    }

    @GetMapping("/api/public/cars/{id}")
    public ResponseEntity<CarDto> getCar(@PathVariable Long id) {
        return ResponseEntity.ok(CarMapper.toDto(carService.getCarById(id)));
    }

    @PutMapping("cars/edit")
    public ResponseEntity<CarDto> updateCar(@RequestBody UpdateCarRequest request) {
        return ResponseEntity.ok(CarMapper.toDto(carService.updateCar(request)));
    }

}
