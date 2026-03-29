import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export interface Review {
  id: string;
  product_id: string;
  user_id: string;
  rating: number;
  title: string | null;
  comment: string | null;
  created_at: string;
  user_email?: string;
}

export const useReviews = (productId: string) => {
  return useQuery({
    queryKey: ['reviews', productId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('product_id', productId)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as Review[];
    },
    enabled: !!productId,
  });
};

export const useAverageRating = (productId: string, reviews: Review[] | undefined) => {
  if (!reviews || reviews.length === 0) return { average: 0, count: 0 };
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  return { average: sum / reviews.length, count: reviews.length };
};

export const useSubmitReview = (productId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      rating,
      title,
      comment,
      userId,
    }: {
      rating: number;
      title: string;
      comment: string;
      userId: string;
    }) => {
      const { error } = await supabase.from('reviews').upsert(
        {
          product_id: productId,
          user_id: userId,
          rating,
          title: title || null,
          comment: comment || null,
        },
        { onConflict: 'product_id,user_id' }
      );
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', productId] });
    },
  });
};

export const useDeleteReview = (productId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (reviewId: string) => {
      const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', reviewId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', productId] });
    },
  });
};
