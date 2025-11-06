import { useState, useEffect } from 'react';
import { supabase, type Order, type OrderItem, type Product, type DAOMember } from '../lib/supabase';
import { Package, Clock, CheckCircle, Truck, Coins } from 'lucide-react';

interface OrderHistoryProps {
  currentMember: DAOMember | null;
}

export function OrderHistory({ currentMember }: OrderHistoryProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderItems, setOrderItems] = useState<Record<string, (OrderItem & { product: Product })[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentMember) {
      fetchOrders();
    }
  }, [currentMember]);

  const fetchOrders = async () => {
    if (!currentMember) return;

    setLoading(true);
    const { data: ordersData } = await supabase
      .from('orders')
      .select('*')
      .eq('member_id', currentMember.id)
      .order('created_at', { ascending: false });

    if (ordersData) {
      setOrders(ordersData);

      const itemsMap: Record<string, (OrderItem & { product: Product })[]> = {};

      for (const order of ordersData) {
        const { data: items } = await supabase
          .from('order_items')
          .select('*, product:products(*)')
          .eq('order_id', order.id);

        if (items) {
          itemsMap[order.id] = items.map((item: any) => ({
            ...item,
            product: item.product,
          }));
        }
      }

      setOrderItems(itemsMap);
    }

    setLoading(false);
  };

  const getStatusIcon = (status: Order['status']) => {
    const icons = {
      pending: { Icon: Clock, color: 'text-yellow-500' },
      completed: { Icon: CheckCircle, color: 'text-green-500' },
      shipped: { Icon: Truck, color: 'text-blue-500' },
      delivered: { Icon: Package, color: 'text-purple-500' },
    };
    return icons[status];
  };

  const getStatusBadge = (status: Order['status']) => {
    const badges = {
      pending: 'bg-yellow-900 text-yellow-200 border-yellow-700',
      completed: 'bg-green-900 text-green-200 border-green-700',
      shipped: 'bg-blue-900 text-blue-200 border-blue-700',
      delivered: 'bg-purple-900 text-purple-200 border-purple-700',
    };
    return badges[status];
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="text-white text-xl">Loading orders...</div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="bg-slate-800 rounded-lg p-12 text-center border border-slate-700">
        <Package className="mx-auto mb-4 text-slate-600" size={48} />
        <p className="text-slate-400 text-lg">No orders yet</p>
        <p className="text-slate-500 text-sm mt-2">Start shopping to earn governance tokens!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {orders.map((order) => {
        const { Icon, color } = getStatusIcon(order.status);
        const items = orderItems[order.id] || [];

        return (
          <div
            key={order.id}
            className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden"
          >
            <div className="bg-slate-900 p-6 border-b border-slate-700">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-white">
                      Order #{order.id.slice(0, 8)}
                    </h3>
                    <span
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold border ${getStatusBadge(
                        order.status
                      )}`}
                    >
                      <Icon size={16} />
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm">
                    Placed on {new Date(order.created_at).toLocaleDateString()}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-2xl font-bold text-green-400">
                    ${order.total_amount.toFixed(2)}
                  </p>
                  <p className="text-amber-400 text-sm flex items-center justify-end gap-1 mt-1">
                    <Coins size={14} />
                    +{order.tokens_earned} tokens earned
                  </p>
                </div>
              </div>

              <div className="text-slate-400 text-sm">
                <p className="font-semibold mb-1">Shipping Address:</p>
                <p className="whitespace-pre-line">{order.shipping_address}</p>
              </div>
            </div>

            <div className="p-6">
              <h4 className="text-slate-300 font-semibold mb-4">Order Items:</h4>
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 bg-slate-900 rounded-lg p-4"
                  >
                    <img
                      src={item.product.image_url}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h5 className="text-white font-semibold mb-1">
                        {item.product.name}
                      </h5>
                      <p className="text-slate-400 text-sm mb-2">
                        Size: {item.size} | Quantity: {item.quantity}
                      </p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-green-400 font-semibold">
                          ${item.price_at_purchase.toFixed(2)} each
                        </span>
                        <span className="text-amber-400 flex items-center gap-1">
                          <Coins size={14} />
                          +{item.tokens_earned} tokens
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
