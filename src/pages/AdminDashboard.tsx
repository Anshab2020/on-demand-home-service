import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import { CheckCircle, XCircle, Clock, AlertCircle, Search, Database } from 'lucide-react';

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
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

const AdminDashboard = () => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showData, setShowData] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if admin is logged in
    const adminEmail = localStorage.getItem('adminEmail');
    if (!adminEmail) {
      navigate('/admin-login');
      return;
    }

    // Load providers from localStorage
    const loadProviders = () => {
      const savedProviders = JSON.parse(localStorage.getItem('providers') || '[]');
      setProviders(savedProviders);
      setLoading(false);
    };

    loadProviders();
  }, [navigate]);

  const handleStatusChange = (providerId: string, newStatus: Provider['status']) => {
    // Get all providers from localStorage to ensure we have the complete data
    const allProviders = JSON.parse(localStorage.getItem('providers') || '[]');
    
    // Find the provider to update
    const providerToUpdate = allProviders.find((p: any) => p.id === providerId);
    
    if (!providerToUpdate) {
      toast({
        title: "Error",
        description: "Provider not found",
        variant: "destructive",
      });
      return;
    }

    // Update the status while preserving all other data
    const updatedProviders = allProviders.map((provider: any) =>
      provider.id === providerId
        ? { ...provider, status: newStatus }
        : provider
    );

    // Update localStorage and state
    localStorage.setItem('providers', JSON.stringify(updatedProviders));
    setProviders(updatedProviders);

    toast({
      title: "Success",
      description: `Provider status updated to ${newStatus}`,
    });
  };

  const getStatusColor = (status: Provider['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500';
      case 'approved':
        return 'bg-green-500';
      case 'rejected':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: Provider['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'approved':
        return <CheckCircle className="h-4 w-4" />;
      case 'rejected':
        return <XCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const filteredProviders = providers.filter(provider =>
    provider.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    provider.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    provider.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    provider.serviceType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-28 pb-16">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fade-in">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
                <p className="text-foreground/70">
                  Manage service providers and their applications
                </p>
              </div>
              <div className="flex gap-3">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Database className="h-4 w-4" />
                      View Data
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Service Provider Data</DialogTitle>
                    </DialogHeader>
                    <div className="mt-4">
                      <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                        {JSON.stringify(providers, null, 2)}
                      </pre>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    localStorage.removeItem('adminEmail');
                    navigate('/admin-login');
                  }}
                >
                  Logout
                </Button>
              </div>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <AnimatedSection animation="slide-in">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Pending Applications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">
                    {providers.filter(p => p.status === 'pending').length}
                  </p>
                  <p className="text-sm text-foreground/70">Awaiting review</p>
                </CardContent>
              </Card>
            </AnimatedSection>

            <AnimatedSection animation="slide-in" delay={0.1}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Approved Providers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">
                    {providers.filter(p => p.status === 'approved').length}
                  </p>
                  <p className="text-sm text-foreground/70">Active providers</p>
                </CardContent>
              </Card>
            </AnimatedSection>

            <AnimatedSection animation="slide-in" delay={0.2}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <XCircle className="h-5 w-5" />
                    Rejected Applications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">
                    {providers.filter(p => p.status === 'rejected').length}
                  </p>
                  <p className="text-sm text-foreground/70">Declined applications</p>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>

          <AnimatedSection animation="slide-in" delay={0.3}>
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground/70" />
                <input
                  type="text"
                  placeholder="Search providers..."
                  className="w-full pl-10 pr-4 py-2 rounded-md border border-input bg-background"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <Tabs defaultValue="pending" className="space-y-4">
              <TabsList>
                <TabsTrigger value="pending">Pending Applications</TabsTrigger>
                <TabsTrigger value="approved">Approved Providers</TabsTrigger>
                <TabsTrigger value="rejected">Rejected Applications</TabsTrigger>
              </TabsList>

              <TabsContent value="pending" className="space-y-4">
                {filteredProviders
                  .filter(provider => provider.status === 'pending')
                  .map(provider => (
                    <Card key={provider.id}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold mb-2">
                              {provider.firstName} {provider.lastName}
                            </h3>
                            <div className="space-y-2 text-sm text-foreground/70">
                              <p>{provider.email}</p>
                              <p>{provider.phone}</p>
                              <p>Service Type: {provider.serviceType}</p>
                              <p>Experience: {provider.experience}</p>
                              <p>Location: {provider.location}</p>
                              <p>Applied: {new Date(provider.createdAt).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <Badge className={getStatusColor(provider.status)}>
                              {getStatusIcon(provider.status)}
                              {provider.status.charAt(0).toUpperCase() + provider.status.slice(1)}
                            </Badge>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                onClick={() => handleStatusChange(provider.id, 'approved')}
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleStatusChange(provider.id, 'rejected')}
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                Reject
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </TabsContent>

              <TabsContent value="approved" className="space-y-4">
                {filteredProviders
                  .filter(provider => provider.status === 'approved')
                  .map(provider => (
                    <Card key={provider.id}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold mb-2">
                              {provider.firstName} {provider.lastName}
                            </h3>
                            <div className="space-y-2 text-sm text-foreground/70">
                              <p>{provider.email}</p>
                              <p>{provider.phone}</p>
                              <p>Service Type: {provider.serviceType}</p>
                              <p>Experience: {provider.experience}</p>
                              <p>Location: {provider.location}</p>
                              <p>Approved: {new Date(provider.createdAt).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <Badge className={getStatusColor(provider.status)}>
                              {getStatusIcon(provider.status)}
                              {provider.status.charAt(0).toUpperCase() + provider.status.slice(1)}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </TabsContent>

              <TabsContent value="rejected" className="space-y-4">
                {filteredProviders
                  .filter(provider => provider.status === 'rejected')
                  .map(provider => (
                    <Card key={provider.id}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold mb-2">
                              {provider.firstName} {provider.lastName}
                            </h3>
                            <div className="space-y-2 text-sm text-foreground/70">
                              <p>{provider.email}</p>
                              <p>{provider.phone}</p>
                              <p>Service Type: {provider.serviceType}</p>
                              <p>Experience: {provider.experience}</p>
                              <p>Location: {provider.location}</p>
                              <p>Rejected: {new Date(provider.createdAt).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <Badge className={getStatusColor(provider.status)}>
                              {getStatusIcon(provider.status)}
                              {provider.status.charAt(0).toUpperCase() + provider.status.slice(1)}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </TabsContent>
            </Tabs>
          </AnimatedSection>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard; 