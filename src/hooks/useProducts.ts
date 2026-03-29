import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: string;
  image_url: string | null;
  fruit: string | null;
  alcohol_percentage: number | null;
  volume_ml: number | null;
  in_stock: boolean | null;
  featured: boolean | null;
};

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('name');
      if (error) throw error;
      return data as Product[];
    },
  });
};

export const useFeaturedProducts = () => {
  return useQuery({
    queryKey: ['products', 'featured'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('featured', true)
        .order('name');
      if (error) throw error;
      return data as Product[];
    },
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ['products', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .maybeSingle();
      if (error) throw error;
      return data as Product | null;
    },
    enabled: !!id,
  });
};

export const categories = [
  { value: 'all', label: 'All Wines' },
  { value: 'red', label: 'Red Wines' },
  { value: 'white', label: 'White Wines' },
  { value: 'rosé', label: 'Rosé Wines' },
];
