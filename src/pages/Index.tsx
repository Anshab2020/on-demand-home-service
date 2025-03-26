import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Clock, CheckCircle, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ServiceCard from '@/components/ServiceCard';
import AnimatedSection from '@/components/AnimatedSection';
import Footer from '@/components/Footer';

// Sample service categories
const serviceCategories = [
  {
    id: 'plumbing',
    title: 'Plumbing',
    description: 'Professional plumbing services for repairs, installations and maintenance.',
    color: 'blue',
  },
  {
    id: 'electrical',
    title: 'Electrical',
    description: 'Certified electricians for all your electrical needs and installations.',
    color: 'yellow',
  },
  {
    id: 'cleaning',
    title: 'Cleaning',
    description: 'Professional cleaning services for homes and commercial spaces.',
    color: 'green',
  },
  {
    id: 'painting',
    title: 'Painting',
    description: 'Expert painters for interior and exterior painting projects.',
    color: 'red',
  },
  {
    id: 'gardening',
    title: 'Gardening',
    description: 'Skilled gardeners for lawn maintenance and landscaping services.',
    color: 'green',
  },
  {
    id: 'carpentry',
    title: 'Carpentry',
    description: 'Custom woodwork and furniture repair services.',
    color: 'brown',
  },
];

// Sample testimonial data
const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Homeowner',
    content: "HomeServe made finding a reliable plumber so easy. The service was quick, professional, and exactly what I needed. I'll definitely use the platform again for future home repairs.",
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Apartment Manager',
    content: "As a property manager, I've tried many services, but HomeServe stands out for its reliability and quality. The vetted professionals have consistently delivered excellent work for our maintenance needs.",
  },
  {
    id: 3,
    name: 'Emma Rodriguez',
    role: 'New Homeowner',
    content: 'Being a first-time homeowner was overwhelming, but HomeServe simplified everything. From finding a painter to scheduling an electrician, the platform made home maintenance stress-free.',
  },
];

const Index: React.FC = () => {
  const [providers, setProviders] = useState<any[]>([]);

  useEffect(() => {
    // Fetch accepted providers from localStorage
    const acceptedProviders = JSON.parse(localStorage.getItem('providers') || '[]')
      .filter((provider: any) => provider.status === 'accepted');
    setProviders(acceptedProviders);
  }, []);

  // Group providers by service type
  const providersByService = providers.reduce((acc: any, provider: any) => {
    const serviceType = provider.serviceType.toLowerCase();
    if (!acc[serviceType]) {
      acc[serviceType] = [];
    }
    acc[serviceType].push(provider);
    return acc;
  }, {});

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <Hero />
        
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSection animation="fade-in" delay={100}>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Our Service Categories
                </h2>
                <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
                  Browse through our comprehensive list of home services. Each category is staffed by experienced professionals ready to help.
                </p>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {serviceCategories.map((service, index) => (
                <AnimatedSection
                  key={service.id}
                  animation="fade-in"
                  delay={200 + index * 100}
                >
                  <ServiceCard 
                    {...service} 
                    providerCount={providersByService[service.id]?.length || 0}
                  />
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <AnimatedSection animation="fade-in" delay={100}>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Verified Professionals</h3>
                  <p className="text-foreground/70">
                    All service providers are thoroughly vetted and background-checked.
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="fade-in" delay={200}>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Quick Response</h3>
                  <p className="text-foreground/70">
                    Get matched with available professionals in your area quickly.
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="fade-in" delay={300}>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Quality Guaranteed</h3>
                  <p className="text-foreground/70">
                    Satisfaction guaranteed with every service we provide.
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <AnimatedSection animation="slide-in" className="order-2 lg:order-1">
                <div className="bg-primary/5 border border-primary/10 rounded-2xl p-8">
                  <div className="space-y-6">
                    <div className="flex">
                      <div className="bg-primary/10 text-primary rounded-full p-2 mr-4">
                        <Shield className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold mb-1">Verified Professionals</h4>
                        <p className="text-foreground/70">
                          Every service provider is thoroughly vetted and background checked for your peace of mind.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="bg-primary/10 text-primary rounded-full p-2 mr-4">
                        <Star className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold mb-1">Guaranteed Quality</h4>
                        <p className="text-foreground/70">
                          We ensure high-quality work with service guarantees and ongoing quality checks.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="bg-primary/10 text-primary rounded-full p-2 mr-4">
                        <Clock className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold mb-1">Flexible Scheduling</h4>
                        <p className="text-foreground/70">
                          Book services at your convenience with options for same-day or future appointments.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
              
              <AnimatedSection animation="slide-in" className="order-1 lg:order-2">
                <h2 className="text-3xl font-bold mb-6">Why Choose HomeServe?</h2>
                <p className="text-foreground/70 mb-6">
                  HomeServe is the trusted platform for connecting homeowners with skilled professionals. We take the stress out of home maintenance by providing reliable, pre-screened service providers.
                </p>
                <p className="text-foreground/70 mb-8">
                  Our commitment to quality service, transparent pricing, and customer satisfaction sets us apart in the industry.
                </p>
                <Button 
                  asChild
                  className="rounded-full px-6"
                >
                  <Link to="/about">
                    Learn More About Us
                  </Link>
                </Button>
              </AnimatedSection>
            </div>
          </div>
        </section>
        
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSection className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
              <p className="text-foreground/70 max-w-3xl mx-auto">
                Don't just take our word for it. Here's what homeowners and property managers have to say about HomeServe.
              </p>
            </AnimatedSection>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <AnimatedSection
                  key={testimonial.id}
                  animation="fade-in"
                  delay={200}
                >
                  <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-4 font-semibold">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-foreground/60">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-foreground/80 italic">"{testimonial.content}"</p>
                    <div className="mt-4 flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className="w-4 h-4 text-yellow-500 fill-yellow-500" 
                        />
                      ))}
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <AnimatedSection animation="fade-in" delay={100}>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Ready to Get Started?
                </h2>
                <p className="text-xl mb-8 opacity-90">
                  Join thousands of satisfied customers who trust us with their home service needs.
                </p>
                <Button
                  size="lg"
                  variant="secondary"
                  className="rounded-full px-8 py-6 text-lg"
                >
                  Find a Service Provider
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
