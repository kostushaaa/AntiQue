import React, { useEffect, useState, useMemo } from 'react';
import { Link as RouteLink } from 'react-router-dom';
import {
  Card, CardBody, CardHeader, Button, Divider, Spinner
} from "@heroui/react";
import { Icon } from '@iconify/react';
import { getCars } from '../../../data/cars';
import { getRentalDetails, RentalWithDetails } from '../../../data/rentals';
import { Car } from '../../../data/types';

export const AdminDashboard: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [rentalDetails, setRentalDetails] = useState<RentalWithDetails[]>([]);
  const [loadingCars, setLoadingCars] = useState(true);
  const [loadingRentals, setLoadingRentals] = useState(true);

  useEffect(() => {
    getCars()
        .then(setCars)
        .finally(() => setLoadingCars(false));

    getRentalDetails()
        .then(setRentalDetails)
        .finally(() => setLoadingRentals(false));
  }, []);

  const statistics = useMemo(() => {
    const activeRentals = rentalDetails.filter(r => r.status === 'active').length;
    const availableCars = cars.filter(car => car.available).length;
    const totalRevenue = rentalDetails.reduce((sum, r) => sum + r.totalPrice, 0);
    const avgRentalDuration = rentalDetails.length > 0
        ? rentalDetails.reduce((sum, r) => sum + r.totalDays, 0) / rentalDetails.length
        : 0;

    return {
      activeRentals,
      availableCars,
      totalRevenue,
      avgRentalDuration
    };
  }, [cars, rentalDetails]);

  const recentRentals = useMemo(() => rentalDetails.slice(0, 5), [rentalDetails]);

  return (
      <div>
        <div className="mb-6">
          <h1 className="text-2xl font-display font-bold mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Overview of your car rental business.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border border-gray-200">
            <CardBody className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary-100 text-primary-500">
                <Icon icon="lucide:car" width={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Active Rentals</p>
                <p className="text-2xl font-semibold">
                  {loadingRentals ? <Spinner size="sm" /> : statistics.activeRentals}
                </p>
              </div>
            </CardBody>
          </Card>

          <Card className="border border-gray-200">
            <CardBody className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-success-100 text-success-500">
                <Icon icon="lucide:check-circle" width={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Available Cars</p>
                <p className="text-2xl font-semibold">
                  {loadingCars ? <Spinner size="sm" /> : `${statistics.availableCars} / ${cars.length}`}
                </p>
              </div>
            </CardBody>
          </Card>

          <Card className="border border-gray-200">
            <CardBody className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-secondary-100 text-secondary-500">
                <Icon icon="lucide:euro" width={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Revenue</p>
                <p className="text-2xl font-semibold">{statistics.totalRevenue.toFixed(2)} €</p>
              </div>
            </CardBody>
          </Card>

          <Card className="border border-gray-200">
            <CardBody className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-warning-100 text-warning-500">
                <Icon icon="lucide:calendar" width={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Avg. Rental Duration</p>
                <p className="text-2xl font-semibold">{statistics.avgRentalDuration.toFixed(1)} days</p>
              </div>
            </CardBody>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="border border-gray-200">
              <CardHeader className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Recent Rentals</h2>
                <Button
                    as={RouteLink}
                    to="/admin/rentals"
                    variant="light"
                    color="primary"
                    size="sm"
                >
                  View All
                </Button>
              </CardHeader>
              <CardBody>
                {loadingRentals ? (
                    <div className="text-center py-12">
                      <Spinner size="lg" color="primary" />
                    </div>
                ) : recentRentals.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No rentals found</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                      {recentRentals.map((rental) => (
                          <div key={rental.id} className="flex flex-col md:flex-row md:items-center gap-4 p-3 bg-gray-50 rounded-lg">
                            <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                              <img
                                  src={rental.car?.photoUrl}
                                  alt={`${rental.car?.brand} ${rental.car?.modelName}`}
                                  className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-grow">
                              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                                <div>
                                  <h3 className="font-semibold">{rental.car?.brand} {rental.car?.modelName}</h3>
                                  <p className="text-sm text-gray-600">
                                    {rental.customer?.name} • {rental.startDate} to {rental.endDate}
                                  </p>
                                </div>
                                <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                                rental.status === 'active'
                                    ? 'bg-success-100 text-success-700'
                                    : rental.status === 'completed'
                                        ? 'bg-gray-100 text-gray-700'
                                        : 'bg-danger-100 text-danger-700'
                            }`}>
                              {rental.status.charAt(0).toUpperCase() + rental.status.slice(1)}
                            </span>
                                  <span className="font-semibold">{rental.totalPrice.toFixed(2)} €</span>
                                </div>
                              </div>
                            </div>
                          </div>
                      ))}
                    </div>
                )}
              </CardBody>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="border border-gray-200">
              <CardHeader>
                <h2 className="text-lg font-semibold">Car Status</h2>
              </CardHeader>
              <CardBody>
                {loadingCars ? (
                    <div className="flex justify-center py-12">
                      <Spinner size="lg" color="primary" />
                    </div>
                ) : (
                    <>
                      <div className="space-y-3">
                        {cars.slice(0, 6).map((car) => (
                            <div key={car.id} className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0">
                                <img
                                    src={car.photoUrl}
                                    alt={`${car.brand} ${car.modelName}`}
                                    className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-grow">
                                <div className="flex justify-between items-center">
                                  <p className="font-medium">{car.brand} {car.modelName}</p>
                                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                                      car.available
                                          ? 'bg-success-100 text-success-700'
                                          : 'bg-danger-100 text-danger-700'
                                  }`}>
                              {car.available ? 'Available' : 'Rented'}
                            </span>
                                </div>
                                <p className="text-xs text-gray-500">
                                  {new Date(car.createdAt).getFullYear()}
                                </p>
                              </div>
                            </div>
                        ))}
                      </div>

                      <Divider className="my-4" />

                      <Button
                          as={RouteLink}
                          to="/admin/cars"
                          color="primary"
                          variant="flat"
                          fullWidth
                          startContent={<Icon icon="lucide:car" />}
                      >
                        Manage Cars
                      </Button>
                    </>
                )}
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
  );
};
