import React from 'react';
import { Card, CardBody, CardHeader, Input, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination } from "@heroui/react";
import { Icon } from '@iconify/react';
import { getRentalDetails } from '../../../data/rentals.ts';

export const AdminRentals: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState<string>('all');
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;
  
  // Get rental details with car and customer info
  const allRentals = React.useMemo(() => {
    return getRentalDetails();
  }, []);
  
  // Filter rentals based on search term and status
  const filteredRentals = React.useMemo(() => {
    return allRentals.filter(rental => {
      // Filter by search term
      const searchMatch = 
        rental.car?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rental.customer?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rental.customer?.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filter by status
      const statusMatch = statusFilter === 'all' || rental.status === statusFilter;
      
      return searchMatch && statusMatch;
    });
  }, [allRentals, searchTerm, statusFilter]);
  
  // Paginate rentals
  const paginatedRentals = React.useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredRentals.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredRentals, currentPage]);
  
  // Calculate total pages
  const totalPages = React.useMemo(() => {
    return Math.ceil(filteredRentals.length / itemsPerPage);
  }, [filteredRentals]);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold mb-2">Rental Management</h1>
        <p className="text-gray-600">
          View and manage all car rentals.
        </p>
      </div>
      
      <Card className="border border-gray-200 mb-6">
        <CardHeader className="flex flex-col sm:flex-row justify-between gap-4">
          <Input
            placeholder="Search by car or customer..."
            value={searchTerm}
            onValueChange={setSearchTerm}
            startContent={<Icon icon="lucide:search" />}
            className="max-w-md"
            clearable
          />
          
          <div className="flex gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button 
                  variant="flat" 
                  endContent={<Icon icon="lucide:chevron-down" />}
                >
                  Status: {statusFilter === 'all' ? 'All' : statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
                </Button>
              </DropdownTrigger>
              <DropdownMenu 
                aria-label="Status filter"
                selectedKeys={new Set([statusFilter])}
                onSelectionChange={(keys) => {
                  const selected = Array.from(keys)[0] as string;
                  if (selected) setStatusFilter(selected);
                }}
                selectionMode="single"
              >
                <DropdownItem key="all">All</DropdownItem>
                <DropdownItem key="active">Active</DropdownItem>
                <DropdownItem key="completed">Completed</DropdownItem>
                <DropdownItem key="cancelled">Cancelled</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            
            <Button 
              color="primary" 
              startContent={<Icon icon="lucide:plus" />}
            >
              New Rental
            </Button>
          </div>
        </CardHeader>
        
        <CardBody>
          <Table aria-label="Rentals table">
            <TableHeader>
              <TableColumn>CAR</TableColumn>
              <TableColumn>CUSTOMER</TableColumn>
              <TableColumn>DATES</TableColumn>
              <TableColumn>DURATION</TableColumn>
              <TableColumn>PRICE</TableColumn>
              <TableColumn>STATUS</TableColumn>
              <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody emptyContent="No rentals found">
              {paginatedRentals.map((rental) => (
                <TableRow key={rental.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded overflow-hidden">
                        <img 
                          src={rental.car?.image} 
                          alt={rental.car?.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{rental.car?.name}</p>
                        <p className="text-xs text-gray-500">{rental.car?.type}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="font-medium">{rental.customer?.name}</p>
                    <p className="text-xs text-gray-500">{rental.customer?.email}</p>
                  </TableCell>
                  <TableCell>
                    <p>{rental.startDate}</p>
                    <p className="text-xs text-gray-500">to {rental.endDate}</p>
                  </TableCell>
                  <TableCell>
                    <p>{rental.totalDays} days</p>
                    <p className="text-xs text-gray-500">{rental.totalKm} km</p>
                  </TableCell>
                  <TableCell>
                    <p className="font-semibold">{rental.totalPrice.toFixed(2)} €</p>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      rental.status === 'active' 
                        ? 'bg-success-100 text-success-700' 
                        : rental.status === 'completed'
                        ? 'bg-gray-100 text-gray-700'
                        : 'bg-danger-100 text-danger-700'
                    }`}>
                      {rental.status.charAt(0).toUpperCase() + rental.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button isIconOnly size="sm" variant="light">
                        <Icon icon="lucide:eye" />
                      </Button>
                      <Button isIconOnly size="sm" variant="light">
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
              <p className="text-sm text-gray-500">Total Rentals</p>
              <p className="text-2xl font-semibold">{allRentals.length}</p>
            </div>
          </CardBody>
        </Card>
        
        <Card className="border border-gray-200">
          <CardBody className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-success-100 text-success-500">
              <Icon icon="lucide:check-circle" width={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Active Rentals</p>
              <p className="text-2xl font-semibold">
                {allRentals.filter(r => r.status === 'active').length}
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
              <p className="text-2xl font-semibold">
                {allRentals.reduce((sum, r) => sum + r.totalPrice, 0).toFixed(2)} €
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};