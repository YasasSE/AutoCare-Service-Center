import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    category: 'General',
    questions: [
      {
        question: 'What types of vehicles do you service?',
        answer: 'We service all makes and models of cars, trucks, and SUVs, including domestic, European, and Asian vehicles. Our technicians are trained and equipped to handle everything from routine maintenance to complex repairs.'
      },
      {
        question: 'Do I need an appointment?',
        answer: 'While we do accept walk-ins for minor services, we highly recommend booking an appointment to ensure we can accommodate you at your preferred time and have the necessary parts and technicians available.'
      },
      {
        question: 'How long does a typical service take?',
        answer: 'Service times vary depending on the type of work needed. Oil changes typically take 30 minutes, tire rotations 20 minutes, and more complex services like brake work can take 1-2 hours. We provide estimated completion times when you book.'
      }
    ]
  },
  {
    category: 'Booking & Scheduling',
    questions: [
      {
        question: 'How do I book an appointment?',
        answer: 'You can easily book an appointment online through our website by selecting the service you need and choosing your preferred date and time. You can also call us directly at (555) 123-4567.'
      },
      {
        question: 'Can I cancel or reschedule my appointment?',
        answer: 'Yes, you can cancel or reschedule your appointment up to 24 hours before your scheduled time. Please contact us as soon as possible if you need to make changes.'
      },
      {
        question: 'What if I need to arrive late?',
        answer: 'Please call us if you\'re running late. We\'ll do our best to accommodate you, but significant delays may require rescheduling to ensure we can provide quality service.'
      }
    ]
  },
  {
    category: 'Pricing & Payment',
    questions: [
      {
        question: 'How much will my service cost?',
        answer: 'Pricing varies by service type. You can see our standard service prices on our Services page. For more complex repairs, we provide a detailed estimate before beginning any work.'
      },
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept cash, all major credit cards (Visa, MasterCard, American Express, Discover), and debit cards. We also offer financing options for larger services.'
      },
      {
        question: 'Do you offer any warranties?',
        answer: 'Yes! We stand behind our work with a 12-month/12,000-mile warranty on parts and labor for most services. Specific warranty terms are provided with your service receipt.'
      }
    ]
  },
  {
    category: 'Services',
    questions: [
      {
        question: 'Do you use OEM or aftermarket parts?',
        answer: 'We use high-quality OEM (Original Equipment Manufacturer) parts whenever possible. We can also source aftermarket parts if you prefer a more budget-friendly option. We\'ll discuss options with you.'
      },
      {
        question: 'Can you perform repairs while I wait?',
        answer: 'For most routine services like oil changes and tire rotations, you\'re welcome to wait in our comfortable waiting area with complimentary WiFi and refreshments. For longer services, we can arrange transportation or a loaner vehicle.'
      },
      {
        question: 'Do you offer emergency or roadside services?',
        answer: 'Yes, we offer 24/7 emergency roadside assistance for battery jumps, lockouts, and towing services. Call our emergency line for immediate assistance.'
      }
    ]
  }
];

export function FAQPage() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <HelpCircle className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-gray-900 mb-4">Frequently Asked Questions</h1>
        <p className="text-xl text-gray-600">
          Find answers to common questions about our services
        </p>
      </div>

      {/* FAQ Sections */}
      <div className="space-y-8">
        {faqs.map((category, categoryIndex) => (
          <div key={categoryIndex}>
            <h2 className="text-gray-900 mb-4">{category.category}</h2>
            <div className="space-y-3">
              {category.questions.map((faq, faqIndex) => {
                const id = `${categoryIndex}-${faqIndex}`;
                const isOpen = openItems.has(id);
                
                return (
                  <div
                    key={id}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                  >
                    <button
                      onClick={() => toggleItem(id)}
                      className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-gray-900 pr-4">{faq.question}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform ${
                          isOpen ? 'transform rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-4 text-gray-600">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Still have questions */}
      <div className="mt-12 bg-blue-50 rounded-lg p-8 text-center">
        <h3 className="text-gray-900 mb-2">Still Have Questions?</h3>
        <p className="text-gray-600 mb-6">
          Can't find what you're looking for? Our team is here to help!
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Contact Us
          </button>
          <button className="px-6 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
            Call (555) 123-4567
          </button>
        </div>
      </div>
    </div>
  );
}
