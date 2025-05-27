import React, { useEffect, useMemo, useState } from 'react';
import {
  Card, CardBody, CardHeader, Input, Button, Dropdown, DropdownTrigger,
  DropdownMenu, DropdownItem, Table, TableHeader, TableColumn, TableBody,
  TableRow, TableCell, Pagination, Switch, Modal, ModalContent, ModalHeader,
  ModalBody, ModalFooter, useDisclosure
} from "@heroui/react";
import { Icon } from '@iconify/react';
import api from '../../../util/api';
import { Car } from '../../../data/types';

export const AdminCars: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [editData, setEditData] = useState<Partial<Car>>({});
  const itemsPerPage = 10;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // Fetch all cars on mount
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await api.get('/api/public/cars');
        setCars(res.data);
      } catch (e) {
        console.error('Failed to fetch cars:', e);
      }
    };
    fetchCars();
  }, []);

  // Handle modal open
  const handleEditCar = (car: Car) => {
    setSelectedCar(car);
    setEditData({ ...car });
    onOpen();
  };

  const handleFieldChange = (field: keyof Car, value: string | number | boolean) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      const response = await api.put('/cars/edit', editData);
      const updatedCar = response.data;

      setCars(prev =>
          prev.map(car => (car.id === updatedCar.id ? updatedCar : car))
      );
      onOpenChange(false);
    } catch (error) {
      console.error('Failed to update car:', error);
    }
  };

  const filteredCars = useMemo(() => {
    return cars.filter(car => {
      const matchSearch = `${car.brand} ${car.modelName}`.toLowerCase().includes(searchTerm.toLowerCase());
      const matchStatus =
          availabilityFilter === 'all' ||
          (availabilityFilter === 'available' && car.available) ||
          (availabilityFilter === 'rented' && !car.available);
      return matchSearch && matchStatus;
    });
  }, [cars, searchTerm, availabilityFilter]);

  const paginatedCars = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredCars.slice(start, start + itemsPerPage);
  }, [filteredCars, currentPage]);

  const totalPages = Math.ceil(filteredCars.length / itemsPerPage);

  return (
      <div>
        <div className="mb-6">
          <h1 className="text-2xl font-display font-bold mb-2">Car Management</h1>
          <p className="text-gray-600">View and manage your car inventory.</p>
        </div>

        {/* Table + Filters */}
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
            <div className="flex gap-2">
              <Dropdown>
                <DropdownTrigger>
                  <Button variant="flat" endContent={<Icon icon="lucide:chevron-down" />}>
                    Availability: {availabilityFilter === 'all' ? 'All' : availabilityFilter}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                    selectedKeys={new Set([availabilityFilter])}
                    onSelectionChange={(keys) => {
                      const selected = Array.from(keys)[0] as string;
                      setAvailabilityFilter(selected);
                    }}
                    selectionMode="single"
                >
                  <DropdownItem key="all">All</DropdownItem>
                  <DropdownItem key="available">Available</DropdownItem>
                  <DropdownItem key="rented">Rented</DropdownItem>
                </DropdownMenu>
              </Dropdown>

              <Button color="primary" startContent={<Icon icon="lucide:plus" />}>
                Add New Car
              </Button>
            </div>
          </CardHeader>

          <CardBody>
            <Table aria-label="Cars table">
              <TableHeader>
                <TableColumn>CAR</TableColumn>
                <TableColumn>YEAR</TableColumn>
                <TableColumn>PRICING</TableColumn>
                <TableColumn>AVAILABILITY</TableColumn>
                <TableColumn>ACTIONS</TableColumn>
              </TableHeader>
              <TableBody emptyContent="No cars found">
                {paginatedCars.map(car => (
                    <TableRow key={car.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <img className="w-12 h-12 object-cover rounded" src={car.photoUrl} alt={`${car.brand} ${car.modelName}`} />
                          <div>
                            <p className="font-medium">{car.brand} {car.modelName}</p>
                            <p className="text-xs text-gray-500">ID: {car.id}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{new Date(car.createdAt).getFullYear()}</TableCell>
                      <TableCell>
                        <p><strong>{car.pricePerDay.toFixed(2)} €</strong> / day</p>
                        <p className="text-xs text-gray-500">{car.pricePerKm.toFixed(2)} € / km</p>
                      </TableCell>
                      <TableCell>
                        <Switch
                            isSelected={car.available}
                            size="sm"
                            color={car.available ? "success" : "danger"}
                            isReadOnly
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button isIconOnly size="sm" variant="light" onPress={() => handleEditCar(car)}>
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
                  <Pagination total={totalPages} page={currentPage} onChange={setCurrentPage} showControls />
                </div>
            )}
          </CardBody>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard icon="lucide:car" label="Total Cars" value={cars.length} color="primary" />
          <StatCard icon="lucide:check-circle" label="Available Cars" value={cars.filter(c => c.available).length} color="success" />
          <StatCard icon="lucide:x-circle" label="Rented Cars" value={cars.filter(c => !c.available).length} color="danger" />
        </div>

        {/* Edit Modal */}
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
          <ModalContent>
            {(onClose) => (
                <>
                  <ModalHeader>Edit Car: {editData.brand} {editData.modelName}</ModalHeader>
                  <ModalBody>
                    {editData && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Input label="Brand" value={editData.brand || ''} onValueChange={val => handleFieldChange('brand', val)} />
                          <Input label="Model" value={editData.modelName || ''} onValueChange={val => handleFieldChange('modelName', val)} />
                          <Input label="Image URL" value={editData.photoUrl || ''} onValueChange={val => handleFieldChange('photoUrl', val)} />
                          <Input
                              label="Price per Day (€)"
                              type="number"
                              value={editData.pricePerDay?.toString() || ''}
                              onValueChange={val => handleFieldChange('pricePerDay', parseFloat(val))}
                          />
                          <Input
                              label="Price per KM (€)"
                              type="number"
                              value={editData.pricePerKm?.toString() || ''}
                              onValueChange={val => handleFieldChange('pricePerKm', parseFloat(val))}
                          />
                          <div className="md:col-span-2">
                            <div className="flex justify-between items-center mt-2">
                              <p className="font-medium">Available</p>
                              <Switch
                                  isSelected={editData.available}
                                  onValueChange={val => handleFieldChange('available', val)}
                                  color={editData.available ? 'success' : 'danger'}
                              />
                            </div>
                          </div>
                        </div>
                    )}
                  </ModalBody>
                  <ModalFooter>
                    <Button variant="light" onPress={onClose}>Cancel</Button>
                    <Button color="primary" onPress={handleSave}>Save Changes</Button>
                  </ModalFooter>
                </>
            )}
          </ModalContent>
        </Modal>
      </div>
  );
};

// Helper StatCard component
const StatCard = ({ icon, label, value, color }: { icon: string, label: string, value: number, color: string }) => (
    <Card className="border border-gray-200">
      <CardBody className="flex items-center gap-4">
        <div className={`p-3 rounded-full bg-${color}-100 text-${color}-500`}>
          <Icon icon={icon} width={24} />
        </div>
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="text-2xl font-semibold">{value}</p>
        </div>
      </CardBody>
    </Card>
);
