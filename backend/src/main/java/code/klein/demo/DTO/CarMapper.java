package code.klein.demo.DTO;

import code.klein.demo.entity.Booking;
import code.klein.demo.entity.Car;

public class CarMapper {
    public static CarDto toDto(Car car) {
        return new CarDto(
               car.getId(),
                car.getBrand(),
                car.getModelName(),
                car.getPricePerDay(),
                car.getPricePerKm(),
                car.getCurrency().toString(),
                car.getCreatedAt(),
                car.isAvailable()

        );
    }
}
