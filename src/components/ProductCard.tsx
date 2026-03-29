import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cartStore';
import type { Product } from '@/data/products';

const ProductCard = ({ product }: { product: Product }) => {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <div className="group animate-fade-up overflow-hidden rounded-lg border border-border bg-card transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <Link to={`/product/${product.id}`} className="block overflow-hidden">
        <div className="aspect-square overflow-hidden bg-muted">
          <img
            src={product.image_url}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      </Link>
      <div className="p-4">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-accent">
          {product.fruit} Wine
        </span>
        <Link to={`/product/${product.id}`}>
          <h3 className="mt-1 font-heading text-lg font-semibold text-foreground transition-colors hover:text-primary">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
          {product.description}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <span className="font-heading text-lg font-bold text-primary">
            NPR {product.price.toLocaleString()}
          </span>
          <Button
            size="sm"
            onClick={() =>
              addItem({
                id: product.id,
                name: product.name,
                price: product.price,
                image_url: product.image_url,
              })
            }
            className="gap-1"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
