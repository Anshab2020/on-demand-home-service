import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Star } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface ReviewFormProps {
  booking: any;
  onClose: () => void;
  isOpen: boolean;
}

const ReviewForm = ({ booking, onClose, isOpen }: ReviewFormProps) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const { toast } = useToast();

  const handleSubmitReview = () => {
    if (rating === 0) {
      toast({
        title: "Rating Required",
        description: "Please select a rating before submitting",
        variant: "destructive",
      });
      return;
    }

    // Get existing reviews
    const existingReviews = JSON.parse(localStorage.getItem('reviews') || '[]');
    
    // Create new review
    const review = {
      id: Date.now().toString(),
      bookingId: booking.id,
      providerId: booking.providerId,
      userId: booking.userId,
      rating,
      comment,
      serviceTitle: booking.serviceTitle,
      date: new Date().toISOString(),
    };

    // Save review
    localStorage.setItem('reviews', JSON.stringify([...existingReviews, review]));

    // Update booking to mark as reviewed
    const allBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const updatedBookings = allBookings.map(b => 
      b.id === booking.id ? { ...b, reviewed: true } : b
    );
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));

    toast({
      title: "Review Submitted",
      description: "Thank you for your feedback!",
    });

    setRating(0);
    setComment('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Write a Review</DialogTitle>
          <DialogDescription>
            Share your experience with {booking.providerName} for {booking.serviceTitle}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Star Rating */}
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="focus:outline-none"
              >
                <Star
                  className={`w-8 h-8 ${
                    star <= rating
                      ? 'text-yellow-500 fill-yellow-500'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Review Comment */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Your Review</label>
            <Textarea
              placeholder="Share your experience..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
            />
          </div>

          {/* Submit Button */}
          <Button 
            onClick={handleSubmitReview}
            className="w-full"
          >
            Submit Review
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewForm; 