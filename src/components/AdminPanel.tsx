import { useState, useEffect } from 'react';
import { supabase, type Product } from '../lib/supabase';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';

export function AdminPanel() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image_url: '',
    category: 'tshirt' as Product['category'],
    sizes_available: ['S', 'M', 'L', 'XL'],
    tokens_reward: '',
    stock_quantity: '',
  });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const productData = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      image_url: formData.image_url,
      category: formData.category,
      sizes_available: formData.sizes_available,
      tokens_reward: parseFloat(formData.tokens_reward),
      stock_quantity: parseInt(formData.stock_quantity),
    };

    if (editingProduct) {
      const { error } = await supabase
        .from('products')
        .update(productData)
        .eq('id', editingProduct.id);

      if (!error) {
        alert('Product updated successfully!');
        resetForm();
        fetchProducts();
      } else {
        alert('Error updating product: ' + error.message);
      }
    } else {
      const { error } = await supabase.from('products').insert(productData);

      if (!error) {
        alert('Product added successfully!');
        resetForm();
        fetchProducts();
      } else {
        alert('Error adding product: ' + error.message);
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    const { error } = await supabase.from('products').delete().eq('id', id);

    if (!error) {
      alert('Product deleted successfully!');
      fetchProducts();
    } else {
      alert('Error deleting product: ' + error.message);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      image_url: product.image_url,
      category: product.category,
      sizes_available: product.sizes_available,
      tokens_reward: product.tokens_reward.toString(),
      stock_quantity: product.stock_quantity.toString(),
    });
    setShowAddForm(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      image_url: '',
      category: 'tshirt',
      sizes_available: ['S', 'M', 'L', 'XL'],
      tokens_reward: '',
      stock_quantity: '',
    });
    setEditingProduct(null);
    setShowAddForm(false);
  };

  const toggleSize = (size: string) => {
    if (formData.sizes_available.includes(size)) {
      setFormData({
        ...formData,
        sizes_available: formData.sizes_available.filter((s) => s !== size),
      });
    } else {
      setFormData({
        ...formData,
        sizes_available: [...formData.sizes_available, size],
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-white">Product Management</h1>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
          >
            <Plus size={20} />
            Add Product
          </button>
        </div>

        {showAddForm && (
          <div className="bg-slate-800 rounded-lg p-6 mb-8 border border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button
                onClick={resetForm}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-2">
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        category: e.target.value as Product['category'],
                      })
                    }
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white"
                    required
                  >
                    <option value="tshirt">T-Shirt</option>
                    <option value="hoodie">Hoodie</option>
                    <option value="jacket">Jacket</option>
                    <option value="pants">Pants</option>
                    <option value="accessories">Accessories</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white h-24 resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-2">
                  Image URL
                </label>
                <input
                  type="url"
                  value={formData.image_url}
                  onChange={(e) =>
                    setFormData({ ...formData, image_url: e.target.value })
                  }
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white"
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-2">
                    Price (£)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-2">
                    Token Reward
                  </label>
                  <input
                    type="number"
                    value={formData.tokens_reward}
                    onChange={(e) =>
                      setFormData({ ...formData, tokens_reward: e.target.value })
                    }
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-2">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    value={formData.stock_quantity}
                    onChange={(e) =>
                      setFormData({ ...formData, stock_quantity: e.target.value })
                    }
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-2">
                  Available Sizes
                </label>
                <div className="flex gap-3">
                  {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => toggleSize(size)}
                      className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                        formData.sizes_available.includes(size)
                          ? 'bg-pink-600 text-white'
                          : 'bg-slate-700 text-slate-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <Save size={20} />
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Existing Products</h2>
          <div className="grid gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-slate-800 rounded-lg p-6 border border-slate-700 flex gap-6"
              >
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-32 h-32 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
                  <p className="text-slate-400 text-sm mb-3">{product.description}</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                    <div>
                      <span className="text-slate-500">Price:</span>
                      <span className="text-green-400 font-semibold ml-2">
                        £{product.price}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500">Tokens:</span>
                      <span className="text-pink-400 font-semibold ml-2">
                        {product.tokens_reward}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500">Stock:</span>
                      <span className="text-white font-semibold ml-2">
                        {product.stock_quantity}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500">Category:</span>
                      <span className="text-white font-semibold ml-2 capitalize">
                        {product.category}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2"
                  >
                    <Edit2 size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {products.length === 0 && (
            <div className="bg-slate-800 rounded-lg p-12 text-center border border-slate-700">
              <p className="text-slate-400 text-lg">No products yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
