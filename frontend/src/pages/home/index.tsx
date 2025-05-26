import React from 'react';
import { Link as RouteLink } from 'react-router-dom';
import { Button, Card, CardBody, CardFooter } from "@heroui/react";
import { Icon } from '@iconify/react';
import { cars } from '../../data/cars.ts';

export const HomePage: React.FC = () => {
  // Get only available cars for the featured section
  const featuredCars = cars.filter(car => car.available).slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px] bg-secondary-800 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://img.heroui.chat/image/car?w=1920&h=1080&u=vintage_cars_hero" 
            alt="Vintage cars" 
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="container mx-auto px-4 h-full flex items-center relative z-10">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-4">
              Classic Cars for Unforgettable Journeys
            </h1>
            <p className="text-xl mb-8">
              Experience the charm and elegance of vintage automobiles. Our collection of classic cars is ready for your next adventure.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                as={RouteLink} 
                to="/cars" 
                color="primary" 
                size="lg" 
                className="font-semibold"
                startContent={<Icon icon="lucide:car" />}
              >
                Browse Our Cars
              </Button>
              <Button 
                as="a" 
                href="#how-it-works" 
                variant="bordered" 
                size="lg" 
                className="text-white border-white font-semibold"
              >
                How It Works
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cars */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold mb-4">Featured Vintage Cars</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our handpicked selection of classic automobiles, each with its own unique history and character.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCars.map((car) => (
              <Card key={car.id} className="border border-gray-200 overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={car.image} 
                    alt={car.name} 
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                  />
                </div>
                <CardBody>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-display font-semibold">{car.name}</h3>
                    <div className="px-2 py-1 bg-primary-100 text-primary-700 rounded-md text-xs font-medium">
                      {car.year}
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm mb-4">{car.type}</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-600">Price per day</p>
                      <p className="text-xl font-semibold text-primary-600">{car.pricePerDay.toFixed(2)} €</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Price per km</p>
                      <p className="text-lg font-semibold text-secondary-600">{car.pricePerKm.toFixed(2)} €</p>
                    </div>
                  </div>
                </CardBody>
                <CardFooter>
                  <Button 
                    as={RouteLink} 
                    to={`/cars/${car.id}`} 
                    color="primary" 
                    variant="flat" 
                    fullWidth
                  >
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              as={RouteLink} 
              to="/cars" 
              color="primary" 
              variant="solid" 
              size="lg"
            >
              View All Cars
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Renting a classic car with us is simple and straightforward. Follow these easy steps to get started.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                <Icon icon="lucide:search" width={28} />
              </div>
              <h3 className="text-xl font-display font-semibold mb-3">1. Choose Your Car</h3>
              <p className="text-gray-600">
                Browse our collection and select the perfect vintage car for your occasion.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                <Icon icon="lucide:calendar" width={28} />
              </div>
              <h3 className="text-xl font-display font-semibold mb-3">2. Book Your Dates</h3>
              <p className="text-gray-600">
                Select your rental dates and complete the booking process online.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                <Icon icon="lucide:key" width={28} />
              </div>
              <h3 className="text-xl font-display font-semibold mb-3">3. Enjoy Your Ride</h3>
              <p className="text-gray-600">
                Pick up your car at our location and enjoy your classic car experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-secondary-500 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold mb-4">What Our Customers Say</h2>
            <p className="max-w-2xl mx-auto opacity-80">
              Hear from our satisfied customers about their experiences with our vintage car rentals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white/10 backdrop-blur-sm border-none text-white">
              <CardBody>
                <div className="flex items-center mb-4">
                  <Icon icon="lucide:star" className="text-primary-300" />
                  <Icon icon="lucide:star" className="text-primary-300" />
                  <Icon icon="lucide:star" className="text-primary-300" />
                  <Icon icon="lucide:star" className="text-primary-300" />
                  <Icon icon="lucide:star" className="text-primary-300" />
                </div>
                <p className="mb-4 italic">
                  "Renting the BMW 507 for our wedding was the best decision. It made our special day even more memorable. The service was excellent!"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                    <img 
                      src="https://img.heroui.chat/image/avatar?w=100&h=100&u=person1" 
                      alt="Customer" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">Michael & Anna</p>
                    <p className="text-sm opacity-80">Berlin</p>
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-none text-white">
              <CardBody>
                <div className="flex items-center mb-4">
                  <Icon icon="lucide:star" className="text-primary-300" />
                  <Icon icon="lucide:star" className="text-primary-300" />
                  <Icon icon="lucide:star" className="text-primary-300" />
                  <Icon icon="lucide:star" className="text-primary-300" />
                  <Icon icon="lucide:star" className="text-primary-300" />
                </div>
                <p className="mb-4 italic">
                  "I surprised my father with a weekend rental of the Audi Coupe S for his 60th birthday. He was thrilled and couldn't stop smiling!"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                    <img 
                      src="https://img.heroui.chat/image/avatar?w=100&h=100&u=person2" 
                      alt="Customer" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">Thomas Weber</p>
                    <p className="text-sm opacity-80">Munich</p>
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-none text-white">
              <CardBody>
                <div className="flex items-center mb-4">
                  <Icon icon="lucide:star" className="text-primary-300" />
                  <Icon icon="lucide:star" className="text-primary-300" />
                  <Icon icon="lucide:star" className="text-primary-300" />
                  <Icon icon="lucide:star" className="text-primary-300" />
                  <Icon icon="lucide:star-half" className="text-primary-300" />
                </div>
                <p className="mb-4 italic">
                  "The DeLorean DMC-12 was a dream come true! It turned heads everywhere we went. The rental process was smooth and hassle-free."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                    <img 
                      src="https://img.heroui.chat/image/avatar?w=100&h=100&u=person3" 
                      alt="Customer" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">Julia Schmidt</p>
                    <p className="text-sm opacity-80">Hamburg</p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="bg-primary-500 rounded-xl p-8 md:p-12 text-white text-center">
            <h2 className="text-3xl font-display font-bold mb-4">Ready for a Classic Experience?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Book your vintage car today and create memories that will last a lifetime.
            </p>
            <Button 
              as={RouteLink} 
              to="/cars" 
              color="secondary" 
              size="lg" 
              className="font-semibold"
            >
              Browse Cars
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};