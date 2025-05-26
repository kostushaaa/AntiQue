import React from 'react';
import { 
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter, 
  Button,
  Input,
  Textarea
} from '@heroui/react';
import { Car } from './car-card.tsx';
import { addToast } from '@heroui/react';

interface RentModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  car: Car | null;
}

const RentModal: React.FC<RentModalProps> = ({ isOpen, onOpenChange, car }) => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    startDate: '',
    endDate: '',
    notes: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    // In a real app, this would send data to a backend API
    console.log('Rental data:', { car, ...formData });
    
    // Show success message
    addToast({
      title: "Reservierung erfolgreich",
      description: `Sie haben den ${car?.brand} ${car?.model} erfolgreich reserviert.`,
      color: "success"
    });
    
    // Close modal
    onOpenChange(false);
  };

  if (!car) return null;

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {car.brand} {car.model} mieten
            </ModalHeader>
            <ModalBody>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <img 
                    src={car.image} 
                    alt={`${car.brand} ${car.model}`}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="mt-4">
                    <h3 className="text-lg font-bold">Fahrzeugdetails</h3>
                    <p><strong>Marke:</strong> {car.brand}</p>
                    <p><strong>Modell:</strong> {car.model}</p>
                    <p><strong>Baujahr:</strong> {car.year}</p>
                    <p><strong>Preis pro Tag:</strong> {car.pricePerDay.toFixed(2)} €</p>
                    <p><strong>Preis pro Kilometer:</strong> {car.pricePerKm.toFixed(2)} €</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">Persönliche Daten</h3>
                  <div className="space-y-4">
                    <Input
                      label="Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      isRequired
                    />
                    <Input
                      label="E-Mail"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      isRequired
                    />
                    <Input
                      label="Telefon"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      isRequired
                    />
                    <Input
                      label="Abholdatum"
                      name="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={handleChange}
                      isRequired
                    />
                    <Input
                      label="Rückgabedatum"
                      name="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={handleChange}
                      isRequired
                    />
                    <Textarea
                      label="Anmerkungen"
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Abbrechen
              </Button>
              <Button color="primary" onPress={handleSubmit}>
                Reservieren
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default RentModal;