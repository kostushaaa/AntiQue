import React from 'react';
import { Card, CardBody, CardFooter, Button, Chip } from '@heroui/react';
import { Icon } from '@iconify/react';
import { Car } from '../data/cars.ts'; // путь подстрой под себя

interface CarCardProps {
  car: Car;
  onRent: (car: Car) => void;
  isAdmin?: boolean;
}

const CarCard: React.FC<CarCardProps> = ({ car, onRent, isAdmin = false }) => {
  return (
      <Card className="w-full">
        <CardBody className="p-0 overflow-hidden">
          <div className="relative">
            <img
                src={car.photoUrl}
                alt={`${car.brand} ${car.modelName}`}
                className="w-full h-48 object-cover"
            />
            <div className="absolute top-2 right-2">
              <Chip
                  color={car.available ? "success" : "danger"}
                  variant="flat"
                  size="sm"
              >
                {car.available ? "Verfügbar" : "Vermietet"}
              </Chip>
            </div>
          </div>
          <div className="p-4">
            <h3 className="text-xl font-bold">{car.brand} {car.modelName}</h3>
            <p className="text-default-500">Baujahr: {new Date(car.createdAt).getFullYear()}</p>

            <div className="flex justify-between mt-4">
              <div className="flex items-center">
                <Icon icon="lucide:calendar" className="mr-1 text-primary-500" />
                <span>{car.pricePerDay.toFixed(2)} € / Tag</span>
              </div>
              <div className="flex items-center">
                <Icon icon="lucide:route" className="mr-1 text-primary-500" />
                <span>{car.pricePerKm.toFixed(2)} € / km</span>
              </div>
            </div>
          </div>
        </CardBody>
        <CardFooter className="flex justify-end gap-2">
          {isAdmin ? (
              <Button color="primary" variant="flat" onPress={() => onRent(car)}>
                Details
              </Button>
          ) : (
              <Button
                  color="secondary"
                  onPress={() => onRent(car)}
                  isDisabled={!car.available}
              >
                {car.available ? "Jetzt mieten" : "Nicht verfügbar"}
              </Button>
          )}
        </CardFooter>
      </Card>
  );
};

export default CarCard;
