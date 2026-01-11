import { useState, useEffect } from 'react';
import { Wrench, Gauge, DiscAlbum, Zap, Droplets, Wind, Calendar, Menu, X, LayoutDashboard, ClipboardList, Settings, LogOut } from 'lucide-react';
import { HomePage } from './components/HomePage';
import { ServicesPage } from './components/ServicesPage';
import { ServiceDetailPage } from './components/ServiceDetailPage';
import { BookingForm, BookingData } from './components/BookingForm';
import { BookingConfirmation } from './components/BookingConfirmation';
import { BookingList } from './components/BookingList';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { FAQPage } from './components/FAQPage';
import { AdminLogin } from './components/AdminLogin';
import { AdminDashboard } from './components/AdminDashboard';
import { AdminBookings } from './components/AdminBookings';
import { AdminServices, Service } from './components/AdminServices';

type Page = 'home' | 'services' | 'serviceDetail' | 'booking' | 'confirmation' | 'myBookings' | 'about' | 'contact' | 'faq' | 'admin-login' | 'admin-dashboard' | 'admin-bookings' | 'admin-services';

// Icon mapping function
const getIcon = (iconName: string) => {
  const icons: { [key: string]: JSX.Element } = {
    'Droplets': <Droplets className="w-6 h-6" />,
    'DiscAlbum': <DiscAlbum className="w-6 h-6" />,
    'Gauge': <Gauge className="w-6 h-6" />,
    'Zap': <Zap className="w-6 h-6" />,
    'Wind': <Wind className="w-6 h-6" />,
    'Wrench': <Wrench className="w-6 h-6" />,
  };
  return icons[iconName] || <Wrench className="w-6 h-6" />;
};

