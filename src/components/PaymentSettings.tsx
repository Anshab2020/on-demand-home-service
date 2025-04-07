import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CreditCard, Wallet } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const PaymentSettings = () => {
  const [selectedMethod, setSelectedMethod] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    // Load saved preference
    const savedMethod = localStorage.getItem('preferredPaymentMethod');
    if (savedMethod) {
      setSelectedMethod(savedMethod);
    }
  }, []);

  const handleSave = () => {
    if (!selectedMethod) {
      toast({
        title: "Please select a payment method",
        variant: "destructive",
      });
      return;
    }

    localStorage.setItem('preferredPaymentMethod', selectedMethod);
    
    toast({
      title: "Success",
      description: "Your payment preference has been saved.",
    });
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Payment Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <RadioGroup 
          value={selectedMethod} 
          onValueChange={setSelectedMethod}
          className="space-y-4"
        >
          <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-secondary/50">
            <RadioGroupItem value="card" id="card" />
            <Label htmlFor="card" className="flex items-center cursor-pointer">
              <CreditCard className="w-4 h-4 mr-2" />
              Card Payment
            </Label>
          </div>
          <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-secondary/50">
            <RadioGroupItem value="cash" id="cash" />
            <Label htmlFor="cash" className="flex items-center cursor-pointer">
              <Wallet className="w-4 h-4 mr-2" />
              Cash on Delivery
            </Label>
          </div>
        </RadioGroup>

        <Button 
          onClick={handleSave} 
          className="w-full"
        >
          Save Payment Preference
        </Button>
      </CardContent>
    </Card>
  );
};

export default PaymentSettings; 