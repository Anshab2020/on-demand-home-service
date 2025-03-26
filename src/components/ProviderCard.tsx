import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Star, MapPin, Clock, ArrowRight, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProviderCardProps {
  id: string;
  name: string;
  rating: number;
  ratingCount: number;
  location: string;
  services: string[];
  price: string;
  availability: string;
  className?: string;
}

const ProviderCard: React.FC<ProviderCardProps> = ({
  id,
  name,
  rating,
  ratingCount,
  location,
  services,
  price,
  availability,
  className,
}) => {
  // Get initials from name
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  return (
    <div 
      className={cn(
        'group bg-[#0A1628] border border-[#1E2A3B] rounded-2xl shadow-lg overflow-hidden',
        'hover:shadow-xl transition-all duration-300 hover:border-primary/20',
        className
      )}
    >
      <div className="flex gap-6 p-6">
        {/* Provider Avatar */}
        <div className="flex-shrink-0">
          <div className="w-20 h-20 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-2xl font-semibold">
            {initials}
          </div>
          <div className="mt-2 flex items-center justify-center bg-white/5 rounded-full px-2 py-1">
            <Star className="w-4 h-4 text-yellow-500 mr-1 fill-yellow-500" />
            <span className="text-white text-sm">{rating}</span>
            <span className="text-gray-400 text-sm ml-1">({ratingCount})</span>
          </div>
        </div>
        
        {/* Provider Info */}
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-primary transition-colors">
            {name}
          </h3>
          
          <div className="flex items-center text-sm text-gray-400 mb-3">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{location}</span>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {services.map((service, index) => (
              <span 
                key={index}
                className="inline-block bg-[#1E2A3B] text-gray-300 text-xs px-2.5 py-1 rounded-full"
              >
                {service}
              </span>
            ))}
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center text-sm text-gray-400">
              <Clock className="w-4 h-4 mr-1" />
              <span>{availability}</span>
            </div>
            <div className="font-semibold text-lg text-primary">
              {price}
            </div>
          </div>
          
          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              className="flex-1 rounded-full border-[#1E2A3B] text-gray-300 hover:text-white hover:bg-[#1E2A3B]"
            >
              Contact
            </Button>
            <Button 
              asChild
              className="flex-1 rounded-full"
            >
              <Link to={`/service-provider/${id}`}>
                Book Now
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderCard;