const defaultServices: Service[] = [
  {
    id: 'oil-change',
    name: 'Oil Change',
    description: 'Complete oil and filter change with multi-point inspection',
    price: '$49.99',
    duration: '30 mins',
    iconName: 'Droplets',
    longDescription: 'Regular oil changes are essential for maintaining your engine\'s health and performance. Our comprehensive oil change service includes premium oil, a new filter, and a thorough multi-point inspection to catch potential issues early.',
    included: [
      'Up to 5 quarts of premium synthetic or conventional oil',
      'New oil filter installation',
      'Fluid level check and top-off',
      'Tire pressure check',
      'Brake inspection',
      'Battery test',
      'Multi-point safety inspection'
    ],
    benefits: [
      'Extended engine life and improved performance',
      'Better fuel economy',
      'Reduced engine wear and tear',
      'Early detection of potential problems',
      'Peace of mind with professional service'
    ]
  },
  {
    id: 'tire-rotation',
    name: 'Tire Rotation',
    description: 'Professional tire rotation and pressure check',
    price: '$29.99',
    duration: '20 mins',
    iconName: 'DiscAlbum',
    longDescription: 'Tire rotation is a crucial maintenance service that ensures even tire wear and extends the life of your tires. Our technicians follow manufacturer specifications to rotate your tires properly.',
    included: [
      'Professional tire rotation',
      'Tire pressure adjustment to manufacturer specs',
      'Visual tire inspection for wear and damage',
      'Wheel torque verification',
      'Tread depth measurement'
    ],
    benefits: [
      'Extended tire life (up to 20% longer)',
      'Improved handling and safety',
      'Better fuel efficiency',
      'Even tire wear for optimal performance',
      'Cost savings by preventing premature tire replacement'
    ]
  },
  {
    id: 'brake-service',
    name: 'Brake Service',
    description: 'Complete brake inspection and pad replacement',
    price: '$149.99',
    duration: '90 mins',
    iconName: 'Gauge',
    longDescription: 'Your brakes are your vehicle\'s most important safety feature. Our comprehensive brake service includes inspection, cleaning, and replacement of worn components to ensure optimal stopping power.',
    included: [
      'Complete brake system inspection',
      'Brake pad replacement (front or rear)',
      'Rotor resurfacing or replacement if needed',
      'Brake fluid check and top-off',
      'Caliper inspection and lubrication',
      'Hardware replacement',
      'Road test to verify proper operation'
    ],
    benefits: [
      'Restored stopping power and safety',
      'Reduced brake noise and vibration',
      'Prevention of costly rotor damage',
      'Improved brake pedal feel',
      'Peace of mind for you and your passengers'
    ]
  },
  {
    id: 'battery-test',
    name: 'Battery Test & Replace',
    description: 'Battery health check and replacement if needed',
    price: '$89.99',
    duration: '45 mins',
    iconName: 'Zap',
    longDescription: 'Don\'t get stranded with a dead battery. Our battery service includes comprehensive testing, cleaning, and replacement with a high-quality battery if needed.',
    included: [
      'Complete battery and charging system test',
      'Battery terminal cleaning and protection',
      'Alternator output test',
      'Starter draw test',
      'New battery installation (if needed)',
      'Battery disposal and recycling',
      'Free battery testing anytime'
    ],
    benefits: [
      'Reliable starting in all weather conditions',
      'Prevention of unexpected breakdowns',
      'Extended battery and electrical system life',
      'Optimal charging system performance',
      'Environmental responsibility through proper recycling'
    ]
  },
  {
    id: 'ac-service',
    name: 'AC Service',
    description: 'Air conditioning inspection and recharge',
    price: '$79.99',
    duration: '60 mins',
    iconName: 'Wind',
    longDescription: 'Stay comfortable year-round with our professional AC service. We\'ll diagnose issues, recharge your system, and ensure your air conditioning is working at peak efficiency.',
    included: [
      'Complete AC system inspection',
      'Refrigerant level check',
      'Leak detection test',
      'AC performance test',
      'System recharge if needed',
      'Cabin air filter inspection',
      'Belt and hose inspection'
    ],
    benefits: [
      'Improved cooling performance',
      'Better fuel efficiency',
      'Extended AC system life',
      'Improved air quality inside your vehicle',
      'Comfortable driving in any weather'
    ]
  },
  {
    id: 'general-maintenance',
    name: 'General Maintenance',
    description: 'Comprehensive vehicle inspection and tune-up',
    price: '$199.99',
    duration: '2 hours',
    iconName: 'Wrench',
    longDescription: 'Our comprehensive general maintenance service is designed to keep your vehicle running smoothly and catch potential problems before they become expensive repairs.',
    included: [
      'Complete vehicle inspection',
      'Engine air filter replacement',
      'Cabin air filter replacement',
      'Spark plug inspection/replacement',
      'Fluid level check and top-off (all fluids)',
      'Belt and hose inspection',
      'Lights and wipers check',
      'Suspension and steering inspection',
      'Exhaust system inspection',
      'Detailed service report'
    ],
    benefits: [
      'Maximum vehicle reliability',
      'Improved performance and fuel economy',
      'Early problem detection saves money',
      'Extended vehicle life',
      'Complete peace of mind',
      'Maintains manufacturer warranty requirements'
    ]
  }
];

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [lastBooking, setLastBooking] = useState<BookingData | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [services, setServices] = useState<Service[]>(defaultServices);

  // Load data from localStorage
  useEffect(() => {
    const savedBookings = localStorage.getItem('vehicleBookings');
    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    }

    const savedServices = localStorage.getItem('vehicleServices');
    if (savedServices) {
      setServices(JSON.parse(savedServices));
    }

    const savedAdminStatus = localStorage.getItem('isAdmin');
    if (savedAdminStatus === 'true') {
      setIsAdmin(true);
    }
  }, []);

  // Save bookings to localStorage
  useEffect(() => {
    localStorage.setItem('vehicleBookings', JSON.stringify(bookings));
  }, [bookings]);

  // Save services to localStorage
  useEffect(() => {
    localStorage.setItem('vehicleServices', JSON.stringify(services));
  }, [services]);

  const handleAdminLogin = (username: string, password: string) => {
    setIsAdmin(true);
    localStorage.setItem('isAdmin', 'true');
    setCurrentPage('admin-dashboard');
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    localStorage.setItem('isAdmin', 'false');
    setCurrentPage('home');
  };

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
  };

  const handleMultipleServiceToggle = (serviceId: string) => {
    setSelectedServices(prev => {
      if (prev.includes(serviceId)) {
        return prev.filter(id => id !== serviceId);
      } else {
        return [...prev, serviceId];
      }
    });
  };

  const handleViewServiceDetail = (serviceId: string) => {
    setSelectedService(serviceId);
    setCurrentPage('serviceDetail');
  };

  const handleBookFromDetail = (serviceId: string) => {
    setSelectedService(serviceId);
    setSelectedServices([serviceId]);
    setCurrentPage('booking');
  };

  const handleContinue = () => {
    if (selectedServices.length > 0) {
      setCurrentPage('booking');
    }
  };

  const handleBookingSubmit = (booking: BookingData) => {
    const newBooking = { ...booking, status: 'Pending' as const };
    setBookings(prev => [...prev, newBooking]);
    setLastBooking(newBooking);
    setSelectedServices([]);
    setCurrentPage('confirmation');
  };

  const handleDeleteBooking = (id: string) => {
    setBookings(prev => prev.filter(b => b.id !== id));
  };

  const handleUpdateBookingStatus = (id: string, status: BookingData['status']) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
  };

  const handleAddService = (service: Omit<Service, 'id'>) => {
    const newService = {
      ...service,
      id: `service-${Date.now()}`,
      iconName: 'Wrench'
    };
    setServices(prev => [...prev, newService]);
  };

  const handleUpdateService = (id: string, updates: Partial<Service>) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const handleDeleteService = (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id));
  };

  const navigateToPage = (page: Page) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    if (page !== 'booking' && page !== 'serviceDetail') {
      setSelectedService(null);
    }
    if (page === 'services') {
      setSelectedServices([]);
    }
  };

  const selectedServiceData = services.find(s => s.id === selectedService);

  // Admin Login Screen
  if (!isAdmin && (currentPage.startsWith('admin') || currentPage === 'admin-dashboard')) {
    return <AdminLogin onLogin={handleAdminLogin} />;
  }

  const isAdminPage = currentPage.startsWith('admin');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className={`${isAdminPage ? 'bg-gray-800' : 'bg-white'} border-b ${isAdminPage ? 'border-gray-700' : 'border-gray-200'} sticky top-0 z-50`}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigateToPage(isAdminPage ? 'admin-dashboard' : 'home')}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <div className={`w-10 h-10 ${isAdminPage ? 'bg-blue-500' : 'bg-blue-600'} rounded-lg flex items-center justify-center`}>
                <Wrench className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={isAdminPage ? 'text-white' : 'text-gray-900'}>
                  {isAdminPage ? 'Admin Panel' : 'AutoCare Service Center'}
                </h1>
                <p className={`text-sm ${isAdminPage ? 'text-gray-400' : 'text-gray-600'} hidden sm:block`}>
                  {isAdminPage ? 'Service Management System' : 'Professional Vehicle Maintenance'}
                </p>
              </div>
            </button>
            
            {/* Desktop Navigation */}
            {isAdminPage ? (
              <nav className="hidden lg:flex items-center gap-1">
                <button
                  onClick={() => navigateToPage('admin-dashboard')}
                  className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                    currentPage === 'admin-dashboard' 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </button>
                <button
                  onClick={() => navigateToPage('admin-bookings')}
                  className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                    currentPage === 'admin-bookings' 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <ClipboardList className="w-4 h-4" />
                  Bookings
                  {bookings.filter(b => b.status === 'Pending').length > 0 && (
                    <span className="px-2 py-0.5 bg-yellow-500 text-white rounded-full text-xs">
                      {bookings.filter(b => b.status === 'Pending').length}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => navigateToPage('admin-services')}
                  className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                    currentPage === 'admin-services' 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <Settings className="w-4 h-4" />
                  Services
                </button>
                <div className="mx-2 h-6 w-px bg-gray-700"></div>
                <button
                  onClick={() => navigateToPage('home')}
                  className="px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors"
                >
                  View Site
                </button>
                <button
                  onClick={handleAdminLogout}
                  className="px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </nav>
            ) : (
              <nav className="hidden lg:flex items-center gap-1">
                <button
                  onClick={() => navigateToPage('home')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    currentPage === 'home' 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Home
                </button>
                <button
                  onClick={() => navigateToPage('services')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    currentPage === 'services' || currentPage === 'serviceDetail'
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Services
                </button>
                <button
                  onClick={() => navigateToPage('about')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    currentPage === 'about' 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  About
                </button>
                <button
                  onClick={() => navigateToPage('contact')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    currentPage === 'contact' 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Contact
                </button>
                <button
                  onClick={() => navigateToPage('faq')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    currentPage === 'faq' 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  FAQ
                </button>
                <button
                  onClick={() => navigateToPage('myBookings')}
                  className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                    currentPage === 'myBookings' 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  My Bookings
                  {bookings.length > 0 && (
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      currentPage === 'myBookings' ? 'bg-white text-blue-600' : 'bg-blue-600 text-white'
                    }`}>
                      {bookings.length}
                    </span>
                  )}
                </button>
                {isAdmin && (
                  <>
                    <div className="mx-2 h-6 w-px bg-gray-300"></div>
                    <button
                      onClick={() => navigateToPage('admin-dashboard')}
                      className="px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors"
                    >
                      Admin
                    </button>
                  </>
                )}
              </nav>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 ${isAdminPage ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'} rounded-lg`}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className={`lg:hidden mt-4 pb-4 border-t ${isAdminPage ? 'border-gray-700' : 'border-gray-200'} pt-4 space-y-2`}>
              {isAdminPage ? (
                <>
                  <button
                    onClick={() => navigateToPage('admin-dashboard')}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      currentPage === 'admin-dashboard' 
                        ? 'bg-blue-600 text-white' 
                        : 'text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => navigateToPage('admin-bookings')}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      currentPage === 'admin-bookings' 
                        ? 'bg-blue-600 text-white' 
                        : 'text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    Bookings
                  </button>
                  <button
                    onClick={() => navigateToPage('admin-services')}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      currentPage === 'admin-services' 
                        ? 'bg-blue-600 text-white' 
                        : 'text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    Services
                  </button>
                  <button
                    onClick={() => navigateToPage('home')}
                    className="w-full text-left px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors"
                  >
                    View Site
                  </button>
                  <button
                    onClick={handleAdminLogout}
                    className="w-full text-left px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => navigateToPage('home')}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      currentPage === 'home' 
                        ? 'bg-blue-600 text-white' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Home
                  </button>
                  <button
                    onClick={() => navigateToPage('services')}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      currentPage === 'services' || currentPage === 'serviceDetail'
                        ? 'bg-blue-600 text-white' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Services
                  </button>
                  <button
                    onClick={() => navigateToPage('about')}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      currentPage === 'about' 
                        ? 'bg-blue-600 text-white' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    About
                  </button>
                  <button
                    onClick={() => navigateToPage('contact')}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      currentPage === 'contact' 
                        ? 'bg-blue-600 text-white' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Contact
                  </button>
                  <button
                    onClick={() => navigateToPage('faq')}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      currentPage === 'faq' 
                        ? 'bg-blue-600 text-white' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    FAQ
                  </button>
                  <button
                    onClick={() => navigateToPage('myBookings')}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      currentPage === 'myBookings' 
                        ? 'bg-blue-600 text-white' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    My Bookings
                  </button>
                  {isAdmin && (
                    <button
                      onClick={() => navigateToPage('admin-dashboard')}
                      className="w-full text-left px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors"
                    >
                      Admin Panel
                    </button>
                  )}
                </>
              )}
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className={isAdminPage ? 'bg-gray-900 min-h-screen' : ''}>
        {/* Customer Pages */}
        {currentPage === 'home' && (
          <HomePage onNavigate={navigateToPage} />
        )}

        {currentPage === 'services' && (
          <ServicesPage
            services={services}
            selectedService={selectedService}
            onServiceSelect={handleServiceSelect}
            onContinue={handleContinue}
            onViewDetails={handleViewServiceDetail}
            onMultipleServiceToggle={handleMultipleServiceToggle}
            selectedServices={selectedServices}
          />
        )}

        {currentPage === 'serviceDetail' && selectedServiceData && (
          <ServiceDetailPage
            service={selectedServiceData}
            onBook={handleBookFromDetail}
            onBack={() => navigateToPage('services')}
          />
        )}

        {currentPage === 'booking' && selectedServices.length > 0 && (
          <div className="py-8">
            <BookingForm
              services={services.filter(s => selectedServices.includes(s.id))}
              onSubmit={handleBookingSubmit}
              onBack={() => navigateToPage('services')}
            />
          </div>
        )}

        {currentPage === 'confirmation' && lastBooking && (
          <BookingConfirmation
            booking={lastBooking}
            onViewBookings={() => navigateToPage('myBookings')}
            onBookAnother={() => {
              setSelectedService(null);
              navigateToPage('services');
            }}
          />
        )}

        {currentPage === 'myBookings' && (
          <div className="py-8">
            <BookingList
              bookings={bookings}
              onDelete={handleDeleteBooking}
            />
          </div>
        )}

        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'contact' && <ContactPage />}
        {currentPage === 'faq' && <FAQPage />}

        {/* Admin Pages */}
        {currentPage === 'admin-dashboard' && (
          <AdminDashboard bookings={bookings} />
        )}

        {currentPage === 'admin-bookings' && (
          <AdminBookings
            bookings={bookings}
            onUpdateStatus={handleUpdateBookingStatus}
          />
        )}

        {currentPage === 'admin-services' && (
          <AdminServices
            services={services}
            onAddService={handleAddService}
            onUpdateService={handleUpdateService}
            onDeleteService={handleDeleteService}
          />
        )}
      </main>

      {/* Footer - Only show on customer pages */}
      {!isAdminPage && (
        <footer className="bg-gray-900 text-white mt-16">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Wrench className="w-5 h-5 text-white" />
                  </div>
                  <span>AutoCare</span>
                </div>
                <p className="text-gray-400 text-sm">
                  Professional vehicle maintenance and repair services you can trust.
                </p>
              </div>

              <div>
                <h3 className="mb-4">Quick Links</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <button onClick={() => navigateToPage('services')} className="text-gray-400 hover:text-white transition-colors">
                      Services
                    </button>
                  </li>
                  <li>
                    <button onClick={() => navigateToPage('about')} className="text-gray-400 hover:text-white transition-colors">
                      About Us
                    </button>
                  </li>
                  <li>
                    <button onClick={() => navigateToPage('contact')} className="text-gray-400 hover:text-white transition-colors">
                      Contact
                    </button>
                  </li>
                  <li>
                    <button onClick={() => navigateToPage('faq')} className="text-gray-400 hover:text-white transition-colors">
                      FAQ
                    </button>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="mb-4">Contact Info</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>1234 Service Drive</li>
                  <li>Auto City, CA 90210</li>
                  <li>(555) 123-4567</li>
                  <li>info@autocare.com</li>
                </ul>
              </div>

              <div>
                <h3 className="mb-4">Hours</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>Mon - Fri: 8:00 AM - 6:00 PM</li>
                  <li>Saturday: 9:00 AM - 4:00 PM</li>
                  <li>Sunday: Closed</li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <p>&copy; 2024 AutoCare Service Center. All rights reserved.</p>
                <button
                  onClick={() => navigateToPage('admin-login')}
                  className="text-gray-500 hover:text-gray-300 transition-colors text-xs"
                >
                  Admin Login
                </button>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}