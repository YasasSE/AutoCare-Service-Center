import { Check } from 'lucide-react';

interface ServiceCardProps {
  name: string;
  description: string;
  price: string;
  duration: string;
  icon: React.ReactNode;
  selected: boolean;
  onClick: () => void;
}

export function ServiceCard({ 
  name, 
  description, 
  price, 
  duration, 
  icon, 
  selected, 
  onClick 
}: ServiceCardProps) {
  return (
    <button
      onClick={onClick}
      className={`relative p-6 rounded-lg border-2 transition-all text-left w-full ${
        selected 
          ? 'border-blue-500 bg-blue-50' 
          : 'border-gray-200 bg-white hover:border-gray-300'
      }`}
    >
      {selected && (
        <div className="absolute top-4 right-4 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
          <Check className="w-4 h-4 text-white" />
        </div>
      )}
      
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-lg ${selected ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'}`}>
          {icon}
        </div>
        <div className="flex-1">
          <h3 className={selected ? 'text-blue-900' : 'text-gray-900'}>{name}</h3>
          <p className="text-gray-600 text-sm mt-1">{description}</p>
          <div className="flex gap-4 mt-3 text-sm">
            <span className={selected ? 'text-blue-700' : 'text-gray-700'}>
              {price}
            </span>
            <span className="text-gray-500">•</span>
            <span className="text-gray-500">{duration}</span>
          </div>
        </div>
      </div>
    </button>
  );
}
