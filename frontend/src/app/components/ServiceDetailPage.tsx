import { CheckCircle, Clock, DollarSign, Wrench } from 'lucide-react';

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

interface ServiceDetailPageProps {
  service: Service;
  onBook: (serviceId: string) => void;
  onBack: () => void;
}

export function ServiceDetailPage({ service, onBook, onBack }: ServiceDetailPageProps) {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <button
        onClick={onBack}
        className="text-blue-600 hover:text-blue-700 mb-6 flex items-center gap-2"
      >
        ← Back to Services
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Header */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                <Wrench className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-gray-900">{service.name}</h1>
                <p className="text-gray-600">{service.description}</p>
              </div>
            </div>
          </div>

          {/* Long Description */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-gray-900 mb-4">About This Service</h2>
            <p className="text-gray-600">{service.longDescription}</p>
          </div>

          {/* What's Included */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-gray-900 mb-4">What's Included</h2>
            <ul className="space-y-3">
              {service.included.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Benefits */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-gray-900 mb-4">Benefits</h2>
            <ul className="space-y-3">
              {service.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-24">
            <div className="space-y-6">
              {/* Pricing */}
              <div>
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <DollarSign className="w-5 h-5" />
                  <span className="text-sm">Starting Price</span>
                </div>
                <div className="text-3xl text-gray-900">{service.price}</div>
              </div>

              {/* Duration */}
              <div>
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <Clock className="w-5 h-5" />
                  <span className="text-sm">Estimated Time</span>
                </div>
                <div className="text-xl text-gray-900">{service.duration}</div>
              </div>

              {/* Book Button */}
              <button
                onClick={() => onBook(service.id)}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Book This Service
              </button>

              {/* Additional Info */}
              <div className="pt-6 border-t border-gray-200">
                <div className="flex items-start gap-3 mb-4">
                  <Wrench className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">
                      All services performed by ASE-certified technicians
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">
                      12-month/12,000-mile warranty on parts and labor
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}