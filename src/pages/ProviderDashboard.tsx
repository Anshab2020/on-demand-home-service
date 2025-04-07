import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import { Calendar, Clock, MapPin, Phone, Mail, Briefcase, CheckCircle, XCircle, Clock4, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface ProviderData {
  firstName: string;
  lastName: string;
  email: string;
  serviceType: string;
  experience: string;
  location: string;
  phone: string;
  status: string;
}

interface Booking {
  id: string;
  serviceTitle: string;
  customerName: string;
  date: string;
  time: string;
  location: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  price: number;
  providerEmail: string;
}

const ProviderDashboard = () => {
  const [providerData, setProviderData] = useState<ProviderData | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [status, setStatus] = useState('pending');

  useEffect(() => {
    const checkStatus = () => {
      if (!user?.email) return;

      // Get providers array
      const providers = JSON.parse(localStorage.getItem('providers') || '[]');
      
      // Find current provider
      const currentProvider = providers.find(
        p => p.email.toLowerCase() === user.email.toLowerCase()
      );

      if (currentProvider) {
        setStatus(currentProvider.status || 'pending');
      }

      setLoading(false);
    };

    // Check immediately
    checkStatus();

    // Set up interval to check periodically
    const interval = setInterval(checkStatus, 3000);

    return () => clearInterval(interval);
  }, [user]);

  // Function to load provider data and bookings
  const loadProviderData = () => {
    const providerEmail = localStorage.getItem('providerEmail');
    if (!providerEmail) {
      navigate('/provider-login');
      return;
    }

    const providers = JSON.parse(localStorage.getItem('providers') || '[]');
    const provider = providers.find((p: ProviderData) => p.email === providerEmail);
    
    if (!provider) {
      toast({
        title: "Error",
        description: "Provider data not found.",
        variant: "destructive",
      });
      navigate('/provider-login');
      return;
    }

    setProviderData(provider);

    // Load bookings if provider is accepted
    if (provider.status === 'accepted') {
      const allBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      const providerBookings = allBookings.filter((b: Booking) => b.providerEmail === providerEmail);
      setBookings(providerBookings);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadProviderData();
  }, [navigate, toast, user]);

  const handleAcceptService = () => {
    if (!providerData) return;

    try {
      // Get current providers list
      const providers = JSON.parse(localStorage.getItem('providers') || '[]');
      
      // Update the status for the current provider
      const updatedProviders = providers.map((p: ProviderData) => 
        p.email === providerData.email ? { ...p, status: 'accepted' } : p
      );
      
      // Save back to localStorage
      localStorage.setItem('providers', JSON.stringify(updatedProviders));

      toast({
        title: "Success",
        description: "You have successfully accepted your service. You can now receive bookings.",
      });

      // Reload provider data to reflect changes
      loadProviderData();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to accept service. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleStatusChange = (bookingId: string, newStatus: Booking['status']) => {
    try {
      // Get all bookings
      const allBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      
      // Update the status for the specific booking
      const updatedAllBookings = allBookings.map((booking: Booking) => 
        booking.id === bookingId ? { ...booking, status: newStatus } : booking
      );
      
      // Save all bookings back to localStorage
      localStorage.setItem('bookings', JSON.stringify(updatedAllBookings));

      // Update local state with provider's bookings only
      const providerBookings = updatedAllBookings.filter(
        (b: Booking) => b.providerEmail === providerData?.email
      );
      setBookings(providerBookings);

      toast({
        title: "Success",
        description: `Booking status updated to ${newStatus}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update booking status. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: Booking['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500';
      case 'confirmed':
        return 'bg-blue-500';
      case 'completed':
        return 'bg-green-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const handleMarkAsCompleted = (booking: Booking) => {
    setSelectedBooking(booking);
    setShowConfirmDialog(true);
  };

  const confirmCompletion = () => {
    if (!selectedBooking) return;

    try {
      const allBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      const updatedBookings = allBookings.map(booking => 
        booking.id === selectedBooking.id 
          ? { ...booking, status: 'completed', completedDate: new Date().toISOString() }
          : booking
      );
      
      localStorage.setItem('bookings', JSON.stringify(updatedBookings));
      
      toast({
        title: "Service Completed",
        description: "The service has been marked as completed.",
      });

      setShowConfirmDialog(false);
      setSelectedBooking(null);
      loadProviderData();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to mark service as completed. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="container py-8">
        <Card>
          <CardContent className="text-center py-6">
            <p>Loading...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!providerData) {
    return null;
  }

  if (status !== 'approved') {
    return (
      <div className="container py-8">
        <Card>
          <CardHeader>
            <CardTitle>Account Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-6">
              <Badge className="bg-yellow-500 mb-4">
                Pending Approval
              </Badge>
              <p className="text-muted-foreground">
                Your account is pending approval from the admin. 
                Please check back later.
              </p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => window.location.reload()}
              >
                Check Status Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show accept service prompt if provider hasn't accepted yet
  if (providerData.status !== 'accepted') {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-28 pb-16">
          <div className="container mx-auto px-4">
            <Card className="max-w-2xl mx-auto">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <AlertCircle className="h-12 w-12 text-primary mb-4" />
                  <h2 className="text-2xl font-bold mb-2">Accept Your Service</h2>
                  <p className="text-foreground/70 mb-6">
                    Welcome {providerData.firstName} {providerData.lastName}! Before you can start receiving bookings, 
                    you need to accept your service as a {providerData.serviceType} provider.
                  </p>
                  <div className="space-y-4 w-full max-w-sm">
                    <Card className="bg-secondary/10">
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2">Service Details</h3>
                        <p className="text-sm text-foreground/70">Type: {providerData.serviceType}</p>
                        <p className="text-sm text-foreground/70">Location: {providerData.location}</p>
                        <p className="text-sm text-foreground/70">Experience: {providerData.experience}</p>
                      </CardContent>
                    </Card>
                    <Button 
                      className="w-full"
                      onClick={handleAcceptService}
                    >
                      Accept Service
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
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
                <h1 className="text-3xl font-bold mb-2">Provider Dashboard</h1>
                <p className="text-foreground/70">
                  Welcome back, {providerData.firstName} {providerData.lastName}
                </p>
              </div>
              <Button variant="outline" onClick={() => navigate('/services')}>
                View Services
              </Button>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <AnimatedSection animation="slide-in">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5" />
                    Service Type
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{providerData.serviceType}</p>
                  <p className="text-sm text-foreground/70">Experience: {providerData.experience}</p>
                </CardContent>
              </Card>
            </AnimatedSection>

            <AnimatedSection animation="slide-in" delay={0.1}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Location
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{providerData.location}</p>
                  <p className="text-sm text-foreground/70">Service Area</p>
                </CardContent>
              </Card>
            </AnimatedSection>

            <AnimatedSection animation="slide-in" delay={0.2}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    Contact
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{providerData.phone}</p>
                  <p className="text-sm text-foreground/70">{providerData.email}</p>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>

          <AnimatedSection animation="slide-in" delay={0.3}>
            <Tabs defaultValue="upcoming" className="space-y-4">
              <TabsList>
                <TabsTrigger value="upcoming">Upcoming Bookings</TabsTrigger>
                <TabsTrigger value="past">Past Bookings</TabsTrigger>
              </TabsList>

              <TabsContent value="upcoming" className="space-y-4">
                {bookings
                  .filter(booking => booking.status !== 'completed' && booking.status !== 'cancelled')
                  .map(booking => (
                    <Card key={booking.id}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold mb-2">{booking.serviceTitle}</h3>
                            <div className="space-y-2 text-sm text-foreground/70">
                              <p className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                {booking.date}
                              </p>
                              <p className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                {booking.time}
                              </p>
                              <p className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                {booking.location}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <Badge className={getStatusColor(booking.status)}>
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </Badge>
                            <p className="font-semibold">${booking.price}</p>
                            {booking.status === 'pending' && (
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  onClick={() => handleStatusChange(booking.id, 'confirmed')}
                                >
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  Confirm
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => handleStatusChange(booking.id, 'cancelled')}
                                >
                                  <XCircle className="h-4 w-4 mr-1" />
                                  Cancel
                                </Button>
                              </div>
                            )}
                            {booking.status === 'confirmed' && (
                              <Button
                                size="sm"
                                onClick={() => handleStatusChange(booking.id, 'completed')}
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Mark Complete
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </TabsContent>

              <TabsContent value="past" className="space-y-4">
                {bookings
                  .filter(booking => booking.status === 'completed' || booking.status === 'cancelled')
                  .map(booking => (
                    <Card key={booking.id}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold mb-2">{booking.serviceTitle}</h3>
                            <div className="space-y-2 text-sm text-foreground/70">
                              <p className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                {booking.date}
                              </p>
                              <p className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                {booking.time}
                              </p>
                              <p className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                {booking.location}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <Badge className={getStatusColor(booking.status)}>
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </Badge>
                            <p className="font-semibold">${booking.price}</p>
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

      {/* Completion Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Service Completion</DialogTitle>
            <DialogDescription>
              Are you sure you want to mark this service as completed? 
              This will notify the customer that the service has been fulfilled.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2 mt-4">
            <Button
              variant="outline"
              onClick={() => setShowConfirmDialog(false)}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              className="bg-green-500 hover:bg-green-600"
              onClick={confirmCompletion}
            >
              Yes, Mark as Completed
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProviderDashboard; 