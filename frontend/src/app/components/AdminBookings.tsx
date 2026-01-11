import { useState } from 'react';
import { Calendar, Clock, Car, Mail, Phone, MapPin, Filter } from 'lucide-react';
import { BookingData } from './BookingForm';

interface AdminBookingsProps {
  bookings: BookingData[];
  onUpdateStatus: (id: string, status: BookingData['status']) => void;
}

export function AdminBookings({ bookings, onUpdateStatus }: AdminBookingsProps) {
  const [filter, setFilter] = useState<'All' | 'Pending' | 'Approved' | 'Completed' | 'Rejected'>('All');
  const [expandedBooking, setExpandedBooking] = useState<string | null>(null);

  const filteredBookings = filter === 'All' 
    ? bookings 
    : bookings.filter(b => b.status === filter);

  const sortedBookings = [...filteredBookings].sort((a, b) => {
    // Sort by date descending (newest first)
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

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
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Booking Management</h1>
        <p className="text-gray-600">View and manage all service bookings</p>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="w-5 h-5 text-gray-500" />
          <span className="text-sm text-gray-700 mr-2">Filter by status:</span>
          {(['All', 'Pending', 'Approved', 'Completed', 'Rejected'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                filter === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {status}
              {status !== 'All' && (
                <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                  {bookings.filter(b => b.status === status).length}
                </span>
              )}
              {status === 'All' && (
                <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                  {bookings.length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings List */}
      {sortedBookings.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-gray-900 mb-2">No Bookings Found</h3>
          <p className="text-gray-600">
            {filter === 'All' 
              ? 'No bookings have been created yet.' 
              : `No ${filter.toLowerCase()} bookings found.`}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedBookings.map((booking) => {
            const servicesList = booking.serviceNames || [booking.serviceName];
            const isExpanded = expandedBooking === booking.id;

            return (
              <div
                key={booking.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
              >
                {/* Header */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-gray-900">
                          {booking.customerName}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-sm border ${getStatusColor(booking.status || 'Pending')}`}>
                          {booking.status || 'Pending'}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        {servicesList.map((service, index) => (
                          <span key={index} className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                            {service}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
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
                      onClick={() => setExpandedBooking(isExpanded ? null : booking.id)}
                      className="text-blue-600 hover:text-blue-700 text-sm"
                    >
                      {isExpanded ? 'Hide Details' : 'View Details'}
                    </button>
                  </div>

                  {/* Status Update Buttons */}
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => onUpdateStatus(booking.id, 'Approved')}
                      disabled={booking.status === 'Approved'}
                      className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                        booking.status === 'Approved'
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-green-600 text-white hover:bg-green-700'
                      }`}
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => onUpdateStatus(booking.id, 'Rejected')}
                      disabled={booking.status === 'Rejected'}
                      className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                        booking.status === 'Rejected'
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-red-600 text-white hover:bg-red-700'
                      }`}
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => onUpdateStatus(booking.id, 'Completed')}
                      disabled={booking.status === 'Completed' || booking.status === 'Rejected'}
                      className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                        booking.status === 'Completed' || booking.status === 'Rejected'
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      Mark Complete
                    </button>
                    <button
                      onClick={() => onUpdateStatus(booking.id, 'Pending')}
                      disabled={booking.status === 'Pending'}
                      className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                        booking.status === 'Pending'
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-gray-600 text-white hover:bg-gray-700'
                      }`}
                    >
                      Reset to Pending
                    </button>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-6 pb-6 pt-0 border-t border-gray-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                      <div>
                        <h4 className="text-gray-900 mb-3 flex items-center gap-2">
                          <Car className="w-5 h-5 text-blue-500" />
                          Vehicle Information
                        </h4>
                        <div className="space-y-2 text-sm">
                          <p className="text-gray-600">
                            <span className="text-gray-900">Vehicle:</span>{' '}
                            {booking.vehicleYear} {booking.vehicleMake} {booking.vehicleModel}
                          </p>
                          <p className="text-gray-600">
                            <span className="text-gray-900">License Plate:</span>{' '}
                            {booking.licensePlate}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-gray-900 mb-3 flex items-center gap-2">
                          <Mail className="w-5 h-5 text-blue-500" />
                          Contact Information
                        </h4>
                        <div className="space-y-2 text-sm">
                          <p className="text-gray-600 flex items-center gap-2">
                            <Mail className="w-4 h-4 text-gray-400" />
                            {booking.email}
                          </p>
                          <p className="text-gray-600 flex items-center gap-2">
                            <Phone className="w-4 h-4 text-gray-400" />
                            {booking.phone}
                          </p>
                          <p className="text-gray-600 flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            {booking.address}
                          </p>
                        </div>
                      </div>

                      {booking.notes && (
                        <div className="md:col-span-2">
                          <h4 className="text-gray-900 mb-2">Additional Notes</h4>
                          <p className="text-gray-600 text-sm bg-gray-50 p-3 rounded-lg">
                            {booking.notes}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
