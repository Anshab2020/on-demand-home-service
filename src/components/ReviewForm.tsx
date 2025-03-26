import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Star } from 'lucide-react';

interface ReviewFormProps {
  providerEmail: string;
  onSuccess: () => void;
}

const ReviewForm = ({ providerEmail, onSuccess }: ReviewFormProps) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (rating === 0) {
      toast({
        title: "Rating Required",
        description: "Please select a rating before submitting.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Get existing reviews from localStorage
    const existingReviews = JSON.parse(localStorage.getItem('reviews') || '[]');
    
    // Create new review
    const review = {
      id: Date.now().toString(),
      providerEmail,
      rating,
      comment,
      date: new Date().toISOString(),
    };

    // Save to localStorage
    localStorage.setItem('reviews', JSON.stringify([...existingReviews, review]));

    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: "Review Submitted",
      description: "Thank you for your feedback!",
    });

    setIsSubmitting(false);
    setRating(0);
    setComment('');
    onSuccess();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setRating(value)}
            className="focus:outline-none"
          >
            <Star
              className={`w-6 h-6 ${
                value <= rating
                  ? 'text-yellow-500 fill-yellow-500'
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>

      <Textarea
        placeholder="Share your experience with this service provider..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="min-h-[100px]"
      />

      <Button 
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? "Submitting..." : "Submit Review"}
      </Button>
    </div>
  );
};

export default ReviewForm; 