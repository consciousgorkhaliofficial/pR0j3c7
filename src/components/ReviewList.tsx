import { Trash2, Loader2 } from 'lucide-react';
import StarRating from '@/components/StarRating';
import { useReviews, useAverageRating, useDeleteReview } from '@/hooks/useReviews';
import { useAuth } from '@/contexts/AuthContext';
import { formatDistanceToNow } from 'date-fns';

interface ReviewListProps {
  productId: string;
}

const ReviewList = ({ productId }: ReviewListProps) => {
  const { data: reviews, isLoading } = useReviews(productId);
  const { user } = useAuth();
  const { average, count } = useAverageRating(productId, reviews);
  const deleteReview = useDeleteReview(productId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-10">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      {/* Summary */}
      <div className="mb-6 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <StarRating rating={Math.round(average)} size="md" />
          <span className="font-heading text-xl font-bold">{average.toFixed(1)}</span>
        </div>
        <span className="text-sm text-muted-foreground">
          {count} {count === 1 ? 'review' : 'reviews'}
        </span>
      </div>

      {/* Rating distribution */}
      {count > 0 && (
        <div className="mb-8 space-y-1.5">
          {[5, 4, 3, 2, 1].map((star) => {
            const starCount = reviews?.filter((r) => r.rating === star).length || 0;
            const percent = count > 0 ? (starCount / count) * 100 : 0;
            return (
              <div key={star} className="flex items-center gap-2 text-sm">
                <span className="w-4 text-muted-foreground">{star}</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-gold transition-all"
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <span className="w-8 text-right text-xs text-muted-foreground">{starCount}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* Reviews list */}
      {!reviews || reviews.length === 0 ? (
        <p className="py-8 text-center text-sm text-muted-foreground">
          No reviews yet. Be the first to review this wine!
        </p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="rounded-lg border border-border bg-card p-5">
              <div className="flex items-start justify-between">
                <div>
                  <StarRating rating={review.rating} size="sm" />
                  {review.title && (
                    <h4 className="mt-2 font-heading font-semibold">{review.title}</h4>
                  )}
                </div>
                {user?.id === review.user_id && (
                  <button
                    onClick={() => deleteReview.mutate(review.id)}
                    disabled={deleteReview.isPending}
                    className="text-muted-foreground transition-colors hover:text-destructive"
                  >
                    {deleteReview.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </button>
                )}
              </div>
              {review.comment && (
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {review.comment}
                </p>
              )}
              <p className="mt-3 text-xs text-muted-foreground/60">
                {formatDistanceToNow(new Date(review.created_at), { addSuffix: true })}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewList;
