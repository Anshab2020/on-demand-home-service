import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Bookings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    loadBookings();
  }, [user]);

  const loadBookings = () => {
    const allBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const userBookings = allBookings.filter(
      booking => booking.userId === user?.email
    );
    setBookings(userBookings);
  };

  const handleCancelBooking = (bookingId) => {
    const allBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const updatedBookings = allBookings.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: 'cancelled' } 
        : booking
    );
    
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    
    toast({
      title: "Booking Cancelled",
      description: "Your booking has been cancelled successfully.",
    });

    loadBookings();
  };

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-6">My Bookings</h1>

      <div className="space-y-4">
        {bookings.map((booking) => (
          <Card key={booking.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium">{booking.serviceTitle}</h3>
                  <p className="text-sm text-muted-foreground">
                    Booked on: {new Date(booking.date).toLocaleDateString()}
                  </p>
                  <Badge 
                    className={`mt-2 ${
                      booking.status === 'pending' ? 'bg-yellow-500' :
                      booking.status === 'cancelled' ? 'bg-red-500' :
                      'bg-green-500'
                    }`}
                  >
                    {booking.status}
                  </Badge>
                </div>

                {booking.status === 'pending' && (
                  <Button
                    variant="destructive"
                    onClick={() => handleCancelBooking(booking.id)}
                  >
                    Cancel Booking
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}

        {bookings.length === 0 && (
          <p className="text-center text-muted-foreground py-8">
            No bookings found
          </p>
        )}
      </div>
    </div>
  );
};

export default Bookings; 