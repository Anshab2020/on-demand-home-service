import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';

const ProviderLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Get providers from localStorage
      const providers = JSON.parse(localStorage.getItem('providers') || '[]');
      const provider = providers.find((p: any) => p.email === email);

      if (!provider) {
        throw new Error('Provider account not found');
      }

      if (provider.status !== 'approved') {
        throw new Error('Your account is pending approval. Please wait for admin approval.');
      }

      // In a real app, this would verify the password with Firebase
      // For demo purposes, we'll just check if it's not empty
      if (!password) {
        throw new Error('Invalid password');
      }

      localStorage.setItem('providerEmail', email);
      localStorage.setItem('providerData', JSON.stringify(provider));
      
      toast({
        title: "Success!",
        description: "You have been signed in successfully.",
      });
      
      navigate('/provider-dashboard');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to sign in. Please try again.",
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
                <h1 className="text-3xl font-bold mb-2">Provider Login</h1>
                <p className="text-foreground/70">
                  Sign in to manage your service bookings
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="slide-in">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Signing in..." : "Sign In"}
                </Button>

                <p className="text-center text-sm text-foreground/70">
                  Don't have a provider account?{' '}
                  <Link to="/provider-signup" className="text-primary hover:underline">
                    Sign up
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

export default ProviderLogin; 