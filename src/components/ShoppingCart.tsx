import { useState } from 'react';
import { supabase, type CartItem, type DAOMember } from '../lib/supabase';
import { X, Trash2, ShoppingBag, Coins } from 'lucide-react';

interface ShoppingCartProps {
  cart: CartItem[];
  currentMember: DAOMember | null;
  onClose: () => void;
  onUpdateItem: (productId: string, size: string, quantity: number) => void;
  onRemoveItem: (productId: string, size: string) => void;
  onClearCart: () => void;
}

export function ShoppingCart({
  cart,
  currentMember,
  onClose,
  onUpdateItem,
  onRemoveItem,
  onClearCart,
}: ShoppingCartProps) {
  const [shippingAddress, setShippingAddress] = useState('');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const [showCheckout, setShowCheckout] = useState(false);

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const totalTokens = cart.reduce(
    (sum, item) => sum + item.product.tokens_reward * item.quantity,
    0
  );

  const handleCheckout = async () => {
    if (!currentMember) {
      setError('Please register as a member first');
      return;
    }

    if (!shippingAddress.trim()) {
      setError('Please enter a shipping address');
      return;
    }

    if (cart.length === 0) {
      setError('Your cart is empty');
      return;
    }

    setProcessing(true);
    setError('');

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        member_id: currentMember.id,
        total_amount: totalAmount,
        tokens_earned: totalTokens,
        status: 'completed',
        shipping_address: shippingAddress,
        completed_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (orderError || !order) {
      setError('Failed to create order: ' + orderError?.message);
      setProcessing(false);
      return;
    }

    const orderItems = cart.map((item) => ({
      order_id: order.id,
      product_id: item.product.id,
      quantity: item.quantity,
      size: item.size,
      price_at_purchase: item.product.price,
      tokens_earned: item.product.tokens_reward * item.quantity,
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) {
      setError('Failed to save order items: ' + itemsError.message);
      setProcessing(false);
      return;
    }

    const newTokenBalance = Number(currentMember.token_balance) + totalTokens;
    const { error: updateError } = await supabase
      .from('dao_members')
      .update({ token_balance: newTokenBalance })
      .eq('id', currentMember.id);

    if (updateError) {
      setError('Failed to update token balance: ' + updateError.message);
      setProcessing(false);
      return;
    }

    for (const item of cart) {
      const newStock = item.product.stock_quantity - item.quantity;
      await supabase
        .from('products')
        .update({ stock_quantity: newStock })
        .eq('id', item.product.id);
    }

    onClearCart();
    setProcessing(false);
    alert(`Order placed successfully! You earned ${totalTokens} governance tokens!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-slate-800 border-b border-slate-700 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <ShoppingBag size={28} />
            Shopping Cart
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="mx-auto mb-4 text-slate-600" size={64} />
              <p className="text-slate-400 text-lg">Your cart is empty</p>
              <button
                onClick={onClose}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              {error && (
                <div className="mb-4 bg-red-900 bg-opacity-50 border border-red-700 text-red-200 p-4 rounded-lg">
                  {error}
                </div>
              )}

              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div
                    key={`${item.product.id}-${item.size}`}
                    className="bg-slate-900 rounded-lg p-4 flex gap-4"
                  >
                    <img
                      src={item.product.image_url}
                      alt={item.product.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />

                    <div className="flex-1">
                      <h3 className="text-white font-bold mb-1">{item.product.name}</h3>
                      <p className="text-slate-400 text-sm mb-2">Size: {item.size}</p>
                      <div className="flex items-center gap-4">
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) =>
                            onUpdateItem(item.product.id, item.size, Number(e.target.value))
                          }
                          className="w-20 bg-slate-800 border border-slate-700 rounded px-2 py-1 text-white text-sm"
                        />
                        <span className="text-green-400 font-semibold">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                        <span className="text-amber-400 text-sm flex items-center gap-1">
                          <Coins size={14} />
                          +{item.product.tokens_reward * item.quantity}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.product.id, item.size)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="bg-slate-900 rounded-lg p-6 mb-6">
                <div className="flex justify-between text-slate-300 mb-2">
                  <span>Subtotal:</span>
                  <span className="font-semibold">${totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-amber-400 mb-4">
                  <span className="flex items-center gap-2">
                    <Coins size={18} />
                    Tokens to earn:
                  </span>
                  <span className="font-bold text-xl">{totalTokens}</span>
                </div>
                <div className="border-t border-slate-700 pt-4 flex justify-between text-white text-xl font-bold">
                  <span>Total:</span>
                  <span className="text-green-400">${totalAmount.toFixed(2)}</span>
                </div>
              </div>

              {!showCheckout ? (
                <button
                  onClick={() => setShowCheckout(true)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  Proceed to Checkout
                </button>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-2">
                      Shipping Address
                    </label>
                    <textarea
                      value={shippingAddress}
                      onChange={(e) => setShippingAddress(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 h-24 resize-none"
                      placeholder="Enter your full shipping address"
                      required
                    />
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={handleCheckout}
                      disabled={processing}
                      className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-green-800 text-white py-3 rounded-lg font-semibold transition-colors"
                    >
                      {processing ? 'Processing...' : 'Complete Order'}
                    </button>
                    <button
                      onClick={() => setShowCheckout(false)}
                      className="px-6 bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-lg font-semibold transition-colors"
                    >
                      Back
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
