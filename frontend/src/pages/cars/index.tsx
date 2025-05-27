import React from 'react';
import { Link as RouteLink } from 'react-router-dom';
import { Card, CardBody, CardFooter, Button, Input, Checkbox, CheckboxGroup, Divider } from "@heroui/react";
import { Icon } from '@iconify/react';
import api from '../../util/api'; // путь к твоему axios-клиенту
import { Car } from '../../data/types'; // обновлённый тип см. ниже

export const CarsPage: React.FC = () => {
  const [cars, setCars] = React.useState<Car[]>([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedTypes, setSelectedTypes] = React.useState<string[]>([]);
  const [showOnlyAvailable, setShowOnlyAvailable] = React.useState(true);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const response = await api.get('/api/public/cars');
        setCars(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const carBrands = React.useMemo(() => {
    return Array.from(new Set(cars.map(car => car.brand)));
  }, [cars]);

  const filteredCars = React.useMemo(() => {
    return cars.filter(car => {
      const matchesSearch = `${car.brand} ${car.modelName}`.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesBrand = selectedTypes.length === 0 || selectedTypes.includes(car.brand);
      const matchesAvailability = !showOnlyAvailable || car.available;
      return matchesSearch && matchesBrand && matchesAvailability;
    });
  }, [cars, searchTerm, selectedTypes, showOnlyAvailable]);

  if (loading) {
    return <div className="text-center py-12">Loading cars...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-500">Error: {error}</div>;
  }

  return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold mb-2">Our Classic Car Collection</h1>
          <p className="text-gray-600">
            Browse our selection of vintage and classic cars available for rent.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardBody>
                <h2 className="text-xl font-display font-semibold mb-4">Filters</h2>

                <div className="mb-6">
                  <Input
                      label="Search"
                      placeholder="Search by brand or model..."
                      value={searchTerm}
                      onValueChange={setSearchTerm}
                      startContent={<Icon icon="lucide:search" />}
                      clearable
                  />
                </div>

                <Divider className="my-4" />

                <div className="mb-6">
                  <h3 className="text-md font-semibold mb-2">Brand</h3>
                  <CheckboxGroup value={selectedTypes} onValueChange={setSelectedTypes}>
                    {carBrands.map(brand => (
                        <Checkbox key={brand} value={brand}>
                          {brand}
                        </Checkbox>
                    ))}
                  </CheckboxGroup>
                </div>

                <Divider className="my-4" />

                <div>
                  <h3 className="text-md font-semibold mb-2">Availability</h3>
                  <Checkbox
                      isSelected={showOnlyAvailable}
                      onValueChange={setShowOnlyAvailable}
                  >
                    Show only available cars
                  </Checkbox>
                </div>

                <Divider className="my-4" />

                <Button
                    color="primary"
                    variant="flat"
                    fullWidth
                    onPress={() => {
                      setSearchTerm('');
                      setSelectedTypes([]);
                      setShowOnlyAvailable(true);
                    }}
                >
                  Reset Filters
                </Button>
              </CardBody>
            </Card>
          </div>

          {/* Car Listings */}
          <div className="lg:col-span-3">
            {filteredCars.length === 0 ? (
                <div className="text-center py-12">
                  <Icon icon="lucide:car-off" className="text-gray-400 text-6xl mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No cars found</h3>
                  <p className="text-gray-500">Try adjusting your filters to find what you're looking for.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredCars.map((car) => (
                      <Card key={car.id} className="border border-gray-200">
                        <div className="relative h-48 overflow-hidden">
                          <img
                              src={car.photoUrl}
                              alt={`${car.brand} ${car.modelName}`}
                              className="w-full h-full object-cover"
                          />
                          {!car.available && (
                              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="bg-danger-500 text-white px-3 py-1 rounded-md font-medium">
                          Currently Rented
                        </span>
                              </div>
                          )}
                          <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded text-xs font-medium">
                            {new Date(car.createdAt).getFullYear()}
                          </div>
                        </div>
                        <CardBody>
                          <h3 className="text-xl font-display font-semibold">
                            {car.brand} {car.modelName}
                          </h3>
                          <p className="text-gray-500 text-sm mb-3">{car.brand}</p>
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-sm text-gray-600">Price per day</p>
                              <p className="text-xl font-semibold text-primary-600">
                                {car.pricePerDay.toFixed(2)} {car.currency}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Price per km</p>
                              <p className="text-lg font-semibold text-secondary-600">
                                {car.pricePerKm.toFixed(2)} {car.currency}
                              </p>
                            </div>
                          </div>
                        </CardBody>
                        <CardFooter>
                          <Button
                              as={RouteLink}
                              to={`/cars/${car.id}`}
                              color="primary"
                              variant={car.available ? "solid" : "flat"}
                              fullWidth
                              isDisabled={!car.available}
                          >
                            {car.available ? "View Details" : "Not Available"}
                          </Button>
                        </CardFooter>
                      </Card>
                  ))}
                </div>
            )}
          </div>
        </div>
      </div>
  );
};
