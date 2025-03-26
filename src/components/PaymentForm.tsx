import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { CreditCard, Wallet } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface PaymentFormProps {
  amount: number;
  serviceTitle: string;
  providerName: string;
  onSuccess: () => void;
}

const PaymentForm = ({ amount, serviceTitle, providerName, onSuccess }: PaymentFormProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');
  const { toast } = useToast();

  const handlePayment = async () => {
    setIsProcessing(true);

    if (paymentMethod === 'card') {
      // Validate card details
      if (!cardNumber || !expiryDate || !cvc) {
        toast({
          title: "Validation Error",
          description: "Please fill in all card details.",
          variant: "destructive",
        });
        setIsProcessing(false);
        return;
      }
    }

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: paymentMethod === 'card' ? "Payment Successful" : "Cash on Delivery Confirmed",
      description: paymentMethod === 'card' 
        ? "Your payment has been processed successfully."
        : "Your booking has been confirmed with cash on delivery.",
    });

    setIsProcessing(false);
    onSuccess();
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-secondary/50 p-4 rounded-lg">
        <h3 className="font-medium mb-2">Payment Summary</h3>
        <p className="text-sm text-muted-foreground mb-1">{serviceTitle}</p>
        <p className="text-sm text-muted-foreground mb-2">Provider: {providerName}</p>
        <p className="text-lg font-semibold">Total: ${amount.toFixed(2)}</p>
      </div>

      <RadioGroup 
        defaultValue="card" 
        onValueChange={setPaymentMethod}
        className="space-y-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="card" id="card" />
          <Label htmlFor="card" className="flex items-center">
            <CreditCard className="w-4 h-4 mr-2" />
            Pay with Card
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="cash" id="cash" />
          <Label htmlFor="cash" className="flex items-center">
            <Wallet className="w-4 h-4 mr-2" />
            Cash on Delivery
          </Label>
        </div>
      </RadioGroup>

      {paymentMethod === 'card' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input
              id="cardNumber"
              placeholder="4111 1111 1111 1111"
              value={cardNumber}
              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
              maxLength={19}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiry">Expiry Date</Label>
              <Input
                id="expiry"
                placeholder="MM/YY"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                maxLength={5}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvc">CVC</Label>
              <Input
                id="cvc"
                placeholder="123"
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
                maxLength={3}
              />
            </div>
          </div>
        </div>
      )}

      <Button 
        className="w-full" 
        onClick={handlePayment}
        disabled={isProcessing}
      >
        {isProcessing 
          ? "Processing..." 
          : paymentMethod === 'card' 
            ? `Pay $${amount.toFixed(2)}` 
            : "Confirm Booking"
        }
      </Button>
    </div>
  );
}

export default PaymentForm; 