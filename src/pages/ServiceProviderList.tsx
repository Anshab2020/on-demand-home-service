import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Star, MapPin, Phone, Mail, Calendar } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';

interface Provider {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  experience: string;
  serviceType: string;
  serviceTitle: string;
  serviceDescription: string;
  servicePrice: string;
  status: string;
}

const ServiceProviderList = () => {
  const { id } = useParams<{ id: string }>();
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load providers from localStorage
    const allProviders = JSON.parse(localStorage.getItem('providers') || '[]');
    const acceptedProviders = allProviders.filter(
      (provider: Provider) => 
        provider.status === 'accepted' && 
        provider.serviceType.toLowerCase() === id?.toLowerCase()
    );
    setProviders(acceptedProviders);
    setLoading(false);
  }, [id]);

  const handleCallProvider = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const handleSendMessage = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#020817]">
      <Navbar />
      
      <main className="flex-1 pt-28 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {providers.map((provider) => (
              <AnimatedSection
                key={provider.id}
                animation="fade-in"
                className="bg-[#0A1628] rounded-2xl p-6 border border-[#1E2A3B]"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-1">
                      {provider.firstName} {provider.lastName}
                    </h3>
                    <p className="text-[#3B82F6] text-sm">
                      {provider.experience} Experience
                    </p>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    <span className="ml-1 text-white">4.8</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-medium text-white mb-2">
                    {provider.serviceTitle}
                  </h4>
                  <p className="text-gray-400 text-sm mb-4">
                    {provider.serviceDescription}
                  </p>
                  <p className="text-[#3B82F6] font-medium">
                    Starting from
                  </p>
                </div>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-gray-400">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{provider.location}</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Phone className="w-4 h-4 mr-2" />
                    <span>{provider.phone}</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Mail className="w-4 h-4 mr-2" />
                    <span>{provider.email}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button 
                    className="w-full bg-[#3B82F6] hover:bg-[#3B82F6]/90 text-white flex items-center justify-center"
                    asChild
                  >
                    <Link to={`/service-provider/${provider.email}`}>
                      <Calendar className="w-4 h-4 mr-2" />
                      Book an Appointment
                    </Link>
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className="w-full bg-[#020817] border-[#1E2A3B] text-gray-400 hover:bg-[#1E2A3B] hover:text-white flex items-center justify-center"
                    onClick={() => handleCallProvider(provider.phone)}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call Provider
                  </Button>

                  <Button 
                    variant="outline"
                    className="w-full bg-[#020817] border-[#1E2A3B] text-gray-400 hover:bg-[#1E2A3B] hover:text-white flex items-center justify-center"
                    onClick={() => handleSendMessage(provider.email)}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </div>
              </AnimatedSection>
            ))}

            {providers.length === 0 && (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-400">
                  No service providers available in this category yet.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ServiceProviderList; 