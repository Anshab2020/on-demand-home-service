import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Star, MapPin, Clock, Calendar, CheckCircle, Shield, Phone, Mail, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import PaymentForm from '@/components/PaymentForm';
import ReviewForm from '@/components/ReviewForm';

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

interface Review {
  id: string;
  providerEmail: string;
  rating: number;
  comment: string;
  date: string;
}

const ServiceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [isBooking, setIsBooking] = useState(false);
  const [provider, setProvider] = useState<Provider | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    const loadProvider = () => {
      const allProviders = JSON.parse(localStorage.getItem('providers') || '[]');
      const foundProvider = allProviders.find((p: Provider) => p.email === id);
      
      if (foundProvider) {
        setProvider(foundProvider);
      } else {
        toast({
          title: "Provider Not Found",
          description: "The requested service provider could not be found.",
          variant: "destructive",
        });
        navigate('/');
      }
      setLoading(false);
    };

    loadProvider();
  }, [id, navigate, toast]);

  useEffect(() => {
    const loadReviews = () => {
      const allReviews = JSON.parse(localStorage.getItem('reviews') || '[]');
      const providerReviews = allReviews.filter((review: Review) => review.providerEmail === id);
      setReviews(providerReviews);
    };

    loadReviews();
  }, [id]);
  
  const handleBookingClick = () => {
    if (!user) {
      navigate('/sign-in');
      return;
    }

    const preferredPayment = localStorage.getItem('preferredPaymentMethod') || 'cash';

    const booking = {
      id: Date.now().toString(),
      userId: user.email,
      providerId: provider?.email,
      serviceTitle: provider?.serviceTitle,
      status: 'pending',
      paymentMethod: preferredPayment,
      date: new Date().toISOString()
    };

    const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    localStorage.setItem('bookings', JSON.stringify([...existingBookings, booking]));

    toast({
      title: "Booking Successful",
      description: "Your service has been booked successfully.",
    });

    navigate('/bookings');
  };

  const handlePaymentSuccess = () => {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const updatedBookings = bookings.map((booking: any) => {
      if (booking.providerEmail === provider.email && booking.userEmail === user?.email) {
        return { ...booking, isPaid: true, status: 'confirmed' };
      }
      return booking;
    });
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));

    navigate('/dashboard');
  };
  
  const parsePrice = (priceString: string | undefined): number => {
    if (!priceString) return 0;
    const matches = priceString.match(/\d+(\.\d+)?/);
    return matches ? parseFloat(matches[0]) : 0;
  };

  if (loading || !provider) {
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
        <div className="container mx-auto px-4 md:px-6">
          {/* Back button */}
          <AnimatedSection animation="fade-in" className="mb-6">
            <Button variant="ghost" asChild className="pl-0 mb-6">
              <Link to="/" className="inline-flex items-center">
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back to Home
              </Link>
            </Button>
          </AnimatedSection>
          
          {/* Provider Header */}
          <AnimatedSection animation="fade-in" className="mb-10">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-lg flex-shrink-0">
                <img 
                  src="/placeholder.svg"
                  alt={`${provider.firstName} ${provider.lastName}`}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  {provider.firstName} {provider.lastName}
                </h1>
                <p className="text-xl text-foreground/80 mb-3">{provider.serviceTitle}</p>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-4">
                  <div className="flex items-center">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className="w-5 h-5 text-yellow-500 fill-yellow-500"
                        />
                      ))}
                    </div>
                    <span className="ml-2 font-medium">5.0</span>
                    <span className="text-foreground/60 ml-1">(New)</span>
                  </div>
                  
                  <div className="flex items-center text-foreground/70">
                    <MapPin className="w-5 h-5 mr-1" />
                    <span>{provider.location}</span>
                  </div>
                  
                  <div className="flex items-center text-foreground/70">
                    <Clock className="w-5 h-5 mr-1" />
                    <span>{provider.experience} experience</span>
                  </div>
                </div>
              </div>
              
              <div className="md:ml-auto self-center">
                <Button 
                  onClick={handleBookingClick}
                  className="w-full"
                >
                  {user ? 'Book Now' : 'Sign in to Book'}
                </Button>
                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    className="rounded-full px-6 flex-1"
                    onClick={() => window.location.href = `tel:${provider.phone}`}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call
                  </Button>
                  <Button 
                    variant="outline" 
                    className="rounded-full px-6 flex-1"
                    onClick={() => window.location.href = `mailto:${provider.email}`}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </Button>
                </div>
              </div>
            </div>
          </AnimatedSection>
          
          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left Column - Details */}
            <div className="lg:col-span-2 space-y-10">
              {/* About Section */}
              <AnimatedSection animation="slide-up" className="bg-white rounded-2xl border border-border shadow-sm p-6">
                <h2 className="text-2xl font-semibold mb-4">About {provider.firstName}</h2>
                <p className="text-foreground/80 mb-6 leading-relaxed">
                  {provider.serviceDescription}
                </p>
                
                <h3 className="text-xl font-semibold mb-3">Service Details</h3>
                <div className="grid grid-cols-1 gap-3 mb-6">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-primary mr-2 flex-shrink-0" />
                    <span>{provider.serviceTitle}</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-primary mr-2 flex-shrink-0" />
                    <span>Starting from {provider.servicePrice}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mb-3">Contact Information</h3>
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-primary mr-2 flex-shrink-0" />
                    <span>{provider.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-primary mr-2 flex-shrink-0" />
                    <span>{provider.email}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-primary mr-2 flex-shrink-0" />
                    <span>{provider.location}</span>
                  </div>
                </div>
              </AnimatedSection>

              {/* Reviews Section */}
              <AnimatedSection animation="slide-up" className="bg-white rounded-2xl border border-border shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold">Reviews</h2>
                  {user && !showReviewForm && (
                    <Button onClick={() => setShowReviewForm(true)}>
                      Write a Review
                    </Button>
                  )}
                </div>

                {showReviewForm && (
                  <div className="mb-6">
                    <ReviewForm 
                      providerEmail={id || ''} 
                      onSuccess={() => {
                        setShowReviewForm(false);
                        const allReviews = JSON.parse(localStorage.getItem('reviews') || '[]');
                        const providerReviews = allReviews.filter((review: Review) => review.providerEmail === id);
                        setReviews(providerReviews);
                      }} 
                    />
                  </div>
                )}

                <div className="space-y-4">
                  {reviews.length > 0 ? (
                    reviews.map((review) => (
                      <div key={review.id} className="border-b border-border pb-4">
                        <div className="flex items-center mb-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating
                                    ? 'text-yellow-500 fill-yellow-500'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground ml-2">
                            {new Date(review.date).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-foreground/80">{review.comment}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-center py-4">
                      No reviews yet. Be the first to review this service provider!
                    </p>
                  )}
                </div>
              </AnimatedSection>
            </div>

            {/* Right Column - Booking Info */}
            <div className="space-y-6">
              <AnimatedSection animation="slide-up" className="bg-white rounded-2xl border border-border shadow-sm p-6">
                <h3 className="text-xl font-semibold mb-4">Booking Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center text-foreground/70">
                    <Calendar className="w-5 h-5 mr-2" />
                    <span>Available for bookings</span>
                  </div>
                  <div className="flex items-center text-foreground/70">
                    <Shield className="w-5 h-5 mr-2" />
                    <span>Verified Provider</span>
                  </div>
                  <Button 
                    className="w-full"
                    onClick={handleBookingClick}
                  >
                    {user ? 'Book Now' : 'Sign in to Book'}
                  </Button>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ServiceDetail;
