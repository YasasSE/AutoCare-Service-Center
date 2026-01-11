import { Calendar, CheckCircle, Clock, XCircle, TrendingUp } from 'lucide-react';
import { BookingData } from './BookingForm';

interface AdminDashboardProps {
  bookings: BookingData[];
}

export function AdminDashboard({ bookings }: AdminDashboardProps) {
  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'Pending').length,
    approved: bookings.filter(b => b.status === 'Approved').length,
    completed: bookings.filter(b => b.status === 'Completed').length,
    rejected: bookings.filter(b => b.status === 'Rejected').length
  };

  // Get recent bookings (last 5)
  const recentBookings = [...bookings].reverse().slice(0, 5);

  // Get upcoming approved bookings
  const upcomingBookings = bookings
    .filter(b => b.status === 'Approved' && new Date(b.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Dashboard Overview</h1>
        <p className="text-gray-600">Monitor and manage your service center operations</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="text-3xl text-gray-900 mb-1">{stats.total}</div>
          <div className="text-sm text-gray-600">Total Bookings</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <div className="text-3xl text-gray-900 mb-1">{stats.pending}</div>
          <div className="text-sm text-gray-600">Pending</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="text-3xl text-gray-900 mb-1">{stats.approved}</div>
          <div className="text-sm text-gray-600">Approved</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="text-3xl text-gray-900 mb-1">{stats.completed}</div>
          <div className="text-sm text-gray-600">Completed</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <div className="text-3xl text-gray-900 mb-1">{stats.rejected}</div>
          <div className="text-sm text-gray-600">Rejected</div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Bookings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-gray-900 mb-4">Recent Bookings</h2>
          {recentBookings.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No bookings yet</p>
          ) : (
            <div className="space-y-3">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-gray-900">{booking.customerName}</div>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                      booking.status === 'Approved' ? 'bg-green-100 text-green-700' :
                      booking.status === 'Completed' ? 'bg-blue-100 text-blue-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {booking.serviceNames?.join(', ') || booking.serviceName}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {new Date(booking.date).toLocaleDateString()} at {booking.time}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-gray-900 mb-4">Upcoming Appointments</h2>
          {upcomingBookings.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No upcoming appointments</p>
          ) : (
            <div className="space-y-3">
              {upcomingBookings.map((booking) => (
                <div key={booking.id} className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-gray-900">{booking.customerName}</div>
                    <span className="text-xs text-green-700 bg-green-100 px-2 py-1 rounded-full">
                      Approved
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {booking.serviceNames?.join(', ') || booking.serviceName}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {new Date(booking.date).toLocaleDateString()} at {booking.time}
                  </div>
                  <div className="text-sm text-gray-700 mt-2">
                    {booking.vehicleYear} {booking.vehicleMake} {booking.vehicleModel}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
