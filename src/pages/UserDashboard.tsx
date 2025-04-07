import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { CheckCircle, Clock, XCircle, X, Star } from 'lucide-react';
import PaymentSettings from '@/components/PaymentSettings';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useNavigate } from 'react-router-dom';
import ReviewForm from '@/components/ReviewForm';

interface Booking {
  id: string;
  userId: string;
  providerId: string;
  serviceTitle: string;
  status: string;
  date: string;
  paymentMethod: string;
  location: string;
  providerName: string;
  price: string;
  reviewed: boolean;
  completedDate?: string;
}

const UserDashboard = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    if (!user?.email) return;

    // Load only this user's bookings
    const loadUserBookings = () => {
      const allBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      // Strictly filter bookings by current user's email
      const userBookings = allBookings.filter(
        (booking) => booking.userId === user.email
      );
      setBookings(userBookings);
    };

    loadUserBookings();

    // Update bookings when localStorage changes
    window.addEventListener('storage', loadUserBookings);

    return () => {
      window.removeEventListener('storage', loadUserBookings);
    };
  }, [user]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <Badge className="bg-green-500">
            <CheckCircle className="w-4 h-4 mr-1" />
            Completed
          </Badge>
        );
      case 'approved':
        return (
          <Badge className="bg-blue-500">
            Approved
          </Badge>
        );
      case 'cancelled':
        return (
          <Badge className="bg-red-500">
            <X className="w-4 h-4 mr-1" />
            Cancelled
          </Badge>
        );
      default:
        return (
          <Badge className="bg-yellow-500">
            <Clock className="w-4 h-4 mr-1" />
            Pending
          </Badge>
        );
    }
  };

  const handleCancelBooking = (bookingId: string) => {
    const allBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const updatedBookings = allBookings.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: 'cancelled' } 
        : booking
    );
    
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    
    // Show success message
    toast({
      title: "Booking Cancelled",
      description: "Your booking has been cancelled successfully.",
    });

    // Refresh the bookings list
    loadUserBookings();
  };

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-6">My Dashboard</h1>

      {/* Service Requests Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>My Service Requests</CardTitle>
        </CardHeader>
        <CardContent>
          {bookings.length > 0 ? (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div 
                  key={booking.id} 
                  className="p-4 border rounded-lg flex items-center justify-between"
                >
                  <div>
                    <h3 className="font-medium">{booking.serviceTitle}</h3>
                    <p className="text-sm text-muted-foreground">
                      Booked on: {new Date(booking.date).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Payment Method: {booking.paymentMethod}
                    </p>
                    {booking.completedDate && (
                      <p className="text-sm text-muted-foreground">
                        Completed on: {new Date(booking.completedDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusBadge(booking.status)}
                  </div>
                  {booking.status === 'pending' && (
                    <Button 
                      variant="destructive"
                      size="sm"
                      onClick={() => handleCancelBooking(booking.id)}
                    >
                      <X className="w-4 h-4 mr-1" />
                      Cancel
                    </Button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-4">
              No service requests yet
            </p>
          )}
        </CardContent>
      </Card>

      {/* Payment Preferences Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Payment Preferences</h2>
        <PaymentSettings />
      </section>

      {/* Cancel Confirmation Dialog */}
      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Booking</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel this booking? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2 mt-4">
            <Button
              variant="outline"
              onClick={() => setShowCancelDialog(false)}
            >
              No, Keep Booking
            </Button>
            <Button
              variant="destructive"
              onClick={() => {}}
            >
              Yes, Cancel Booking
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Update this Upcoming Bookings section */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Upcoming Bookings</h2>
          <Button variant="outline" onClick={() => navigate('/services')}>
            Book New Service
          </Button>
        </div>

        {bookings.map((booking) => (
          <div 
            key={booking.id} 
            className="border rounded-lg p-4 mb-4 bg-card"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium">{booking.serviceTitle}</h3>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{booking.date}</span>
                  <span>{booking.location}</span>
                  <span>with {booking.providerName}</span>
                  <span className="text-yellow-500">
                    {booking.status === 'pending' && '⏳ Pending'}
                    {booking.status === 'cancelled' && '❌ Cancelled'}
                    {booking.status === 'completed' && '✅ Completed'}
                  </span>
                </div>
                <div className="mt-2">
                  <span className="font-semibold">${booking.price}/hour</span>
                </div>
                {booking.completedDate && (
                  <p className="text-sm text-muted-foreground">
                    Completed on: {new Date(booking.completedDate).toLocaleDateString()}
                  </p>
                )}
              </div>

              {/* Add Cancel Button */}
              {booking.status === 'pending' && (
                <Button 
                  variant="destructive"
                  onClick={() => handleCancelBooking(booking.id)}
                  className="bg-red-500 hover:bg-red-600 text-white"
                >
                  Cancel Booking
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Review Form Dialog */}
      {selectedBooking && (
        <ReviewForm
          booking={selectedBooking}
          isOpen={showReviewForm}
          onClose={() => {
            setShowReviewForm(false);
            setSelectedBooking(null);
            loadUserBookings(); // Refresh bookings to update reviewed status
          }}
        />
      )}
    </div>
  );
};

export default UserDashboard; 