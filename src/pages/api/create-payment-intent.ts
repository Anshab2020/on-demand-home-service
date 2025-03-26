import Stripe from 'stripe';

// Replace with your Stripe secret key
const stripe = new Stripe('your_secret_key');

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { amount, serviceTitle } = req.body;

    // Create a payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe expects amounts in cents
      currency: 'usd',
      metadata: {
        serviceTitle,
      },
    });

    // Send the client secret to the client
    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({
      message: 'Error creating payment intent',
    });
  }
} 