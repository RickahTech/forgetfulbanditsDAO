import { useState } from 'react';
import { type Product } from '../lib/supabase';
import { ShoppingCart, Coins, Package } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, size: string, quantity: number) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState(product.sizes_available[0] || 'M');
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize, quantity);
    setQuantity(1);
  };

  return (
    <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden hover:border-slate-600 transition-colors">
      <div className="aspect-square bg-slate-900 overflow-hidden">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-bold text-white">{product.name}</h3>
          <span className="text-2xl font-bold text-green-400">${product.price}</span>
        </div>

        <p className="text-slate-400 text-sm mb-4 leading-relaxed">{product.description}</p>

        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2 bg-amber-900 bg-opacity-30 px-3 py-1 rounded-full border border-amber-700">
            <Coins size={16} className="text-amber-500" />
            <span className="text-amber-400 font-semibold text-sm">
              +{product.tokens_reward} tokens
            </span>
          </div>

          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <Package size={16} />
            <span>{product.stock_quantity} in stock</span>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-slate-300 text-sm font-semibold mb-2">Size</label>
          <div className="flex gap-2">
            {product.sizes_available.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`flex-1 py-2 rounded-lg font-semibold transition-colors ${
                  selectedSize === size
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-slate-300 text-sm font-semibold mb-2">Quantity</label>
          <input
            type="number"
            min="1"
            max={product.stock_quantity}
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
          />
        </div>

        <button
          onClick={handleAddToCart}
          disabled={product.stock_quantity === 0}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:text-slate-500 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
        >
          <ShoppingCart size={20} />
          {product.stock_quantity > 0 ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
}
