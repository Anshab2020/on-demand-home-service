import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';

// Define available service categories
const serviceCategories = [
  {
    id: 'plumbing',
    title: 'Plumbing',
    description: 'Professional plumbing services',
  },
  {
    id: 'electrical',
    title: 'Electrical',
    description: 'Electrical installation and repair services',
  },
  {
    id: 'cleaning',
    title: 'Cleaning',
    description: 'Professional cleaning services',
  },
  {
    id: 'painting',
    title: 'Painting',
    description: 'Interior and exterior painting services',
  },
  {
    id: 'gardening',
    title: 'Gardening',
    description: 'Gardening and landscaping services',
  },
  {
    id: 'carpentry',
    title: 'Carpentry',
    description: 'Carpentry and woodworking services',
  },
];

const ProviderSignUp = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    serviceType: '',
    experience: '',
    location: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleServiceTypeChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      serviceType: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.serviceType) {
      toast({
        title: "Error",
        description: "Please select a service type.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Get the selected service category
      const selectedService = serviceCategories.find(service => service.id === formData.serviceType);
      
      if (!selectedService) {
        throw new Error('Invalid service type selected');
      }

      // In a real app, this would save to Firebase
      // For demo purposes, we'll just save to localStorage
      const providers = JSON.parse(localStorage.getItem('providers') || '[]');
      const newProvider = {
        id: Date.now().toString(),
        ...formData,
        serviceTitle: selectedService.title,
        serviceDescription: selectedService.description,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };
      
      localStorage.setItem('providers', JSON.stringify([...providers, newProvider]));
      
      toast({
        title: "Success!",
        description: "Your account has been created successfully. Please wait for approval.",
      });
      
      navigate('/provider-login');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-28 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-md mx-auto">
            <AnimatedSection animation="fade-in">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2">Provider Sign Up</h1>
                <p className="text-foreground/70">
                  Create your service provider account
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="slide-in">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder="Enter first name"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      placeholder="Enter last name"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="serviceType">Service Type</Label>
                  <Select
                    value={formData.serviceType}
                    onValueChange={handleServiceTypeChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a service type" />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceCategories.map(service => (
                        <SelectItem 
                          key={service.id} 
                          value={service.id}
                        >
                          {service.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Years of Experience</Label>
                  <Input
                    id="experience"
                    name="experience"
                    type="text"
                    placeholder="e.g., 5 years"
                    value={formData.experience}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Service Location</Label>
                  <Input
                    id="location"
                    name="location"
                    type="text"
                    placeholder="e.g., San Francisco, CA"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Creating Account..." : "Create Account"}
                </Button>

                <p className="text-center text-sm text-foreground/70">
                  Already have an account?{' '}
                  <Link to="/provider-login" className="text-primary hover:underline">
                    Sign in
                  </Link>
                </p>
              </form>
            </AnimatedSection>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProviderSignUp; 