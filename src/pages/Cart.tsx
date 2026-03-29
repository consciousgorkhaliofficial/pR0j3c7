import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import { useCartStore } from '@/store/cartStore';

const Cart = () => {
  const { items, removeItem, updateQuantity, clearCart, totalPrice } = useCartStore();

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto flex flex-col items-center px-4 py-20 text-center">
          <ShoppingBag className="mb-4 h-16 w-16 text-muted-foreground/40" />
          <h1 className="font-heading text-2xl font-bold">Your Cart is Empty</h1>
          <p className="mt-2 text-muted-foreground">Add some royal wines to get started!</p>
          <Link to="/shop">
            <Button className="mt-6 gap-2">
              Browse Wines <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-10 md:py-16">
        <h1 className="mb-8 font-heading text-3xl font-bold">Shopping Cart</h1>

        <div className="grid gap-10 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="space-y-4 lg:col-span-2">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4 rounded-lg border border-border bg-card p-4">
                <img src={item.image_url} alt={item.name} className="h-24 w-24 rounded-md object-cover" />
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <h3 className="font-heading font-semibold">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">NPR {item.price.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center rounded-md border border-border">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 py-1 text-muted-foreground hover:text-foreground">
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="min-w-[1.5rem] text-center text-sm">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 text-muted-foreground hover:text-foreground">
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-heading font-semibold">
                        NPR {(item.price * item.quantity).toLocaleString()}
                      </span>
                      <button onClick={() => removeItem(item.id)} className="text-muted-foreground transition-colors hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <button onClick={clearCart} className="text-sm text-muted-foreground underline hover:text-destructive">
              Clear Cart
            </button>
          </div>

          {/* Summary */}
          <div className="h-fit rounded-lg border border-border bg-card p-6">
            <h3 className="font-heading text-lg font-semibold">Order Summary</h3>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>NPR {totalPrice().toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-accent">Free</span>
              </div>
            </div>
            <div className="mt-4 border-t border-border pt-4">
              <div className="flex justify-between font-heading text-lg font-bold">
                <span>Total</span>
                <span className="text-primary">NPR {totalPrice().toLocaleString()}</span>
              </div>
            </div>
            <Link to="/checkout">
              <Button className="mt-6 w-full gap-2" size="lg">
                Proceed to Checkout <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
