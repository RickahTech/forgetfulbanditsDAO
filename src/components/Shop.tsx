import { useState, useEffect } from 'react';
import { supabase, type Product, type DAOMember, type CartItem } from '../lib/supabase';
import { ProductCard } from './ProductCard';
import { ShoppingCart } from './ShoppingCart';
import { ShoppingBag, Filter } from 'lucide-react';

interface ShopProps {
  currentMember: DAOMember | null;
}

export function Shop({ currentMember }: ShopProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showCart, setShowCart] = useState(false);
  const [loading, setLoading] = useState(true);

  const categories = [
    { value: 'all', label: 'All Products' },
    { value: 'tshirt', label: 'T-Shirts' },
    { value: 'hoodie', label: 'Hoodies' },
    { value: 'jacket', label: 'Jackets' },
    { value: 'pants', label: 'Pants' },
    { value: 'accessories', label: 'Accessories' },
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setProducts(data);
    }
    setLoading(false);
  };

  const addToCart = (product: Product, size: string, quantity: number) => {
    const existingItem = cart.find(
      (item) => item.product.id === product.id && item.size === size
    );

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.product.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCart([...cart, { product, size, quantity }]);
    }
  };

  const updateCartItem = (productId: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }

    setCart(
      cart.map((item) =>
        item.product.id === productId && item.size === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  const removeFromCart = (productId: string, size: string) => {
    setCart(cart.filter((item) => !(item.product.id === productId && item.size === size)));
  };

  const clearCart = () => {
    setCart([]);
  };

  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading shop...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Forgetful Bandits Shop</h1>
            <p className="text-slate-400">Earn $FGB tokens with every purchase</p>
          </div>

          <button
            onClick={() => setShowCart(true)}
            className="relative bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
          >
            <ShoppingBag size={20} />
            Cart
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-900 border-2 border-pink-400 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter size={20} className="text-slate-400" />
            <span className="text-slate-300 font-semibold">Filter by category:</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  selectedCategory === category.value
                    ? 'bg-pink-600 text-white'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="bg-slate-800 rounded-lg p-12 text-center border border-slate-700">
            <ShoppingBag className="mx-auto mb-4 text-slate-600" size={48} />
            <p className="text-slate-400 text-lg">No products found</p>
          </div>
        )}
      </div>

      {showCart && (
        <ShoppingCart
          cart={cart}
          currentMember={currentMember}
          onClose={() => setShowCart(false)}
          onUpdateItem={updateCartItem}
          onRemoveItem={removeFromCart}
          onClearCart={clearCart}
        />
      )}
    </div>
  );
}
