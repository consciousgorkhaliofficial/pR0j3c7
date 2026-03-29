import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Wine, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (isLogin) {
      const { error } = await signIn(email, password);
      if (error) {
        setError(error.message);
      } else {
        navigate('/');
      }
    } else {
      if (password.length < 6) {
        setError('Password must be at least 6 characters');
        setLoading(false);
        return;
      }
      const { error } = await signUp(email, password);
      if (error) {
        setError(error.message);
      } else {
        setSignUpSuccess(true);
      }
    }
    setLoading(false);
  };

  if (signUpSuccess) {
    return (
      <Layout>
        <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-4">
          <div className="w-full max-w-md rounded-xl border border-border bg-card p-8 text-center">
            <Mail className="mx-auto mb-4 h-12 w-12 text-primary" />
            <h2 className="font-heading text-2xl font-bold">Check Your Email</h2>
            <p className="mt-3 text-muted-foreground">
              We've sent a confirmation link to <strong className="text-foreground">{email}</strong>.
              Please verify your email to complete sign up.
            </p>
            <Button variant="outline" className="mt-6" onClick={() => { setSignUpSuccess(false); setIsLogin(true); }}>
              Back to Login
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-8 text-center">
            <Wine className="mx-auto mb-3 h-10 w-10 text-primary" />
            <h1 className="font-heading text-3xl font-bold">
              {isLogin ? 'Welcome Back' : 'Join Royal Big Master'}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {isLogin ? 'Sign in to your account' : 'Create an account to get started'}
            </p>
          </div>

          {/* Tabs */}
          <div className="mb-6 flex rounded-lg border border-border bg-secondary p-1">
            <button
              onClick={() => { setIsLogin(true); setError(''); }}
              className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${
                isLogin ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setIsLogin(false); setError(''); }}
              className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${
                !isLogin ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-border bg-card p-6">
            {error && (
              <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="you@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="password"
                  placeholder={isLogin ? '••••••••' : 'Min. 6 characters'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Button type="submit" className="w-full gap-2" size="lg" disabled={loading}>
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  {isLogin ? 'Sign In' : 'Create Account'}
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            By continuing, you confirm you are 18+ and agree to our terms.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Auth;
