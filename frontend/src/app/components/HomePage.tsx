import { ArrowRight, CheckCircle, Clock, Shield, Star } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl mb-6">
                Professional Vehicle Service You Can Trust
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Expert maintenance and repair services for all makes and models. 
                Book your appointment online in minutes.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => onNavigate('services')}
                  className="px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-2"
                >
                  Book Service Now
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onNavigate('about')}
                  className="px-8 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
                >
                  Learn More
                </button>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-4xl mb-2">15+</div>
                    <div className="text-blue-100">Years Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl mb-2">50K+</div>
                    <div className="text-blue-100">Happy Customers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl mb-2">98%</div>
                    <div className="text-blue-100">Satisfaction Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl mb-2">24/7</div>
                    <div className="text-blue-100">Support Available</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-gray-900 mb-4">Why Choose AutoCare?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're committed to providing the highest quality service with convenience and transparency
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-gray-900 mb-2">Certified Technicians</h3>
              <p className="text-gray-600">
                ASE-certified mechanics with years of experience
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-gray-900 mb-2">Fast Service</h3>
              <p className="text-gray-600">
                Quick turnaround times without compromising quality
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-gray-900 mb-2">Quality Guarantee</h3>
              <p className="text-gray-600">
                12-month warranty on all parts and labor
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-gray-900 mb-2">5-Star Rated</h3>
              <p className="text-gray-600">
                Thousands of satisfied customers and counting
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Services Preview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-gray-900 mb-4">Popular Services</h2>
            <p className="text-gray-600">
              From routine maintenance to major repairs, we've got you covered
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-gray-900 mb-2">Oil Change</h3>
              <p className="text-gray-600 mb-4">
                Keep your engine running smoothly with regular oil changes
              </p>
              <div className="text-blue-600">Starting at $49.99</div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-gray-900 mb-2">Brake Service</h3>
              <p className="text-gray-600 mb-4">
                Ensure your safety with professional brake inspection and repair
              </p>
              <div className="text-blue-600">Starting at $149.99</div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-gray-900 mb-2">General Maintenance</h3>
              <p className="text-gray-600 mb-4">
                Comprehensive vehicle check-up and preventive maintenance
              </p>
              <div className="text-blue-600">Starting at $199.99</div>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => onNavigate('services')}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
            >
              View All Services
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="mb-4">Ready to Book Your Service?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Schedule your appointment online in just a few minutes
          </p>
          <button
            onClick={() => onNavigate('services')}
            className="px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
}
