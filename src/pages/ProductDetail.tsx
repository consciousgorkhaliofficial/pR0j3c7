import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, Wine, Minus, Plus } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import { products } from '@/data/products';
import { useCartStore } from '@/store/cartStore';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id);
  const addItem = useCartStore((s) => s.addItem);
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-heading text-2xl font-bold">Product Not Found</h1>
          <Link to="/shop" className="mt-4 inline-block text-primary underline">
            Back to Shop
          </Link>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image_url: product.image_url,
      });
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-10 md:py-16">
        <Link to="/shop" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary">
          <ArrowLeft className="h-4 w-4" /> Back to Shop
        </Link>

        <div className="grid gap-10 md:grid-cols-2">
          {/* Image */}
          <div className="overflow-hidden rounded-xl bg-muted">
            <img
              src={product.image_url}
              alt={product.name}
              className="h-full w-full object-cover"
              width={800}
              height={800}
            />
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">
              {product.fruit} Wine · {product.category}
            </span>
            <h1 className="mt-2 font-heading text-3xl font-bold md:text-4xl">{product.name}</h1>
            <p className="mt-4 leading-relaxed text-muted-foreground">{product.description}</p>

            <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><Wine className="h-4 w-4" /> {product.alcohol_percentage}% ABV</span>
              <span>{product.volume_ml}ml</span>
              <span className="capitalize">{product.category}</span>
            </div>

            <div className="mt-8 flex items-center gap-6">
              <span className="font-heading text-3xl font-bold text-primary">
                NPR {product.price.toLocaleString()}
              </span>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <div className="flex items-center rounded-lg border border-border">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-2 text-muted-foreground transition-colors hover:text-foreground">
                  <Minus className="h-4 w-4" />
                </button>
                <span className="min-w-[2rem] text-center font-medium">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="px-3 py-2 text-muted-foreground transition-colors hover:text-foreground">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <Button size="lg" onClick={handleAddToCart} className="gap-2 flex-1">
                <ShoppingCart className="h-4 w-4" /> Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
