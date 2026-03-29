import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, Wine, User, LogOut, ShieldCheck } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useAuth } from '@/contexts/AuthContext';
import { useIsAdmin } from '@/hooks/useAdmin';
import { Button } from '@/components/ui/button';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const totalItems = useCartStore((s) => s.totalItems());
  const { user, signOut } = useAuth();
  const { data: isAdmin } = useIsAdmin();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-border/50 bg-background/95 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <Wine className="h-7 w-7 text-primary" />
          <div className="flex flex-col leading-tight">
            <span className="font-heading text-lg font-bold tracking-wide text-foreground md:text-xl">
              Royal Big Master
            </span>
            <span className="hidden text-[10px] tracking-[0.25em] text-muted-foreground md:block">
              FRUIT WINES OF NEPAL
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-sm font-medium tracking-wide transition-colors hover:text-primary ${
                location.pathname === l.to ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Right side: Auth + Cart + Mobile */}
        <div className="flex items-center gap-2">
          {/* Auth buttons - desktop */}
          <div className="hidden items-center gap-2 md:flex">
            {user ? (
              <>
                <span className="max-w-[120px] truncate text-xs text-muted-foreground">
                  {user.email}
                </span>
                <Button variant="ghost" size="sm" onClick={handleSignOut} className="gap-1 text-xs">
                  <LogOut className="h-3.5 w-3.5" /> Logout
                </Button>
              </>
            ) : (
              <Link to="/auth">
                <Button variant="outline" size="sm" className="gap-1 text-xs">
                  <User className="h-3.5 w-3.5" /> Sign In
                </Button>
              </Link>
            )}
          </div>

          <Link to="/cart" className="relative">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="animate-fade-in border-t border-border bg-background px-4 pb-4 md:hidden">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setMobileOpen(false)}
              className={`block py-3 text-sm font-medium transition-colors ${
                location.pathname === l.to ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              {l.label}
            </Link>
          ))}
          <div className="border-t border-border pt-3">
            {user ? (
              <div className="flex items-center justify-between">
                <span className="truncate text-xs text-muted-foreground">{user.email}</span>
                <Button variant="ghost" size="sm" onClick={() => { handleSignOut(); setMobileOpen(false); }} className="gap-1 text-xs">
                  <LogOut className="h-3.5 w-3.5" /> Logout
                </Button>
              </div>
            ) : (
              <Link to="/auth" onClick={() => setMobileOpen(false)} className="block py-3 text-sm font-medium text-primary">
                Sign In / Sign Up
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
