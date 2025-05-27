import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Card, CardBody, CardHeader, Button, Tabs, Tab, Divider, Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Textarea } from "@heroui/react";
import { Icon } from '@iconify/react';
import api from '../../util/api';
import { useAuth } from '../../contexts/auth-context';
import { Car } from '../../data/types';

export const CarDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const { isAuthenticated } = useAuth();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [car, setCar] = React.useState<Car | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await api.get(`/api/public/cars/${id}`);
        setCar(response.data);
      } catch (err: any) {
        setError('Car not found');
        history.push('/cars');
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  // Form state
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [licenseNumber, setLicenseNumber] = React.useState('');
  const [message, setMessage] = React.useState('');

  const rentalDays = React.useMemo(() => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }, [startDate, endDate]);

  const estimatedPrice = React.useMemo(() => {
    if (!car || rentalDays === 0) return 0;
    return car.pricePerDay * rentalDays;
  }, [car, rentalDays]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpen();
  };

  if (loading) return <div className="text-center py-12">Loading...</div>;
  if (!car) return null;

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

          <h1 className="text-3xl font-display font-bold">
            {car.brand} {car.modelName}
          </h1>
          <div className="flex items-center gap-2 text-gray-600 mt-1">
            <span>Year {new Date(car.createdAt).getFullYear()}</span>
            <span>•</span>
            <span className={car.available ? "text-success-500" : "text-danger-500"}>
            {car.available ? "Available" : "Currently Rented"}
          </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="mb-8">
              <div className="h-[400px] overflow-hidden">
                <img
                    src={car.photoUrl}
                    alt={`${car.brand} ${car.modelName}`}
                    className="w-full h-full object-cover"
                />
              </div>
              <CardBody>
                <Tabs aria-label="Car details">
                  <Tab key="details" title="Details">
                    <div className="py-4">
                      <h3 className="text-lg font-semibold mb-3">Pricing</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-gray-600 mb-1">Daily Rate</p>
                          <p className="text-2xl font-semibold text-primary-600">{car.pricePerDay.toFixed(2)} {car.currency}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-gray-600 mb-1">Per Kilometer</p>
                          <p className="text-2xl font-semibold text-secondary-600">{car.pricePerKm.toFixed(2)} {car.currency}</p>
                        </div>
                      </div>
                    </div>
                  </Tab>
                  <Tab key="rules" title="Rental Rules">
                    <div className="py-4 space-y-4">
                      <h3 className="text-lg font-semibold">Driver Requirements</h3>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Minimum age: 25 years</li>
                        <li>Valid driver's license for at least 5 years</li>
                        <li>Valid ID or passport</li>
                        <li>Credit card in the driver's name</li>
                      </ul>

                      <h3 className="text-lg font-semibold">Security Deposit</h3>
                      <p className="text-sm">A refundable deposit of 1,000€ is required at pickup.</p>

                      <h3 className="text-lg font-semibold">Mileage & Fuel</h3>
                      <p className="text-sm">Includes 100 km/day. Full-to-full fuel policy applies.</p>

                      <h3 className="text-lg font-semibold">Cancellation Policy</h3>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>7+ days before: Full refund</li>
                        <li>3–6 days before: 50% refund</li>
                        <li>Less than 3 days: No refund</li>
                      </ul>
                    </div>
                  </Tab>
                </Tabs>
              </CardBody>
            </Card>
          </div>

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
                              value={startDate}
                              onValueChange={setStartDate}
                              min={new Date().toISOString().split('T')[0]}
                              isRequired
                          />
                          <Input
                              type="date"
                              label="End Date"
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
                            </div>
                        )}

                        <Divider />

                        <Input label="Full Name" value={name} onValueChange={setName} isRequired />
                        <Input label="Email" type="email" value={email} onValueChange={setEmail} isRequired />
                        <Input label="Phone" value={phone} onValueChange={setPhone} isRequired />
                        <Input label="Driver’s License" value={licenseNumber} onValueChange={setLicenseNumber} isRequired />
                        <Textarea label="Message (Optional)" value={message} onValueChange={setMessage} />

                        <Button type="submit" color="primary" fullWidth>
                          Request Booking
                        </Button>

                        {!isAuthenticated && (
                            <p className="text-xs text-center text-gray-500">
                              Already have an account? <Button as="a" href="/login" variant="light" size="sm">Log in</Button>
                            </p>
                        )}
                      </div>
                    </form>
                )}
              </CardBody>
            </Card>
          </div>
        </div>

        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
                <>
                  <ModalHeader>Booking Request Submitted</ModalHeader>
                  <ModalBody>
                    <div className="text-center mb-4">
                      <Icon icon="lucide:check-circle" className="text-success-500 text-4xl mx-auto mb-2" />
                      <p className="text-gray-700">Your booking for {car.brand} {car.modelName} has been submitted.</p>
                    </div>
                    <div className="text-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <span>Start:</span><span>{startDate}</span>
                        <span>End:</span><span>{endDate}</span>
                        <span>Days:</span><span>{rentalDays}</span>
                        <span>Estimated:</span><span>{estimatedPrice.toFixed(2)} €</span>
                      </div>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button onPress={onClose} color="primary">Close</Button>
                  </ModalFooter>
                </>
            )}
          </ModalContent>
        </Modal>
      </div>
  );
};
