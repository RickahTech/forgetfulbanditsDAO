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
    <div className="bg-white border border-black/10 overflow-hidden hover:border-black/30 transition-colors">
      <div className="aspect-square bg-black/5 overflow-hidden">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-bold text-black">{product.name}</h3>
          <span className="text-2xl font-bold text-black">${product.price}</span>
        </div>

        <p className="text-black/60 text-sm mb-4 leading-relaxed">{product.description}</p>

        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2 bg-black/5 px-3 py-1 border border-black/20">
            <Coins size={16} className="text-black" />
            <span className="text-black font-semibold text-sm">
              +{product.tokens_reward} $FGB
            </span>
          </div>

          <div className="flex items-center gap-2 text-black/60 text-sm">
            <Package size={16} />
            <span>{product.stock_quantity} in stock</span>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-black text-sm font-semibold mb-2">Size</label>
          <div className="flex gap-2">
            {product.sizes_available.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`flex-1 py-2 font-semibold transition-colors ${
                  selectedSize === size
                    ? 'bg-black text-white'
                    : 'bg-white border border-black/20 text-black hover:bg-black/5'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-black text-sm font-semibold mb-2">Quantity</label>
          <input
            type="number"
            min="1"
            max={product.stock_quantity}
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
            className="w-full bg-white border border-black/20 px-4 py-2 text-black focus:outline-none focus:border-black"
          />
        </div>

        <button
          onClick={handleAddToCart}
          disabled={product.stock_quantity === 0}
          className="w-full bg-black hover:bg-black/90 disabled:bg-black/20 disabled:text-black/40 text-white py-3 font-semibold transition-colors flex items-center justify-center gap-2"
        >
          <ShoppingCart size={20} />
          {product.stock_quantity > 0 ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
}
