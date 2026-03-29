import { useState } from 'react';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Layout from '@/components/Layout';

const Contact = () => {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-10 md:py-16">
        <div className="mb-12 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">Get in Touch</span>
          <h1 className="mt-2 font-heading text-3xl font-bold md:text-4xl">Contact Us</h1>
          <p className="mt-2 text-muted-foreground">We'd love to hear from you</p>
        </div>

        <div className="grid gap-10 md:grid-cols-2">
          {/* Contact Info */}
          <div className="space-y-6">
            <div>
              <h2 className="font-heading text-xl font-semibold">Royal Big Master</h2>
              <p className="mt-2 text-muted-foreground">Premium fruit wines from the heart of Nepal.</p>
            </div>
            {[
              { icon: MapPin, label: 'Address', value: 'Kathmandu, Nepal' },
              { icon: Phone, label: 'Phone', value: '+977 1-4XXXXXX' },
              { icon: Mail, label: 'Email', value: 'info@royalbigmaster.com' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">{label}</p>
                  <p className="text-sm text-muted-foreground">{value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          {sent ? (
            <div className="flex items-center justify-center rounded-lg border border-border bg-card p-8 text-center">
              <div>
                <Send className="mx-auto mb-4 h-10 w-10 text-primary" />
                <h3 className="font-heading text-lg font-semibold">Message Sent!</h3>
                <p className="mt-2 text-sm text-muted-foreground">We'll get back to you soon.</p>
                <Button variant="outline" className="mt-4" onClick={() => setSent(false)}>
                  Send Another
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-border bg-card p-6">
              <div className="grid gap-4 md:grid-cols-2">
                <Input placeholder="Name" required />
                <Input placeholder="Email" type="email" required />
              </div>
              <Input placeholder="Subject" required />
              <Textarea placeholder="Your message..." rows={5} required />
              <Button type="submit" className="w-full gap-2">
                <Send className="h-4 w-4" /> Send Message
              </Button>
            </form>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
