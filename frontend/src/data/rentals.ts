import { getCars } from './cars.ts';

export interface Customer {
    id: number;
    name: string;
    email: string;
    phone: string;
    licenseNumber: string;
}

export interface Rental {
    id: number;
    carId: number;
    customerId: number;
    startDate: string;
    endDate: string;
    totalDays: number;
    totalKm: number;
    totalPrice: number;
    status: 'active' | 'completed' | 'cancelled';
}

export const customers: Customer[] = [
    {
        id: 1,
        name: "Hans Schmidt",
        email: "hans.schmidt@example.com",
        phone: "0170-1234567",
        licenseNumber: "B072389456"
    },
    {
        id: 2,
        name: "Maria Müller",
        email: "maria.mueller@example.com",
        phone: "0151-7654321",
        licenseNumber: "B065432198"
    },
    {
        id: 3,
        name: "Thomas Weber",
        email: "thomas.weber@example.com",
        phone: "0162-9876543",
        licenseNumber: "B089765432"
    }
];

export const rentals: Rental[] = [
    {
        id: 1,
        carId: 6,
        customerId: 1,
        startDate: "2024-01-24",
        endDate: "2024-01-31",
        totalDays: 7,
        totalKm: 491,
        totalPrice: 170.19,
        status: 'completed'
    },
    {
        id: 2,
        carId: 3,
        customerId: 2,
        startDate: "2024-06-15",
        endDate: "2024-06-20",
        totalDays: 5,
        totalKm: 350,
        totalPrice: 984.00,
        status: 'active'
    },
    {
        id: 3,
        carId: 7,
        customerId: 3,
        startDate: "2024-07-01",
        endDate: "2024-07-03",
        totalDays: 2,
        totalKm: 120,
        totalPrice: 994.80,
        status: 'active'
    }
];

export interface RentalWithDetails extends Rental {
    car?: Awaited<ReturnType<typeof getCars>>[number];
    customer?: Customer;
}

// ✅ Асинхронная функция получения аренды с деталями
export const getRentalDetails = async (): Promise<RentalWithDetails[]> => {
    const cars = await getCars();

    return rentals.map(rental => {
        const car = cars.find(c => c.id === rental.carId);
        const customer = customers.find(c => c.id === rental.customerId);

        return {
            ...rental,
            car,
            customer
        };
    });
};
