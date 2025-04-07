import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { CreditCard, Wallet } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const UserAccount = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [paymentMethod, setPaymentMethod] = React.useState('cash');

  React.useEffect(() => {
    // Load saved payment preference
    const savedMethod = localStorage.getItem('preferredPaymentMethod');
    if (savedMethod) {
      setPaymentMethod(savedMethod);
    }
  }, []);

  const handleSavePayment = () => {
    localStorage.setItem('preferredPaymentMethod', paymentMethod);
    toast({
      title: "Success",
      description: "Payment preference saved successfully",
    });
  };

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-6">My Account</h1>

      {/* Payment Settings Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Payment Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup 
            value={paymentMethod} 
            onValueChange={setPaymentMethod}
            className="space-y-4"
          >
            <div className="flex items-center space-x-2 p-4 border rounded-lg">
              <RadioGroupItem value="card" id="card" />
              <Label htmlFor="card" className="flex items-center">
                <CreditCard className="w-4 h-4 mr-2" />
                Card Payment
              </Label>
            </div>
            <div className="flex items-center space-x-2 p-4 border rounded-lg">
              <RadioGroupItem value="cash" id="cash" />
              <Label htmlFor="cash" className="flex items-center">
                <Wallet className="w-4 h-4 mr-2" />
                Cash on Delivery
              </Label>
            </div>
          </RadioGroup>

          <Button 
            onClick={handleSavePayment} 
            className="w-full mt-4"
          >
            Save Payment Preference
          </Button>
        </CardContent>
      </Card>

      {/* Other account sections */}
      <Card>
        <CardHeader>
          <CardTitle>Account Details</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Email: {user?.email}</p>
          {/* Add other user details */}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserAccount; 