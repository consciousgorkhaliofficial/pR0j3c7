import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import { products, categories } from '@/data/products';

const Shop = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('name');

  const filtered = useMemo(() => {
    let result = products.filter((p) => {
      const matchesCategory = category === 'all' || p.category === category;
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.fruit.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    if (sort === 'price-asc') result.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') result.sort((a, b) => b.price - a.price);
    else result.sort((a, b) => a.name.localeCompare(b.name));
    return result;
  }, [search, category, sort]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-10 md:py-16">
        <div className="mb-8 text-center">
          <h1 className="font-heading text-3xl font-bold md:text-4xl">Our Wine Collection</h1>
          <p className="mt-2 text-muted-foreground">Explore premium fruit wines from Nepal</p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative max-w-sm flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search wines..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-3">
            <div className="flex gap-1 overflow-x-auto rounded-lg border border-border bg-secondary p-1">
              {categories.map((c) => (
                <button
                  key={c.value}
                  onClick={() => setCategory(c.value)}
                  className={`whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                    category === c.value
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-lg border border-border bg-secondary px-3 py-1.5 text-xs font-medium text-foreground"
            >
              <option value="name">Name</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
            </select>
          </div>
        </div>

        {/* Products */}
        {filtered.length === 0 ? (
          <div className="py-20 text-center text-muted-foreground">
            No wines found matching your criteria.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Shop;
