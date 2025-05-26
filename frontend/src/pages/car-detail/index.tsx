import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Card, CardBody, CardHeader, Button, Tabs, Tab, Divider, Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Textarea } from "@heroui/react";
import { Icon } from '@iconify/react';
import { cars } from '../../data/cars.ts';
import { useAuth } from '../../contexts/auth-context.tsx';

export const CarDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const { isAuthenticated } = useAuth();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  
  // Find car by id
  const car = React.useMemo(() => {
    return cars.find(c => c.id === parseInt(id));
  }, [id]);
  
  // Form state
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [licenseNumber, setLicenseNumber] = React.useState('');
  const [message, setMessage] = React.useState('');
  
  // Calculate rental days and estimated price
  const rentalDays = React.useMemo(() => {
    if (!startDate || !endDate) return 0;
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  }, [startDate, endDate]);
  
  const estimatedPrice = React.useMemo(() => {
    if (!car || rentalDays === 0) return 0;
    return car.pricePerDay * rentalDays;
  }, [car, rentalDays]);
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpen();
  };
  
  // Redirect if car not found
  if (!car) {
    history.push('/cars');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button 
          variant="flat" 
          color="primary" 
          onPress={() => history.push('/cars')}
          startContent={<Icon icon="lucide:arrow-left" />}
          className="mb-4"
        >
          Back to Cars
        </Button>
        
        <h1 className="text-3xl font-display font-bold">{car.name}</h1>
        <div className="flex items-center gap-2 text-gray-600 mt-1">
          <span>{car.type}</span>
          <span>•</span>
          <span>Year {car.year}</span>
          <span>•</span>
          <span className={car.available ? "text-success-500" : "text-danger-500"}>
            {car.available ? "Available" : "Currently Rented"}
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Car Details */}
        <div className="lg:col-span-2">
          <Card className="mb-8">
            <div className="h-[400px] overflow-hidden">
              <img 
                src={car.image} 
                alt={car.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <CardBody>
              <Tabs aria-label="Car details">
                <Tab key="details" title="Details">
                  <div className="py-4">
                    <h2 className="text-xl font-display font-semibold mb-3">About this car</h2>
                    <p className="text-gray-700 mb-6">{car.description}</p>
                    
                    <h3 className="text-lg font-semibold mb-3">Features</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                      {car.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Icon icon="lucide:check-circle" className="text-primary-500" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <h3 className="text-lg font-semibold mb-3">Pricing</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-gray-600 mb-1">Daily Rate</p>
                        <p className="text-2xl font-semibold text-primary-600">{car.pricePerDay.toFixed(2)} €</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-gray-600 mb-1">Per Kilometer</p>
                        <p className="text-2xl font-semibold text-secondary-600">{car.pricePerKm.toFixed(2)} €</p>
                      </div>
                    </div>
                  </div>
                </Tab>
                <Tab key="rules" title="Rental Rules">
                  <div className="py-4">
                    <h2 className="text-xl font-display font-semibold mb-4">Rental Rules & Requirements</h2>
                    
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Driver Requirements</h3>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>Minimum age: 25 years</li>
                          <li>Valid driver's license for at least 5 years</li>
                          <li>Valid ID or passport</li>
                          <li>Credit card in the driver's name</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Security Deposit</h3>
                        <p>A security deposit of 1,000€ is required at the time of pickup. This will be refunded upon return of the vehicle in its original condition.</p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Mileage Policy</h3>
                        <p>Our rental includes 100 kilometers per day. Additional kilometers will be charged at the rate specified for each car.</p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Fuel Policy</h3>
                        <p>The car will be provided with a full tank of fuel and should be returned with a full tank. Otherwise, a refueling fee will apply.</p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Cancellation Policy</h3>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>More than 7 days before pickup: Full refund</li>
                          <li>3-7 days before pickup: 50% refund</li>
                          <li>Less than 3 days before pickup: No refund</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </Tab>
              </Tabs>
            </CardBody>
          </Card>
        </div>
        
        {/* Booking Form */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader className="pb-0">
              <h2 className="text-xl font-display font-semibold">Book This Car</h2>
            </CardHeader>
            <CardBody>
              {!car.available ? (
                <div className="text-center py-6">
                  <Icon icon="lucide:calendar-off" className="text-danger-500 text-5xl mx-auto mb-3" />
                  <h3 className="text-lg font-semibold mb-1">Currently Not Available</h3>
                  <p className="text-gray-600 mb-4">This car is currently rented out.</p>
                  <Button 
                    color="primary" 
                    variant="flat" 
                    onPress={() => history.push('/cars')}
                    fullWidth
                  >
                    Browse Other Cars
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        type="date"
                        label="Start Date"
                        placeholder="Select date"
                        value={startDate}
                        onValueChange={setStartDate}
                        min={new Date().toISOString().split('T')[0]}
                        isRequired
                      />
                      <Input
                        type="date"
                        label="End Date"
                        placeholder="Select date"
                        value={endDate}
                        onValueChange={setEndDate}
                        min={startDate || new Date().toISOString().split('T')[0]}
                        isRequired
                      />
                    </div>
                    
                    {rentalDays > 0 && (
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex justify-between mb-2">
                          <span>Daily rate:</span>
                          <span>{car.pricePerDay.toFixed(2)} € × {rentalDays} days</span>
                        </div>
                        <div className="flex justify-between font-semibold text-lg">
                          <span>Estimated total:</span>
                          <span>{estimatedPrice.toFixed(2)} €</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          *Additional charges for kilometers may apply
                        </p>
                      </div>
                    )}
                    
                    <Divider />
                    
                    <Input
                      label="Full Name"
                      placeholder="Enter your full name"
                      value={name}
                      onValueChange={setName}
                      isRequired
                    />
                    
                    <Input
                      type="email"
                      label="Email"
                      placeholder="Enter your email"
                      value={email}
                      onValueChange={setEmail}
                      isRequired
                    />
                    
                    <Input
                      label="Phone"
                      placeholder="Enter your phone number"
                      value={phone}
                      onValueChange={setPhone}
                      isRequired
                    />
                    
                    <Input
                      label="Driver's License Number"
                      placeholder="Enter your license number"
                      value={licenseNumber}
                      onValueChange={setLicenseNumber}
                      isRequired
                    />
                    
                    <Textarea
                      label="Message (Optional)"
                      placeholder="Any special requests or questions?"
                      value={message}
                      onValueChange={setMessage}
                    />
                    
                    <Button 
                      type="submit" 
                      color="primary" 
                      fullWidth
                      isDisabled={!startDate || !endDate || !name || !email || !phone || !licenseNumber}
                    >
                      Request Booking
                    </Button>
                    
                    {!isAuthenticated && (
                      <p className="text-xs text-center text-gray-500">
                        Already have an account? <Button as="a" href="/login" variant="light" size="sm" className="p-0">Log in</Button> for faster booking.
                      </p>
                    )}
                  </div>
                </form>
              )}
            </CardBody>
          </Card>
        </div>
      </div>
      
      {/* Booking Confirmation Modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Booking Request Submitted</ModalHeader>
              <ModalBody>
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-success-100 text-success-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon icon="lucide:check" width={32} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
                  <p className="text-gray-600">
                    Your booking request for the {car.name} has been submitted successfully.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <h4 className="font-semibold mb-2">Booking Details:</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>Start Date:</div>
                    <div className="font-medium">{startDate}</div>
                    <div>End Date:</div>
                    <div className="font-medium">{endDate}</div>
                    <div>Duration:</div>
                    <div className="font-medium">{rentalDays} days</div>
                    <div>Estimated Price:</div>
                    <div className="font-medium">{estimatedPrice.toFixed(2)} €</div>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600">
                  We will review your request and contact you shortly at {email} to confirm your booking.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};