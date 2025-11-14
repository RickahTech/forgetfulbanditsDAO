import { useState, useEffect } from 'react';
import { supabase, type Product, type DAOMember, type CartItem } from '../lib/supabase';
import { ProductCard } from './ProductCard';
import { ShoppingCart } from './ShoppingCart';
import { ShoppingBag } from 'lucide-react';

interface ShopProps {
  currentMember: DAOMember | null;
}

export function Shop({ currentMember }: ShopProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [loading, setLoading] = useState(true);

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

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-black text-xl">Loading shop...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-black mb-2">Forgetful Bandits Shop</h1>
            <p className="text-black/60">Earn $FGBNDT tokens with every purchase - £1 = 1 token</p>
          </div>

          <button
            onClick={() => setShowCart(true)}
            className="relative bg-black hover:bg-black/90 text-white px-6 py-3 font-semibold transition-colors flex items-center gap-2"
          >
            <ShoppingBag size={20} />
            Cart
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-white text-black text-xs font-bold w-6 h-6 flex items-center justify-center border-2 border-black">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
            />
          ))}
        </div>

        {products.length === 0 && (
          <div className="bg-white p-12 text-center border border-black/10">
            <ShoppingBag className="mx-auto mb-4 text-black/30" size={48} />
            <p className="text-black/70 text-lg">No products available yet</p>
            <p className="text-black/50 text-sm mt-2">Check back soon for new items!</p>
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
