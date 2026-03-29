import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Leaf, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import { useFeaturedProducts } from '@/hooks/useProducts';
import heroImage from '@/assets/hero-wine.jpg';

const heroSlides = [
  {
    title: 'The Royal Taste of Nepal',
    subtitle: 'Premium fruit wines crafted from the finest Himalayan fruits',
    cta: 'Explore Collection',
  },
  {
    title: 'Nature\'s Finest Flavors',
    subtitle: 'From plum to rhododendron — every sip tells a story',
    cta: 'Shop Now',
  },
  {
    title: 'Handcrafted Excellence',
    subtitle: 'Small-batch wines made with generations of expertise',
    cta: 'Discover More',
  },
];

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { data: featured = [], isLoading } = useFeaturedProducts();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden md:h-[85vh]">
        <img
          src={heroImage}
          alt="Royal Big Master premium fruit wines"
          className="absolute inset-0 h-full w-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
        <div className="container relative mx-auto flex h-full items-center px-4">
          <div key={currentSlide} className="max-w-xl animate-fade-up">
            <span className="mb-4 inline-block rounded-full border border-gold/40 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-gold">
              Royal Big Master
            </span>
            <h1 className="font-heading text-4xl font-bold leading-tight text-primary-foreground md:text-6xl">
              {heroSlides[currentSlide].title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-primary-foreground/80 md:text-xl">
              {heroSlides[currentSlide].subtitle}
            </p>
            <div className="mt-8 flex gap-4">
              <Link to="/shop">
                <Button size="lg" className="gap-2 font-semibold">
                  {heroSlides[currentSlide].cta}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-2 rounded-full transition-all ${
                i === currentSlide ? 'w-8 bg-gold' : 'w-2 bg-primary-foreground/40'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="border-b border-border bg-secondary/50 py-12">
        <div className="container mx-auto grid gap-8 px-4 md:grid-cols-3">
          {[
            { icon: Leaf, title: 'Natural Ingredients', desc: '100% organic Nepali fruits' },
            { icon: Award, title: 'Award Winning', desc: 'Recognized for quality & taste' },
            { icon: Star, title: 'Handcrafted', desc: 'Small-batch artisan process' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-center gap-4 text-center md:flex-col">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 md:h-14 md:w-14">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <div className="text-left md:text-center">
                <h3 className="font-heading font-semibold">{title}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">Our Selection</span>
            <h2 className="mt-2 font-heading text-3xl font-bold md:text-4xl">Featured Wines</h2>
            <p className="mx-auto mt-3 max-w-md text-muted-foreground">
              Handpicked favorites from our royal collection
            </p>
          </div>
          {isLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[1,2,3,4].map(i => (
                <div key={i} className="h-80 animate-pulse rounded-lg bg-muted" />
              ))}
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featured.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
          <div className="mt-10 text-center">
            <Link to="/shop">
              <Button variant="outline" size="lg" className="gap-2">
                View All Wines <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="wine-gradient py-16 text-center text-primary-foreground md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold md:text-4xl">Experience the Royal Taste</h2>
          <p className="mx-auto mt-4 max-w-lg text-lg opacity-80">
            From the heart of Nepal to your glass. Discover our full range of premium fruit wines.
          </p>
          <Link to="/shop">
            <Button size="lg" className="mt-8 bg-gold text-accent-foreground hover:bg-gold-light">
              Shop Now
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
