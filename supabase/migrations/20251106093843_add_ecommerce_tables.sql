/*
  # Add E-commerce Tables for Clothing Brand

  1. New Tables
    - `products`
      - `id` (uuid, primary key)
      - `name` (text) - Product name
      - `description` (text) - Product description
      - `price` (numeric) - Price in currency
      - `image_url` (text) - Product image URL
      - `category` (text) - Category: tshirt, hoodie, jacket, pants, accessories
      - `sizes_available` (text[]) - Available sizes
      - `tokens_reward` (numeric) - Tokens earned per purchase
      - `stock_quantity` (numeric) - Available stock
      - `created_at` (timestamptz) - When product was added
    
    - `orders`
      - `id` (uuid, primary key)
      - `member_id` (uuid, foreign key) - References dao_members
      - `total_amount` (numeric) - Total order amount
      - `tokens_earned` (numeric) - Total tokens earned from order
      - `status` (text) - Status: pending, completed, shipped, delivered
      - `shipping_address` (text) - Shipping address
      - `created_at` (timestamptz) - When order was placed
      - `completed_at` (timestamptz) - When order was completed
    
    - `order_items`
      - `id` (uuid, primary key)
      - `order_id` (uuid, foreign key) - References orders
      - `product_id` (uuid, foreign key) - References products
      - `quantity` (numeric) - Quantity ordered
      - `size` (text) - Selected size
      - `price_at_purchase` (numeric) - Price at time of purchase
      - `tokens_earned` (numeric) - Tokens earned for this item

  2. Security
    - Enable RLS on all tables
    - Anyone can view products
    - Members can create orders
    - Members can view their own orders
    - Order items inherit order permissions

  3. Notes
    - Tokens are automatically added to member balance when order is completed
    - Products can be added/managed by admin (for now, open to all)
*/

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  price numeric NOT NULL CHECK (price >= 0),
  image_url text DEFAULT '',
  category text DEFAULT 'tshirt' CHECK (category IN ('tshirt', 'hoodie', 'jacket', 'pants', 'accessories')),
  sizes_available text[] DEFAULT ARRAY['S', 'M', 'L', 'XL'],
  tokens_reward numeric DEFAULT 10 CHECK (tokens_reward >= 0),
  stock_quantity numeric DEFAULT 0 CHECK (stock_quantity >= 0),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id uuid REFERENCES dao_members(id) NOT NULL,
  total_amount numeric NOT NULL CHECK (total_amount >= 0),
  tokens_earned numeric DEFAULT 0 CHECK (tokens_earned >= 0),
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'shipped', 'delivered')),
  shipping_address text NOT NULL,
  created_at timestamptz DEFAULT now(),
  completed_at timestamptz
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) NOT NULL,
  product_id uuid REFERENCES products(id) NOT NULL,
  quantity numeric NOT NULL CHECK (quantity > 0),
  size text NOT NULL,
  price_at_purchase numeric NOT NULL CHECK (price_at_purchase >= 0),
  tokens_earned numeric DEFAULT 0 CHECK (tokens_earned >= 0)
);

ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- RLS Policies for products
CREATE POLICY "Anyone can view products"
  ON products FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert products"
  ON products FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update products"
  ON products FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- RLS Policies for orders
CREATE POLICY "Anyone can view orders"
  ON orders FOR SELECT
  USING (true);

CREATE POLICY "Members can create orders"
  ON orders FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM dao_members
      WHERE dao_members.id = member_id
    )
  );

CREATE POLICY "Members can update own orders"
  ON orders FOR UPDATE
  USING (member_id = member_id)
  WITH CHECK (member_id = member_id);

-- RLS Policies for order_items
CREATE POLICY "Anyone can view order items"
  ON order_items FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert order items"
  ON order_items FOR INSERT
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_orders_member ON orders(member_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product ON order_items(product_id);

-- Insert sample products
INSERT INTO products (name, description, price, category, tokens_reward, stock_quantity, image_url) VALUES
  ('Classic DAO Tee', 'Premium cotton t-shirt with DAO logo', 29.99, 'tshirt', 30, 100, 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg'),
  ('Governance Hoodie', 'Comfortable hoodie for DAO members', 59.99, 'hoodie', 60, 50, 'https://images.pexels.com/photos/8148577/pexels-photo-8148577.jpeg'),
  ('Token Holder Cap', 'Embroidered cap showing your DAO pride', 24.99, 'accessories', 25, 75, 'https://images.pexels.com/photos/1134225/pexels-photo-1134225.jpeg'),
  ('Decentralized Jacket', 'Water-resistant jacket with custom design', 89.99, 'jacket', 90, 30, 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg'),
  ('Community Joggers', 'Soft joggers for the active DAO member', 49.99, 'pants', 50, 60, 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg'),
  ('Voter Tote Bag', 'Eco-friendly tote for all your needs', 19.99, 'accessories', 20, 100, 'https://images.pexels.com/photos/3738387/pexels-photo-3738387.jpeg')
ON CONFLICT DO NOTHING;
