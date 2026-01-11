import { useState } from 'react';
import { Calendar, Clock, Car, User, Wrench } from 'lucide-react';

interface Service {
  id: string;
  name: string;
  price: string;
  duration: string;
  iconName?: string;
}

interface BookingFormProps {
  services: Service[];
  onSubmit: (booking: BookingData) => void;
  onBack: () => void;
}

export interface BookingData {
  id: string;
  serviceName: string;
  serviceNames?: string[];
  date: string;
  time: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: string;
  licensePlate: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  notes: string;
  status?: 'Pending' | 'Approved' | 'Completed' | 'Rejected';
}

export function BookingForm({ services, onSubmit, onBack }: BookingFormProps) {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    vehicleMake: '',
    vehicleModel: '',
    vehicleYear: '',
    licensePlate: '',
    customerName: '',
    email: '',
    phone: '',
    address: '',
    notes: ''
  });

  // Calculate total price and duration
  const calculateTotals = () => {
    const totalPrice = services.reduce((sum, service) => {
      return sum + parseFloat(service.price.replace('$', ''));
    }, 0);
    
    const totalMinutes = services.reduce((sum, service) => {
      const duration = service.duration.toLowerCase();
      if (duration.includes('hour')) {
        const hours = parseFloat(duration);
        return sum + (hours * 60);
      } else {
        return sum + parseFloat(duration);
      }
    }, 0);
    
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const durationText = hours > 0 
      ? `${hours}h ${minutes > 0 ? `${minutes}m` : ''}`
      : `${minutes}m`;
    
    return {
      price: totalPrice.toFixed(2),
      duration: durationText
    };
  };

  const totals = calculateTotals();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const serviceNames = services.map(s => s.name);
    const booking: BookingData = {
      id: Date.now().toString(),
      serviceName: serviceNames.join(', '),
      serviceNames: serviceNames,
      ...formData
    };
    onSubmit(booking);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-gray-900 mb-2">Booking Summary</h2>
        <p className="text-gray-600 mb-6">Review your selected services</p>
        
        <div className="space-y-3 mb-6">
          {services.map((service) => (
            <div key={service.id} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  {service.iconName ? <Wrench className="w-5 h-5" /> : <Wrench className="w-5 h-5" />}
                </div>
                <div>
                  <div className="text-gray-900">{service.name}</div>
                  <div className="text-sm text-gray-600">{service.duration}</div>
                </div>
              </div>
              <div className="text-blue-600">{service.price}</div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
          <div>
            <div className="text-gray-900">Total</div>
            <div className="text-sm text-gray-600">Estimated time: {totals.duration}</div>
          </div>
          <div className="text-2xl text-gray-900">${totals.price}</div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-gray-900 mb-6">Appointment Details</h2>
        
        {/* Date & Time */}
        <div className="mb-8">
          <h3 className="text-gray-900 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-500" />
            Select Date & Time
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="date" className="block text-sm text-gray-700 mb-2">
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                min={today}
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="time" className="block text-sm text-gray-700 mb-2">
                Time
              </label>
              <select
                id="time"
                name="time"
                value={formData.time}
                onChange={(e) => handleChange(e as any)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select time</option>
                <option value="08:00 AM">08:00 AM</option>
                <option value="09:00 AM">09:00 AM</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="11:00 AM">11:00 AM</option>
                <option value="12:00 PM">12:00 PM</option>
                <option value="01:00 PM">01:00 PM</option>
                <option value="02:00 PM">02:00 PM</option>
                <option value="03:00 PM">03:00 PM</option>
                <option value="04:00 PM">04:00 PM</option>
                <option value="05:00 PM">05:00 PM</option>
              </select>
            </div>
          </div>
        </div>

        {/* Vehicle Information */}
        <div className="mb-8">
          <h3 className="text-gray-900 mb-4 flex items-center gap-2">
            <Car className="w-5 h-5 text-blue-500" />
            Vehicle Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="vehicleMake" className="block text-sm text-gray-700 mb-2">
                Make
              </label>
              <input
                type="text"
                id="vehicleMake"
                name="vehicleMake"
                value={formData.vehicleMake}
                onChange={handleChange}
                required
                placeholder="e.g., Toyota"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="vehicleModel" className="block text-sm text-gray-700 mb-2">
                Model
              </label>
              <input
                type="text"
                id="vehicleModel"
                name="vehicleModel"
                value={formData.vehicleModel}
                onChange={handleChange}
                required
                placeholder="e.g., Camry"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="vehicleYear" className="block text-sm text-gray-700 mb-2">
                Year
              </label>
              <input
                type="text"
                id="vehicleYear"
                name="vehicleYear"
                value={formData.vehicleYear}
                onChange={handleChange}
                required
                placeholder="e.g., 2020"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="licensePlate" className="block text-sm text-gray-700 mb-2">
                License Plate
              </label>
              <input
                type="text"
                id="licensePlate"
                name="licensePlate"
                value={formData.licensePlate}
                onChange={handleChange}
                required
                placeholder="e.g., ABC1234"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mb-8">
          <h3 className="text-gray-900 mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-blue-500" />
            Contact Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label htmlFor="customerName" className="block text-sm text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="customerName"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                required
                placeholder="John Doe"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="john@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm text-gray-700 mb-2">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="(555) 123-4567"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="address" className="block text-sm text-gray-700 mb-2">
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                placeholder="123 Main St, City, State 12345"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Additional Notes */}
        <div className="mb-6">
          <label htmlFor="notes" className="block text-sm text-gray-700 mb-2">
            Additional Notes (Optional)
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={3}
            placeholder="Any specific concerns or requests?"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Back
          </button>
          <button
            type="submit"
            className="flex-1 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </form>
  );
}