import React from 'react';
import { Link as RouteLink } from 'react-router-dom';
import { Card, CardBody, CardHeader, Button, Divider } from "@heroui/react";
import { Icon } from '@iconify/react';
import { cars } from '../../../data/cars';
import { rentals, getRentalDetails } from '../../../data/rentals';

export const AdminDashboard: React.FC = () => {
  // Get rental details with car and customer info
  const rentalDetails = React.useMemo(() => {
    return getRentalDetails();
  }, []);
  
  // Calculate statistics
  const statistics = React.useMemo(() => {
    const activeRentals = rentals.filter(rental => rental.status === 'active').length;
    const availableCars = cars.filter(car => car.available).length;
    const totalRevenue = rentals.reduce((sum, rental) => sum + rental.totalPrice, 0);
    const avgRentalDuration = rentals.length > 0 
      ? rentals.reduce((sum, rental) => sum + rental.totalDays, 0) / rentals.length 
      : 0;
    
    return {
      activeRentals,
      availableCars,
      totalRevenue,
      avgRentalDuration
    };
  }, []);
  
  // Get recent rentals
  const recentRentals = React.useMemo(() => {
    return rentalDetails.slice(0, 5);
  }, [rentalDetails]);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">
          Overview of your car rental business.
        </p>
      </div>
      
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="border border-gray-200">
          <CardBody className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-primary-100 text-primary-500">
              <Icon icon="lucide:car" width={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Active Rentals</p>
              <p className="text-2xl font-semibold">{statistics.activeRentals}</p>
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
              <p className="text-2xl font-semibold">{statistics.availableCars} / {cars.length}</p>
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
        {/* Recent Rentals */}
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
              {recentRentals.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No rentals found</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentRentals.map((rental) => (
                    <div key={rental.id} className="flex flex-col md:flex-row md:items-center gap-4 p-3 bg-gray-50 rounded-lg">
                      <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                        <img 
                          src={rental.car?.image} 
                          alt={rental.car?.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                          <div>
                            <h3 className="font-semibold">{rental.car?.name}</h3>
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
        
        {/* Car Status */}
        <div className="lg:col-span-1">
          <Card className="border border-gray-200">
            <CardHeader>
              <h2 className="text-lg font-semibold">Car Status</h2>
            </CardHeader>
            <CardBody>
              <div className="space-y-3">
                {cars.slice(0, 6).map((car) => (
                  <div key={car.id} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0">
                      <img 
                        src={car.image} 
                        alt={car.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-center">
                        <p className="font-medium">{car.name}</p>
                        <span className={`px-2 py-0.5 rounded-full text-xs ${
                          car.available 
                            ? 'bg-success-100 text-success-700' 
                            : 'bg-danger-100 text-danger-700'
                        }`}>
                          {car.available ? 'Available' : 'Rented'}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">{car.type} • {car.year}</p>
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
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};