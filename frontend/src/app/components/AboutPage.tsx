import { Award, Users, Wrench, Heart } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-gray-900 mb-4">About AutoCare Service Center</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Serving our community with excellence in automotive care since 2009
        </p>
      </div>

      {/* Story Section */}
      <section className="mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-gray-900 mb-4">Our Story</h2>
            <p className="text-gray-600 mb-4">
              AutoCare Service Center was founded with a simple mission: to provide honest, 
              reliable automotive service that puts customers first. What started as a small 
              family-owned shop has grown into one of the region's most trusted service centers.
            </p>
            <p className="text-gray-600 mb-4">
              Our team of ASE-certified technicians brings decades of combined experience, 
              handling everything from routine maintenance to complex repairs. We invest in 
              the latest diagnostic equipment and ongoing training to ensure we can service 
              all makes and models with expertise.
            </p>
            <p className="text-gray-600">
              We believe in transparency, quality workmanship, and treating every customer 
              like family. That's the AutoCare difference.
            </p>
          </div>
          <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
            <div className="text-gray-400">
              <Wrench className="w-24 h-24 mx-auto mb-4" />
              <p className="text-center">Service Center Image</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="mb-16">
        <h2 className="text-gray-900 text-center mb-12">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-gray-900 mb-2">Excellence</h3>
            <p className="text-gray-600">
              We strive for excellence in every service we provide
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-gray-900 mb-2">Integrity</h3>
            <p className="text-gray-600">
              Honest communication and transparent pricing
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Wrench className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-gray-900 mb-2">Expertise</h3>
            <p className="text-gray-600">
              Certified technicians with continuous training
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-gray-900 mb-2">Care</h3>
            <p className="text-gray-600">
              We treat every vehicle like it's our own
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="mb-16">
        <h2 className="text-gray-900 text-center mb-12">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gray-200 h-64 flex items-center justify-center">
              <Users className="w-16 h-16 text-gray-400" />
            </div>
            <div className="p-6">
              <h3 className="text-gray-900 mb-1">Michael Chen</h3>
              <p className="text-blue-600 mb-3">Master Technician</p>
              <p className="text-gray-600">
                ASE Master Certified with 20+ years of experience in automotive repair
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gray-200 h-64 flex items-center justify-center">
              <Users className="w-16 h-16 text-gray-400" />
            </div>
            <div className="p-6">
              <h3 className="text-gray-900 mb-1">Sarah Johnson</h3>
              <p className="text-blue-600 mb-3">Service Manager</p>
              <p className="text-gray-600">
                Dedicated to ensuring every customer has an excellent service experience
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gray-200 h-64 flex items-center justify-center">
              <Users className="w-16 h-16 text-gray-400" />
            </div>
            <div className="p-6">
              <h3 className="text-gray-900 mb-1">David Martinez</h3>
              <p className="text-blue-600 mb-3">Lead Technician</p>
              <p className="text-gray-600">
                Specializes in diagnostics and electrical systems with 15 years experience
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-blue-600 text-white rounded-xl p-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl mb-2">15+</div>
            <div className="text-blue-100">Years in Business</div>
          </div>
          <div>
            <div className="text-4xl mb-2">50,000+</div>
            <div className="text-blue-100">Vehicles Serviced</div>
          </div>
          <div>
            <div className="text-4xl mb-2">98%</div>
            <div className="text-blue-100">Customer Satisfaction</div>
          </div>
          <div>
            <div className="text-4xl mb-2">12</div>
            <div className="text-blue-100">Expert Technicians</div>
          </div>
        </div>
      </section>
    </div>
  );
}
