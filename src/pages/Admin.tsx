import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { useProducts, type Product } from '@/hooks/useProducts';
import { useIsAdmin, useCreateProduct, useUpdateProduct, useDeleteProduct } from '@/hooks/useAdmin';
import ProductFormDialog from '@/components/ProductFormDialog';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Plus, Pencil, Trash2, ShieldCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Admin = () => {
  const { user, loading: authLoading } = useAuth();
  const { data: isAdmin, isLoading: roleLoading } = useIsAdmin();
  const { data: products, isLoading: productsLoading } = useProducts();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();
  const { toast } = useToast();

  const [formOpen, setFormOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  if (authLoading || roleLoading) {
    return (
      <Layout>
        <div className="flex min-h-[60vh] items-center justify-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </Layout>
    );
  }

  if (!user) return <Navigate to="/auth" replace />;
  if (!isAdmin) {
    return (
      <Layout>
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
          <ShieldCheck className="h-16 w-16 text-muted-foreground" />
          <h1 className="font-heading text-2xl font-bold">Access Denied</h1>
          <p className="text-muted-foreground">You don't have admin privileges.</p>
        </div>
      </Layout>
    );
  }

  const handleAdd = () => {
    setEditProduct(null);
    setFormOpen(true);
  };

  const handleEdit = (product: Product) => {
    setEditProduct(product);
    setFormOpen(true);
  };

  const handleSubmit = async (values: any) => {
    try {
      if (values.id) {
        await updateProduct.mutateAsync(values);
        toast({ title: 'Product updated successfully' });
      } else {
        await createProduct.mutateAsync(values);
        toast({ title: 'Product added successfully' });
      }
      setFormOpen(false);
    } catch (e: any) {
      toast({ title: 'Error', description: e.message, variant: 'destructive' });
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteProduct.mutateAsync(deleteId);
      toast({ title: 'Product deleted' });
    } catch (e: any) {
      toast({ title: 'Error', description: e.message, variant: 'destructive' });
    }
    setDeleteId(null);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your product catalog</p>
          </div>
          <Button onClick={handleAdd} className="gap-2">
            <Plus className="h-4 w-4" /> Add Product
          </Button>
        </div>

        {productsLoading ? (
          <p className="text-center text-muted-foreground py-12">Loading products...</p>
        ) : (
          <div className="rounded-lg border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead className="hidden sm:table-cell">Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="hidden md:table-cell">Stock</TableHead>
                  <TableHead className="hidden md:table-cell">Featured</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products?.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {product.image_url && (
                          <img
                            src={product.image_url}
                            alt={product.name}
                            className="h-10 w-10 rounded object-cover"
                          />
                        )}
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-xs text-muted-foreground line-clamp-1 sm:hidden">
                            {product.category}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell capitalize">{product.category}</TableCell>
                    <TableCell>NPR {product.price}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant={product.in_stock ? 'default' : 'destructive'}>
                        {product.in_stock ? 'In Stock' : 'Out'}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {product.featured && <Badge variant="secondary">Featured</Badge>}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button size="icon" variant="ghost" onClick={() => handleEdit(product)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost" onClick={() => setDeleteId(product.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      <ProductFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        product={editProduct}
        onSubmit={handleSubmit}
        isPending={createProduct.isPending || updateProduct.isPending}
      />

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Product</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the product.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
};

export default Admin;
