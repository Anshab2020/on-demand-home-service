
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CategoryFilter from '@/components/CategoryFilter';
import ProviderCard from '@/components/ProviderCard';
import AnimatedSection from '@/components/AnimatedSection';

// Sample categories
const categories = [
  { id: 'plumbing', name: 'Plumbing' },
  { id: 'electrical', name: 'Electrical' },
  { id: 'cleaning', name: 'Cleaning' },
  { id: 'painting', name: 'Painting' },
  { id: 'gardening', name: 'Gardening' },
  { id: 'carpentry', name: 'Carpentry' },
];

// Sample service providers
const providers = [
  {
    id: '1',
    name: 'John Smith',
    image: '/placeholder.svg',
    rating: 4.9,
    ratingCount: 124,
    location: 'San Francisco, CA',
    services: ['Plumbing', 'Pipe Fixing', 'Installation'],
    price: '$50-75/hr',
    availability: 'Available Today',
    category: 'plumbing',
  },
  {
    id: '2',
    name: 'Sarah Williams',
    image: '/placeholder.svg',
    rating: 4.8,
    ratingCount: 98,
    location: 'Los Angeles, CA',
    services: ['Electrical', 'Wiring', 'Installations'],
    price: '$60-90/hr',
    availability: 'Available Tomorrow',
    category: 'electrical',
  },
  {
    id: '3',
    name: 'Robert Johnson',
    image: '/placeholder.svg',
    rating: 4.7,
    ratingCount: 156,
    location: 'New York, NY',
    services: ['Deep Cleaning', 'Residential', 'Office'],
    price: '$40-60/hr',
    availability: 'Available Today',
    category: 'cleaning',
  },
  {
    id: '4',
    name: 'Jennifer Lopez',
    image: '/placeholder.svg',
    rating: 4.9,
    ratingCount: 112,
    location: 'Chicago, IL',
    services: ['Interior Painting', 'Exterior', 'Commercial'],
    price: '$45-70/hr',
    availability: 'Available in 2 days',
    category: 'painting',
  },
  {
    id: '5',
    name: 'Michael Brown',
    image: '/placeholder.svg',
    rating: 4.6,
    ratingCount: 87,
    location: 'Seattle, WA',
    services: ['Lawn Care', 'Landscaping', 'Garden Design'],
    price: '$55-80/hr',
    availability: 'Available Tomorrow',
    category: 'gardening',
  },
  {
    id: '6',
    name: 'David Wilson',
    image: '/placeholder.svg',
    rating: 4.8,
    ratingCount: 103,
    location: 'Denver, CO',
    services: ['Furniture Repair', 'Custom Cabinets', 'Woodwork'],
    price: '$65-95/hr',
    availability: 'Available in 3 days',
    category: 'carpentry',
  },
];

const Services = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter providers based on selected category and search query
  const filteredProviders = providers.filter((provider) => {
    const matchesCategory = selectedCategory ? provider.category === selectedCategory : true;
    const matchesSearch = searchQuery
      ? provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        provider.services.some(service => 
          service.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : true;
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-28 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          {/* Page Header */}
          <div className="mb-12 text-center">
            <AnimatedSection animation="fade-in">
              <h1 className="text-4xl font-bold mb-4">Find Service Providers</h1>
              <p className="text-foreground/70 max-w-3xl mx-auto">
                Browse through our network of professional service providers and find the perfect match for your home needs.
              </p>
            </AnimatedSection>
          </div>
          
          {/* Search & Filter Section */}
          <AnimatedSection animation="slide-up" className="mb-12">
            <div className="bg-white rounded-2xl shadow-sm border border-border p-6">
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-foreground/50" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search for services or providers..."
                    className="pl-10 pr-4 py-3 rounded-full w-full border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
            </div>
          </AnimatedSection>
          
          {/* Results */}
          <div className="space-y-8 staggered-fade-in">
            {filteredProviders.length > 0 ? (
              filteredProviders.map((provider) => (
                <ProviderCard
                  key={provider.id}
                  id={provider.id}
                  name={provider.name}
                  image={provider.image}
                  rating={provider.rating}
                  ratingCount={provider.ratingCount}
                  location={provider.location}
                  services={provider.services}
                  price={provider.price}
                  availability={provider.availability}
                />
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl border border-border">
                <h3 className="text-xl font-semibold mb-2">No providers found</h3>
                <p className="text-foreground/70">
                  Try adjusting your search criteria or browse other categories.
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

export default Services;
