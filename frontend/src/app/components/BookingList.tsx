import { Calendar, Clock, Car, Trash2 } from 'lucide-react';
import { BookingData } from './BookingForm';

interface BookingListProps {
  bookings: BookingData[];
  onDelete: (id: string) => void;
}

export function BookingList({ bookings, onDelete }: BookingListProps) {
  if (bookings.length === 0) {
    return (
      <div className="max-w-3xl mx-auto text-center py-12">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
          <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-gray-900 mb-2">No Bookings Yet</h3>
          <p className="text-gray-600">
            Your service bookings will appear here once you schedule an appointment.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h2 className="text-gray-900">My Bookings</h2>
        <p className="text-gray-600">Manage your scheduled service appointments</p>
      </div>

      <div className="space-y-4">
        {bookings.map((booking) => {
          const servicesList = booking.serviceNames || [booking.serviceName];
          const status = booking.status || 'Pending';
          
          const getStatusColor = (status: string) => {
            switch (status) {
              case 'Pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
              case 'Approved': return 'bg-green-100 text-green-700 border-green-200';
              case 'Completed': return 'bg-blue-100 text-blue-700 border-blue-200';
              case 'Rejected': return 'bg-red-100 text-red-700 border-red-200';
              default: return 'bg-gray-100 text-gray-700 border-gray-200';
            }
          };
          
          return (
            <div
              key={booking.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-gray-900">
                      {servicesList.length > 1 ? `${servicesList.length} Services` : servicesList[0]}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-sm border ${getStatusColor(status)}`}>
                      {status}
                    </span>
                  </div>
                  {servicesList.length > 1 && (
                    <div className="flex flex-wrap gap-2 mb-2">
                      {servicesList.map((service, index) => (
                        <span key={index} className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                          {service}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(booking.date).toLocaleDateString('en-US', {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {booking.time}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => onDelete(booking.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  aria-label="Cancel booking"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Vehicle</p>
                  <div className="flex items-center gap-2 text-gray-900">
                    <Car className="w-4 h-4 text-gray-400" />
                    <span>
                      {booking.vehicleYear} {booking.vehicleMake} {booking.vehicleModel}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    License: {booking.licensePlate}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">Contact</p>
                  <p className="text-gray-900">{booking.customerName}</p>
                  <p className="text-sm text-gray-600">{booking.phone}</p>
                  <p className="text-sm text-gray-600">{booking.email}</p>
                </div>

                {booking.notes && (
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-500 mb-1">Notes</p>
                    <p className="text-gray-700">{booking.notes}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}