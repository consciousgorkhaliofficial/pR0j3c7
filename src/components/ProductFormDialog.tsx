import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import type { Product } from '@/hooks/useProducts';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  price: z.coerce.number().min(0.01, 'Price must be positive'),
  category: z.string().min(1),
  image_url: z.string().optional(),
  fruit: z.string().optional(),
  alcohol_percentage: z.coerce.number().min(0).max(100).optional().or(z.literal('')),
  volume_ml: z.coerce.number().int().min(1).optional().or(z.literal('')),
  in_stock: z.boolean(),
  featured: z.boolean(),
});

type FormValues = z.infer<typeof schema>;

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product?: Product | null;
  onSubmit: (values: any) => void;
  isPending: boolean;
}

const ProductFormDialog = ({ open, onOpenChange, product, onSubmit, isPending }: Props) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      category: 'red',
      image_url: '',
      fruit: '',
      alcohol_percentage: '',
      volume_ml: 750,
      in_stock: true,
      featured: false,
    },
  });

  useEffect(() => {
    if (product) {
      form.reset({
        name: product.name,
        description: product.description || '',
        price: product.price,
        category: product.category,
        image_url: product.image_url || '',
        fruit: product.fruit || '',
        alcohol_percentage: product.alcohol_percentage ?? '',
        volume_ml: product.volume_ml ?? 750,
        in_stock: product.in_stock ?? true,
        featured: product.featured ?? false,
      });
    } else {
      form.reset({
        name: '',
        description: '',
        price: 0,
        category: 'red',
        image_url: '',
        fruit: '',
        alcohol_percentage: '',
        volume_ml: 750,
        in_stock: true,
        featured: false,
      });
    }
  }, [product, open]);

  const handleSubmit = (values: FormValues) => {
    const cleaned = {
      ...values,
      alcohol_percentage: values.alcohol_percentage === '' ? null : Number(values.alcohol_percentage),
      volume_ml: values.volume_ml === '' ? null : Number(values.volume_ml),
      description: values.description || null,
      image_url: values.image_url || null,
      fruit: values.fruit || null,
    };
    if (product) {
      onSubmit({ id: product.id, ...cleaned });
    } else {
      onSubmit(cleaned);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl">
            {product ? 'Edit Product' : 'Add New Product'}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl><Input {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="description" render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl><Textarea rows={3} {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <div className="grid grid-cols-2 gap-4">
              <FormField control={form.control} name="price" render={({ field }) => (
                <FormItem>
                  <FormLabel>Price (NPR)</FormLabel>
                  <FormControl><Input type="number" step="0.01" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="category" render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                    <SelectContent>
                      <SelectItem value="red">Red Wine</SelectItem>
                      <SelectItem value="white">White Wine</SelectItem>
                      <SelectItem value="rosé">Rosé Wine</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
            <FormField control={form.control} name="image_url" render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl><Input {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="fruit" render={({ field }) => (
              <FormItem>
                <FormLabel>Fruit</FormLabel>
                <FormControl><Input placeholder="e.g. Grape, Apple" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <div className="grid grid-cols-2 gap-4">
              <FormField control={form.control} name="alcohol_percentage" render={({ field }) => (
                <FormItem>
                  <FormLabel>Alcohol %</FormLabel>
                  <FormControl><Input type="number" step="0.1" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="volume_ml" render={({ field }) => (
                <FormItem>
                  <FormLabel>Volume (ml)</FormLabel>
                  <FormControl><Input type="number" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
            <div className="flex gap-6">
              <FormField control={form.control} name="in_stock" render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                  <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                  <FormLabel className="!mt-0">In Stock</FormLabel>
                </FormItem>
              )} />
              <FormField control={form.control} name="featured" render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                  <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                  <FormLabel className="!mt-0">Featured</FormLabel>
                </FormItem>
              )} />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? 'Saving...' : product ? 'Update Product' : 'Add Product'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductFormDialog;
