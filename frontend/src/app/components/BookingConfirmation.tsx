import { CheckCircle, Calendar, Clock, Car, Mail, Phone } from 'lucide-react';
import { BookingData } from './BookingForm';

interface BookingConfirmationProps {
  booking: BookingData;
  onViewBookings: () => void;
  onBookAnother: () => void;
}

export function BookingConfirmation({ booking, onViewBookings, onBookAnother }: BookingConfirmationProps) {
  const servicesList = booking.serviceNames || [booking.serviceName];
  
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* Success Message */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <h1 className="text-gray-900 mb-2">Booking Confirmed!</h1>
        <p className="text-xl text-gray-600">
          Your service appointment has been successfully scheduled
        </p>
      </div>

      {/* Booking Details */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-gray-900 mb-6">Appointment Details</h2>
        
        <div className="space-y-6">
          {/* Service */}
          <div className="flex items-start gap-4 pb-6 border-b border-gray-100">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <div className="text-sm text-gray-500 mb-1">
                {servicesList.length > 1 ? 'Services' : 'Service'}
              </div>
              <div className="space-y-1">
                {servicesList.map((service, index) => (
                  <div key={index} className="text-gray-900">{service}</div>
                ))}
              </div>
            </div>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-gray-100">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Date</div>
                <div className="text-gray-900">
                  {new Date(booking.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Time</div>
                <div className="text-gray-900">{booking.time}</div>
              </div>
            </div>
          </div>

          {/* Vehicle */}
          <div className="flex items-start gap-4 pb-6 border-b border-gray-100">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Car className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">Vehicle</div>
              <div className="text-gray-900">
                {booking.vehicleYear} {booking.vehicleMake} {booking.vehicleModel}
              </div>
              <div className="text-gray-600 text-sm mt-1">
                License Plate: {booking.licensePlate}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <div className="text-sm text-gray-500 mb-3">Contact Information</div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-900">
                <Mail className="w-4 h-4 text-gray-400" />
                {booking.email}
              </div>
              <div className="flex items-center gap-2 text-gray-900">
                <Phone className="w-4 h-4 text-gray-400" />
                {booking.phone}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-blue-50 rounded-lg p-6 mb-8">
        <h3 className="text-gray-900 mb-4">What's Next?</h3>
        <ul className="space-y-3 text-gray-600">
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <span>You'll receive a confirmation email at {booking.email}</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <span>We'll send you a reminder 24 hours before your appointment</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <span>Please arrive 10 minutes early to check in</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <span>Bring your vehicle registration and any relevant service history</span>
          </li>
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4">
        <button
          onClick={onViewBookings}
          className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          View My Bookings
        </button>
        <button
          onClick={onBookAnother}
          className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Book Another Service
        </button>
      </div>
    </div>
  );
}