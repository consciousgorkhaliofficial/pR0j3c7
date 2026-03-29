import { Mountain, Grape, Heart, Users } from 'lucide-react';
import Layout from '@/components/Layout';

const About = () => (
  <Layout>
    <div className="container mx-auto px-4 py-10 md:py-16">
      {/* Hero */}
      <div className="mb-16 text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-accent">Our Story</span>
        <h1 className="mt-2 font-heading text-3xl font-bold md:text-5xl">About Royal Big Master</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Born in the heart of Nepal, Royal Big Master brings together traditional winemaking wisdom
          and the extraordinary fruits of the Himalayas to create truly unique fruit wines.
        </p>
      </div>

      {/* Values */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: Mountain, title: 'Himalayan Heritage', desc: 'Our fruits are sourced from the pristine hills and valleys of Nepal, where clean air and rich soil nurture exceptional flavors.' },
          { icon: Grape, title: 'Artisan Process', desc: 'Each batch is carefully fermented using traditional techniques passed down through generations of Nepali winemakers.' },
          { icon: Heart, title: 'Passion & Care', desc: 'Every bottle represents our dedication to quality, from hand-selecting fruits to the final cork.' },
          { icon: Users, title: 'Community First', desc: 'We work directly with local farmers, supporting communities and ensuring fair prices for their exceptional produce.' },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="rounded-lg border border-border bg-card p-6 text-center transition-shadow hover:shadow-lg">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-heading text-lg font-semibold">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
          </div>
        ))}
      </div>

      {/* Story */}
      <div className="mt-16 rounded-xl wine-gradient p-8 text-center text-primary-foreground md:p-12">
        <h2 className="font-heading text-2xl font-bold md:text-3xl">From Our Orchards to Your Glass</h2>
        <p className="mx-auto mt-4 max-w-2xl leading-relaxed opacity-80">
          Royal Big Master was founded with a simple mission: to share the incredible taste of Nepali
          fruits with the world. Our wines celebrate the diverse flavors of Nepal — from the tangy plums
          of Jumla to the sweet mangoes of the Terai, from the wild berries of the Annapurna range to
          the iconic rhododendrons of our national flower. Each bottle is a journey through Nepal's
          rich natural heritage.
        </p>
      </div>
    </div>
  </Layout>
);

export default About;
