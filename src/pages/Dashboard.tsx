import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, CheckCircle, Clock4, XCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Load bookings from localStorage
    const savedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    setBookings(savedBookings);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'text-green-500';
      case 'pending':
        return 'text-yellow-500';
      case 'completed':
        return 'text-blue-500';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-5 h-5" />;
      case 'pending':
        return <Clock4 className="w-5 h-5" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5" />;
      default:
        return <XCircle className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-28 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <AnimatedSection animation="fade-in">
            <div className="max-w-4xl mx-auto">
              <div className="bg-card rounded-lg shadow-lg p-6 md:p-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">Welcome, {user?.email}</h1>
                    <p className="text-foreground/70">Manage your account and services</p>
                  </div>
                  <Button variant="outline" onClick={handleLogout}>
                    Sign Out
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Profile Section */}
                  <div className="bg-background/50 rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-foreground/70">Email</label>
                        <p className="text-foreground">{user?.email}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground/70">Account Type</label>
                        <p className="text-foreground">Customer</p>
                      </div>
                    </div>
                  </div>

                  {/* Booking Stats */}
                  <div className="bg-background/50 rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Booking Statistics</h2>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary mb-1">
                          {bookings.length}
                        </div>
                        <div className="text-sm text-foreground/70">Total Bookings</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-yellow-500 mb-1">
                          {bookings.filter(b => b.status === 'pending').length}
                        </div>
                        <div className="text-sm text-foreground/70">Pending</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-500 mb-1">
                          {bookings.filter(b => b.status === 'completed').length}
                        </div>
                        <div className="text-sm text-foreground/70">Completed</div>
                      </div>
                    </div>
                  </div>

                  {/* Upcoming Bookings */}
                  <div className="md:col-span-2 bg-background/50 rounded-lg p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-semibold">Upcoming Bookings</h2>
                      <Button variant="outline" onClick={() => navigate('/services')}>
                        Book New Service
                      </Button>
                    </div>
                    <div className="space-y-4">
                      {bookings
                        .filter(booking => booking.status !== 'completed')
                        .map(booking => (
                          <div
                            key={booking.id}
                            className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg border border-border"
                          >
                            <div className="space-y-2 md:space-y-0">
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold">{booking.service}</h3>
                                <span className={`flex items-center gap-1 ${getStatusColor(booking.status)}`}>
                                  {getStatusIcon(booking.status)}
                                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                </span>
                              </div>
                              <div className="flex flex-wrap gap-4 text-sm text-foreground/70">
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  {booking.date}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {booking.time}
                                </div>
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-4 h-4" />
                                  {booking.location}
                                </div>
                              </div>
                            </div>
                            <div className="mt-4 md:mt-0">
                              <div className="text-right">
                                <div className="font-semibold">{booking.price}</div>
                                <div className="text-sm text-foreground/70">with {booking.provider}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Past Bookings */}
                  <div className="md:col-span-2 bg-background/50 rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Past Bookings</h2>
                    <div className="space-y-4">
                      {bookings
                        .filter(booking => booking.status === 'completed')
                        .map(booking => (
                          <div
                            key={booking.id}
                            className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg border border-border"
                          >
                            <div className="space-y-2 md:space-y-0">
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold">{booking.service}</h3>
                                <span className="flex items-center gap-1 text-blue-500">
                                  <CheckCircle className="w-4 h-4" />
                                  Completed
                                </span>
                              </div>
                              <div className="flex flex-wrap gap-4 text-sm text-foreground/70">
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  {booking.date}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {booking.time}
                                </div>
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-4 h-4" />
                                  {booking.location}
                                </div>
                              </div>
                            </div>
                            <div className="mt-4 md:mt-0">
                              <div className="text-right">
                                <div className="font-semibold">{booking.price}</div>
                                <div className="text-sm text-foreground/70">with {booking.provider}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard; 