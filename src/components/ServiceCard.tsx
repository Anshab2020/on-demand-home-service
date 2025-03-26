import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  ArrowRight, 
  Users, 
  Wrench, 
  Zap, 
  Sparkles, 
  Paintbrush, 
  Leaf, 
  Hammer 
} from 'lucide-react';

interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  color: string;
  className?: string;
  providerCount?: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  id,
  title,
  description,
  color,
  className,
  providerCount = 0,
}) => {
  // Map service types to icons
  const getServiceIcon = (serviceId: string) => {
    switch (serviceId) {
      case 'plumbing':
        return <Wrench className="w-8 h-8" />;
      case 'electrical':
        return <Zap className="w-8 h-8" />;
      case 'cleaning':
        return <Sparkles className="w-8 h-8" />;
      case 'painting':
        return <Paintbrush className="w-8 h-8" />;
      case 'gardening':
        return <Leaf className="w-8 h-8" />;
      case 'carpentry':
        return <Hammer className="w-8 h-8" />;
      default:
        return <Wrench className="w-8 h-8" />;
    }
  };

  return (
    <Link 
      to={`/services/${id}`}
      className={cn(
        'group block p-6 rounded-2xl transition-all duration-300',
        'bg-[#0A1628] hover:bg-[#0F1E32] border border-[#1E2A3B] hover:border-primary/20',
        'shadow-lg hover:shadow-xl shadow-primary/5',
        className
      )}
    >
      <div 
        className={cn(
          'w-16 h-16 rounded-2xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110',
          'bg-primary/10 text-primary'
        )}
      >
        {getServiceIcon(id)}
      </div>

      <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-primary transition-colors">
        {title}
      </h3>
      
      <p className="text-gray-400 mb-4 line-clamp-2">
        {description}
      </p>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center text-gray-400">
          <Users className="w-4 h-4 mr-1" />
          <span>{providerCount} {providerCount === 1 ? 'Provider' : 'Providers'}</span>
        </div>
      </div>
      
      <div className="flex items-center text-primary font-medium">
        View Providers
        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
};

export default ServiceCard;
