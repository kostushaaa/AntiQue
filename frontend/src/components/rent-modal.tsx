import React from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
  addToast
} from '@heroui/react';
import { Car } from '../data/types.ts';
import api from '../util/api';

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

  const handleSubmit = async () => {
    if (!car || !formData.startDate || !formData.endDate) return;

    try {
      await api.post('/bookings', {
        carId: car.id,
        startDate: formData.startDate,
        endDate: formData.endDate
      });

      addToast({
        title: "Reservierung erfolgreich",
        description: `Sie haben den ${car.brand} ${car.modelName} erfolgreich reserviert.`,
        color: "success"
      });

      onOpenChange(false);
    } catch (error) {
      console.error("Booking failed", error);
      addToast({
        title: "Fehler",
        description: "Die Reservierung konnte nicht abgeschlossen werden.",
        color: "danger"
      });
    }
  };

  if (!car) return null;

  return (
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
        <ModalContent>
          {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  {car.brand} {car.modelName} mieten
                </ModalHeader>
                <ModalBody>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <img
                          src={car.photoUrl}
                          alt={`${car.brand} ${car.modelName}`}
                          className="w-full h-48 object-cover rounded-lg"
                      />
                      <div className="mt-4">
                        <h3 className="text-lg font-bold">Fahrzeugdetails</h3>
                        <p><strong>Marke:</strong> {car.brand}</p>
                        <p><strong>Modell:</strong> {car.modelName}</p>
                        <p><strong>Baujahr:</strong> {new Date(car.createdAt).getFullYear()}</p>
                        <p><strong>Preis pro Tag:</strong> {parseFloat(car.pricePerDay).toFixed(2)} €</p>
                        <p><strong>Preis pro Kilometer:</strong> {parseFloat(car.pricePerKm).toFixed(2)} €</p>
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
