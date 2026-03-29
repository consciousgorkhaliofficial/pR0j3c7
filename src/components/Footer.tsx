import { Link } from 'react-router-dom';
import { Wine, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => (
  <footer className="wine-gradient mt-auto text-primary-foreground">
    <div className="container mx-auto px-4 py-12">
      <div className="grid gap-8 md:grid-cols-3">
        <div>
          <div className="mb-4 flex items-center gap-2">
            <Wine className="h-6 w-6" />
            <span className="font-heading text-lg font-bold">Royal Big Master</span>
          </div>
          <p className="text-sm leading-relaxed opacity-80">
            Crafting premium fruit wines from the finest Nepali fruits since generations. Experience the royal taste of the Himalayas.
          </p>
        </div>
        <div>
          <h4 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wider">Quick Links</h4>
          <div className="flex flex-col gap-2">
            {[{ to: '/shop', label: 'Shop' }, { to: '/about', label: 'About Us' }, { to: '/contact', label: 'Contact' }].map((l) => (
              <Link key={l.to} to={l.to} className="text-sm opacity-80 transition-opacity hover:opacity-100">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wider">Contact</h4>
          <div className="flex flex-col gap-3 text-sm opacity-80">
            <span className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Kathmandu, Nepal</span>
            <span className="flex items-center gap-2"><Phone className="h-4 w-4" /> +977 1-4XXXXXX</span>
            <span className="flex items-center gap-2"><Mail className="h-4 w-4" /> info@royalbigmaster.com</span>
          </div>
        </div>
      </div>
      <div className="mt-10 border-t border-primary-foreground/20 pt-6 text-center text-xs opacity-60">
        © {new Date().getFullYear()} Royal Big Master. All rights reserved. | Must be 18+ to purchase.
      </div>
    </div>
  </footer>
);

export default Footer;
