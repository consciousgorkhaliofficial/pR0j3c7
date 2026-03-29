import { createClient } from '@supabase/supabase-js';

/*
  DATABASE SCHEMA — Create these tables in your Supabase dashboard:

  -- Products table
  CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    price NUMERIC(10,2) NOT NULL,
    category TEXT NOT NULL DEFAULT 'fruit-wine',
    image_url TEXT,
    fruit TEXT,
    alcohol_percentage NUMERIC(4,1),
    volume_ml INTEGER DEFAULT 750,
    in_stock BOOLEAN DEFAULT true,
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
  );

  -- Orders table
  CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    status TEXT DEFAULT 'pending',
    total NUMERIC(10,2) NOT NULL,
    shipping_name TEXT,
    shipping_address TEXT,
    shipping_city TEXT,
    shipping_phone TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
  );

  -- Order items table
  CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id),
    quantity INTEGER NOT NULL,
    price NUMERIC(10,2) NOT NULL
  );

  -- User roles (for admin)
  CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');
  CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    UNIQUE (user_id, role)
  );

  -- Enable RLS on all tables
  ALTER TABLE products ENABLE ROW LEVEL SECURITY;
  ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
  ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
  ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

  -- Products: public read, admin write
  CREATE POLICY "Public can read products" ON products FOR SELECT USING (true);

  -- Orders: users can read/insert their own
  CREATE POLICY "Users can read own orders" ON orders FOR SELECT USING (auth.uid() = user_id);
  CREATE POLICY "Users can insert own orders" ON orders FOR INSERT WITH CHECK (auth.uid() = user_id);

  -- Order items: users can read their own order items
  CREATE POLICY "Users can read own order items" ON order_items FOR SELECT
    USING (EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()));
  CREATE POLICY "Users can insert own order items" ON order_items FOR INSERT
    WITH CHECK (EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()));
*/

const supabaseUrl = 'https://fxmlpdaphrchhjwahahcp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4bWxwZGFwaHJjaGhqd2FoYWNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ2ODg1NDUsImV4cCI6MjA5MDI2NDU0NX0.Eb63A-LztSiSIRwFl-xOU3F5JjffUlF2CtdEMcuzS1Q';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
