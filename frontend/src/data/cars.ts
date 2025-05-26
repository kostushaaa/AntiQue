export interface Car {
  id: number;
  name: string;
  type: string;
  pricePerDay: number;
  pricePerKm: number;
  year: number;
  image: string;
  description: string;
  available: boolean;
  features: string[];
}

export const cars: Car[] = [
  {
    id: 1,
    name: "Audi 80",
    type: "Sedan",
    pricePerDay: 24.00,
    pricePerKm: 0.48,
    year: 1992,
    image: "https://img.heroui.chat/image/car?w=600&h=400&u=audi80",
    description: "Classic Audi 80 sedan, perfect for city trips and short journeys.",
    available: true,
    features: ["4 Doors", "5 Seats", "Manual Transmission", "Petrol"]
  },
  {
    id: 2,
    name: "Audi 100",
    type: "Sedan",
    pricePerDay: 50.00,
    pricePerKm: 1.00,
    year: 1990,
    image: "https://img.heroui.chat/image/car?w=600&h=400&u=audi100",
    description: "Luxurious Audi 100 with comfortable interior and smooth ride.",
    available: true,
    features: ["4 Doors", "5 Seats", "Automatic Transmission", "Petrol", "Air Conditioning"]
  },
  {
    id: 3,
    name: "Audi Coupe S",
    type: "Coupe",
    pricePerDay: 82.00,
    pricePerKm: 1.64,
    year: 1988,
    image: "https://img.heroui.chat/image/car?w=600&h=400&u=audicoupe",
    description: "Sporty Audi Coupe S with elegant design and powerful engine.",
    available: false,
    features: ["2 Doors", "4 Seats", "Manual Transmission", "Petrol", "Leather Interior"]
  },
  {
    id: 4,
    name: "BMW 2800 GTS",
    type: "Coupe",
    pricePerDay: 55.00,
    pricePerKm: 1.10,
    year: 1971,
    image: "https://img.heroui.chat/image/car?w=600&h=400&u=bmw2800",
    description: "Vintage BMW 2800 GTS with timeless design and excellent handling.",
    available: true,
    features: ["2 Doors", "4 Seats", "Manual Transmission", "Petrol", "Classic Design"]
  },
  {
    id: 5,
    name: "BMW 507",
    type: "Roadster",
    pricePerDay: 65.00,
    pricePerKm: 1.30,
    year: 1959,
    image: "https://img.heroui.chat/image/car?w=600&h=400&u=bmw507",
    description: "Iconic BMW 507 roadster, a true collector's item with stunning looks.",
    available: true,
    features: ["2 Doors", "2 Seats", "Manual Transmission", "Petrol", "Convertible"]
  },
  {
    id: 6,
    name: "Fiat 600 D",
    type: "Compact",
    pricePerDay: 5.00,
    pricePerKm: 0.22,
    year: 1965,
    image: "https://img.heroui.chat/image/car?w=600&h=400&u=fiat600",
    description: "Charming Fiat 600 D, perfect for exploring narrow city streets.",
    available: true,
    features: ["2 Doors", "4 Seats", "Manual Transmission", "Petrol", "Compact Size"]
  },
  {
    id: 7,
    name: "DeLorean DMC-12",
    type: "Sports Car",
    pricePerDay: 105.00,
    pricePerKm: 6.54,
    year: 1981,
    image: "https://img.heroui.chat/image/car?w=600&h=400&u=delorean",
    description: "Iconic DeLorean DMC-12 with stainless steel body and gull-wing doors.",
    available: true,
    features: ["2 Doors", "2 Seats", "Manual Transmission", "Petrol", "Gull-wing Doors"]
  },
  {
    id: 8,
    name: "Mazda 626 V",
    type: "Sedan",
    pricePerDay: 35.00,
    pricePerKm: 0.70,
    year: 1988,
    image: "https://img.heroui.chat/image/car?w=600&h=400&u=mazda626",
    description: "Reliable Mazda 626 V with comfortable ride and spacious interior.",
    available: true,
    features: ["4 Doors", "5 Seats", "Manual Transmission", "Petrol", "Air Conditioning"]
  }
];
