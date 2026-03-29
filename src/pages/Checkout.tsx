import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Layout from '@/components/Layout';
import { useCartStore } from '@/store/cartStore';
import { useAuth } from '@/contexts/AuthContext';

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCartStore();
  const { user, loading } = useAuth();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', address: '', city: '', phone: '', email: '' });

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center text-muted-foreground">Loading...</div>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout>
        <div className="container mx-auto flex flex-col items-center px-4 py-20 text-center">
          <LogIn className="mb-4 h-12 w-12 text-muted-foreground/50" />
          <h1 className="font-heading text-2xl font-bold">Sign In Required</h1>
          <p className="mt-2 text-muted-foreground">Please sign in to proceed with checkout.</p>
          <Link to="/auth">
            <Button className="mt-6 gap-2">
              <LogIn className="h-4 w-4" /> Sign In
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  if (submitted) {
    return (
      <Layout>
        <div className="container mx-auto flex flex-col items-center px-4 py-20 text-center">
          <CheckCircle className="mb-4 h-16 w-16 text-accent" />
          <h1 className="font-heading text-3xl font-bold">Order Placed!</h1>
          <p className="mt-2 text-muted-foreground">Thank you for your order. We'll contact you shortly.</p>
          <Link to="/shop"><Button className="mt-6">Continue Shopping</Button></Link>
        </div>
      </Layout>
    );
  }

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-heading text-2xl font-bold">No items in cart</h1>
          <Link to="/shop" className="mt-4 inline-block text-primary underline">Browse Wines</Link>
        </div>
      </Layout>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearCart();
    setSubmitted(true);
  };

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  return (
    <Layout>
      <div className="container mx-auto px-4 py-10 md:py-16">
        <h1 className="mb-8 font-heading text-3xl font-bold">Checkout</h1>
        <div className="grid gap-10 lg:grid-cols-3">
          <form onSubmit={handleSubmit} className="space-y-4 lg:col-span-2">
            <h2 className="font-heading text-xl font-semibold">Shipping Details</h2>
            <Input placeholder="Full Name" required value={form.name} onChange={update('name')} />
            <Input placeholder="Address" required value={form.address} onChange={update('address')} />
            <div className="grid gap-4 md:grid-cols-2">
              <Input placeholder="City" required value={form.city} onChange={update('city')} />
              <Input placeholder="Phone" required value={form.phone} onChange={update('phone')} />
            </div>
            <Input placeholder="Email" type="email" required value={form.email} onChange={update('email')} />
            <Button type="submit" size="lg" className="w-full">Place Order</Button>
          </form>

          <div className="h-fit rounded-lg border border-border bg-card p-6">
            <h3 className="font-heading text-lg font-semibold">Order Summary</h3>
            <div className="mt-4 space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.name} × {item.quantity}</span>
                  <span>NPR {(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 border-t border-border pt-4 flex justify-between font-heading font-bold text-lg">
              <span>Total</span>
              <span className="text-primary">NPR {totalPrice().toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
