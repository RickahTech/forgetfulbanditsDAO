import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://0ec90b57d6e95fcbda19832f.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJib2x0IiwicmVmIjoiMGVjOTBiNTdkNmU5NWZjYmRhMTk4MzJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4ODE1NzQsImV4cCI6MTc1ODg4MTU3NH0.9I8-U0x86Ak8t2DGaIk0HfvTSLsAyzdnz-Nw00mMkKw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type DAOMember = {
  id: string;
  wallet_address: string;
  token_balance: number;
  joined_at: string;
  name: string;
  email: string;
};

export type Proposal = {
  id: string;
  title: string;
  description: string;
  proposer_id: string;
  status: 'draft' | 'active' | 'passed' | 'rejected' | 'executed';
  votes_for: number;
  votes_against: number;
  voting_ends_at: string;
  created_at: string;
  executed_at: string | null;
};

export type Vote = {
  id: string;
  proposal_id: string;
  member_id: string;
  vote_choice: 'for' | 'against' | 'abstain';
  token_weight: number;
  voted_at: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: 'tshirt' | 'hoodie' | 'jacket' | 'pants' | 'accessories';
  sizes_available: string[];
  tokens_reward: number;
  stock_quantity: number;
  created_at: string;
};

export type Order = {
  id: string;
  member_id: string;
  total_amount: number;
  tokens_earned: number;
  status: 'pending' | 'completed' | 'shipped' | 'delivered';
  shipping_address: string;
  created_at: string;
  completed_at: string | null;
};

export type OrderItem = {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  size: string;
  price_at_purchase: number;
  tokens_earned: number;
};

export type CartItem = {
  product: Product;
  quantity: number;
  size: string;
};
