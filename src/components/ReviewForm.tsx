import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import StarRating from '@/components/StarRating';
import { useSubmitReview } from '@/hooks/useReviews';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';

interface ReviewFormProps {
  productId: string;
}

const ReviewForm = ({ productId }: ReviewFormProps) => {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [success, setSuccess] = useState(false);
  const submitReview = useSubmitReview(productId);

  if (!user) {
    return (
      <div className="rounded-lg border border-border bg-card p-6 text-center">
        <p className="text-sm text-muted-foreground">Sign in to leave a review</p>
        <Link to="/auth">
          <Button variant="outline" size="sm" className="mt-3">
            Sign In
          </Button>
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;
    await submitReview.mutateAsync({ rating, title, comment, userId: user.id });
    setSuccess(true);
    setRating(0);
    setTitle('');
    setComment('');
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border border-border bg-card p-6">
      <h3 className="mb-4 font-heading text-lg font-semibold">Write a Review</h3>

      {success && (
        <div className="mb-4 rounded-md bg-accent/20 p-3 text-sm text-accent-foreground">
          Review submitted successfully!
        </div>
      )}

      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium">Rating *</label>
        <StarRating rating={rating} onRate={setRating} size="lg" interactive />
        {rating === 0 && submitReview.isError && (
          <p className="mt-1 text-xs text-destructive">Please select a rating</p>
        )}
      </div>

      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium">Title</label>
        <Input
          placeholder="Summarize your experience"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium">Comment</label>
        <Textarea
          placeholder="Tell us more about your experience..."
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>

      <Button type="submit" disabled={rating === 0 || submitReview.isPending}>
        {submitReview.isPending ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : null}
        Submit Review
      </Button>

      {submitReview.isError && (
        <p className="mt-2 text-xs text-destructive">
          {(submitReview.error as Error).message}
        </p>
      )}
    </form>
  );
};

export default ReviewForm;
