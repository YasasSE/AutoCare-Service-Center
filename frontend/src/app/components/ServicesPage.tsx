import { ServiceCard } from './ServiceCard';
import { Wrench } from 'lucide-react';

interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  duration: string;
  iconName?: string;
  longDescription: string;
  included: string[];
  benefits: string[];
}

interface ServicesPageProps {
  services: Service[];
  selectedService: string | null;
  onServiceSelect: (serviceId: string) => void;
  onContinue: () => void;
  onViewDetails: (serviceId: string) => void;
  onMultipleServiceToggle: (serviceId: string) => void;
  selectedServices?: string[];
}

// Icon mapping function
const getIcon = (iconName?: string) => {
  const Droplets = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>;
  const DiscAlbum = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>;
  
  return <Wrench className="w-6 h-6" />;
};

export function ServicesPage({ 
  services, 
  selectedService, 
  onServiceSelect, 
  onContinue,
  onViewDetails,
  onMultipleServiceToggle,
  selectedServices = []
}: ServicesPageProps) {
  // Calculate total price and duration
  const calculateTotal = () => {
    const selectedServicesData = services.filter(s => selectedServices.includes(s.id));
    const totalPrice = selectedServicesData.reduce((sum, service) => {
      return sum + parseFloat(service.price.replace('$', ''));
    }, 0);
    
    const totalMinutes = selectedServicesData.reduce((sum, service) => {
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

  const totals = calculateTotal();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-gray-900 mb-4">Our Services</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Professional automotive care for all your vehicle maintenance and repair needs
        </p>
        <p className="text-blue-600 mt-2">
          Select one or multiple services to book your appointment
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {services.map((service) => (
          <div key={service.id} className="relative">
            <ServiceCard
              name={service.name}
              description={service.description}
              price={service.price}
              duration={service.duration}
              icon={getIcon(service.iconName)}
              selected={selectedServices.includes(service.id)}
              onClick={() => onMultipleServiceToggle(service.id)}
            />
            <button
              onClick={() => onViewDetails(service.id)}
              className="absolute bottom-4 right-4 text-sm text-blue-600 hover:text-blue-700 underline"
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {selectedServices.length > 0 && (
        <div className="sticky bottom-0 bg-white border-t border-gray-200 shadow-lg rounded-t-xl p-6 mb-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-gray-900 mb-1">
                  {selectedServices.length} Service{selectedServices.length > 1 ? 's' : ''} Selected
                </h3>
                <div className="flex flex-wrap gap-2">
                  {services
                    .filter(s => selectedServices.includes(s.id))
                    .map(service => (
                      <span key={service.id} className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                        {service.name}
                      </span>
                    ))}
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-sm text-gray-500">Total Price</div>
                  <div className="text-2xl text-gray-900">${totals.price}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-500">Est. Time</div>
                  <div className="text-xl text-gray-900">{totals.duration}</div>
                </div>
                <button
                  onClick={onContinue}
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg whitespace-nowrap"
                >
                  Continue to Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Why Choose Us */}
      <div className="mt-16 bg-gray-50 rounded-xl p-8">
        <h2 className="text-gray-900 text-center mb-8">Why Choose AutoCare?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-blue-600 text-3xl mb-2">✓</div>
            <h3 className="text-gray-900 mb-2">Certified Technicians</h3>
            <p className="text-gray-600">
              ASE-certified professionals with extensive training
            </p>
          </div>
          <div className="text-center">
            <div className="text-blue-600 text-3xl mb-2">⚡</div>
            <h3 className="text-gray-900 mb-2">Quick Service</h3>
            <p className="text-gray-600">
              Fast turnaround without compromising quality
            </p>
          </div>
          <div className="text-center">
            <div className="text-blue-600 text-3xl mb-2">🛡️</div>
            <h3 className="text-gray-900 mb-2">12-Month Warranty</h3>
            <p className="text-gray-600">
              All work backed by our comprehensive warranty
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}