import React from 'react';
import { Card, CardBody, CardHeader, Input, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Switch, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/react";
import { Icon } from '@iconify/react';
import { cars } from '../../../data/cars';

export const AdminCars: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [typeFilter, setTypeFilter] = React.useState<string>('all');
  const [availabilityFilter, setAvailabilityFilter] = React.useState<string>('all');
  const [currentPage, setCurrentPage] = React.useState(1);
  const [selectedCar, setSelectedCar] = React.useState<typeof cars[0] | null>(null);
  const itemsPerPage = 10;
  
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  
  // Get unique car types for filter
  const carTypes = React.useMemo(() => {
    return Array.from(new Set(cars.map(car => car.type)));
  }, []);
  
  // Filter cars based on search term, type, and availability
  const filteredCars = React.useMemo(() => {
    return cars.filter(car => {
      // Filter by search term
      const searchMatch = 
        car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filter by car type
      const typeMatch = typeFilter === 'all' || car.type === typeFilter;
      
      // Filter by availability
      const availabilityMatch = 
        availabilityFilter === 'all' || 
        (availabilityFilter === 'available' && car.available) || 
        (availabilityFilter === 'rented' && !car.available);
      
      return searchMatch && typeMatch && availabilityMatch;
    });
  }, [searchTerm, typeFilter, availabilityFilter]);
  
  // Paginate cars
  const paginatedCars = React.useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredCars.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredCars, currentPage]);
  
  // Calculate total pages
  const totalPages = React.useMemo(() => {
    return Math.ceil(filteredCars.length / itemsPerPage);
  }, [filteredCars]);
  
  // Handle car edit
  const handleEditCar = (car: typeof cars[0]) => {
    setSelectedCar(car);
    onOpen();
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold mb-2">Car Management</h1>
        <p className="text-gray-600">
          View and manage your car inventory.
        </p>
      </div>
      
      <Card className="border border-gray-200 mb-6">
        <CardHeader className="flex flex-col sm:flex-row justify-between gap-4">
          <Input
            placeholder="Search cars..."
            value={searchTerm}
            onValueChange={setSearchTerm}
            startContent={<Icon icon="lucide:search" />}
            className="max-w-md"
            clearable
          />
          
          <div className="flex flex-wrap gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button 
                  variant="flat" 
                  endContent={<Icon icon="lucide:chevron-down" />}
                >
                  Type: {typeFilter === 'all' ? 'All' : typeFilter}
                </Button>
              </DropdownTrigger>
              <DropdownMenu 
                aria-label="Type filter"
                selectedKeys={new Set([typeFilter])}
                onSelectionChange={(keys) => {
                  const selected = Array.from(keys)[0] as string;
                  if (selected) setTypeFilter(selected);
                }}
                selectionMode="single"
              >
                <DropdownItem key="all">All</DropdownItem>
                {carTypes.map(type => (
                  <DropdownItem key={type}>{type}</DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            
            <Dropdown>
              <DropdownTrigger>
                <Button 
                  variant="flat" 
                  endContent={<Icon icon="lucide:chevron-down" />}
                >
                  Availability: {
                    availabilityFilter === 'all' 
                      ? 'All' 
                      : availabilityFilter === 'available' 
                      ? 'Available' 
                      : 'Rented'
                  }
                </Button>
              </DropdownTrigger>
              <DropdownMenu 
                aria-label="Availability filter"
                selectedKeys={new Set([availabilityFilter])}
                onSelectionChange={(keys) => {
                  const selected = Array.from(keys)[0] as string;
                  if (selected) setAvailabilityFilter(selected);
                }}
                selectionMode="single"
              >
                <DropdownItem key="all">All</DropdownItem>
                <DropdownItem key="available">Available</DropdownItem>
                <DropdownItem key="rented">Rented</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            
            <Button 
              color="primary" 
              startContent={<Icon icon="lucide:plus" />}
            >
              Add New Car
            </Button>
          </div>
        </CardHeader>
        
        <CardBody>
          <Table aria-label="Cars table">
            <TableHeader>
              <TableColumn>CAR</TableColumn>
              <TableColumn>YEAR</TableColumn>
              <TableColumn>TYPE</TableColumn>
              <TableColumn>PRICING</TableColumn>
              <TableColumn>AVAILABILITY</TableColumn>
              <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody emptyContent="No cars found">
              {paginatedCars.map((car) => (
                <TableRow key={car.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded overflow-hidden">
                        <img 
                          src={car.image} 
                          alt={car.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{car.name}</p>
                        <p className="text-xs text-gray-500 line-clamp-1">{car.description.substring(0, 50)}...</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{car.year}</TableCell>
                  <TableCell>{car.type}</TableCell>
                  <TableCell>
                    <p><span className="font-semibold">{car.pricePerDay.toFixed(2)} €</span> / day</p>
                    <p className="text-xs text-gray-500">{car.pricePerKm.toFixed(2)} € / km</p>
                  </TableCell>
                  <TableCell>
                    <Switch 
                      isSelected={car.available}
                      size="sm"
                      color={car.available ? "success" : "danger"}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        isIconOnly 
                        size="sm" 
                        variant="light"
                        onPress={() => handleEditCar(car)}
                      >
                        <Icon icon="lucide:edit" />
                      </Button>
                      <Button isIconOnly size="sm" variant="light" color="danger">
                        <Icon icon="lucide:trash" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {totalPages > 1 && (
            <div className="flex justify-center mt-6">
              <Pagination 
                total={totalPages} 
                page={currentPage} 
                onChange={setCurrentPage}
                showControls
              />
            </div>
          )}
        </CardBody>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border border-gray-200">
          <CardBody className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-primary-100 text-primary-500">
              <Icon icon="lucide:car" width={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Cars</p>
              <p className="text-2xl font-semibold">{cars.length}</p>
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
                {cars.filter(car => car.available).length}
              </p>
            </div>
          </CardBody>
        </Card>
        
        <Card className="border border-gray-200">
          <CardBody className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-danger-100 text-danger-500">
              <Icon icon="lucide:x-circle" width={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Rented Cars</p>
              <p className="text-2xl font-semibold">
                {cars.filter(car => !car.available).length}
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
      
      {/* Edit Car Modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit Car: {selectedCar?.name}
              </ModalHeader>
              <ModalBody>
                {selectedCar && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <div className="h-48 rounded-lg overflow-hidden mb-4">
                        <img 
                          src={selectedCar.image} 
                          alt={selectedCar.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    
                    <Input
                      label="Car Name"
                      placeholder="Enter car name"
                      value={selectedCar.name}
                    />
                    
                    <Input
                      label="Year"
                      placeholder="Enter year"
                      value={selectedCar.year.toString()}
                      type="number"
                    />
                    
                    <Input
                      label="Type"
                      placeholder="Enter car type"
                      value={selectedCar.type}
                    />
                    
                    <div className="flex gap-2">
                      <Input
                        label="Price per Day (€)"
                        placeholder="Enter price"
                        value={selectedCar.pricePerDay.toString()}
                        type="number"
                        step="0.01"
                      />
                      
                      <Input
                        label="Price per KM (€)"
                        placeholder="Enter price"
                        value={selectedCar.pricePerKm.toString()}
                        type="number"
                        step="0.01"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <Input
                        label="Description"
                        placeholder="Enter car description"
                        value={selectedCar.description}
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">Availability</p>
                        <Switch 
                          isSelected={selectedCar.available}
                          color={selectedCar.available ? "success" : "danger"}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={onClose}>
                  Save Changes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};