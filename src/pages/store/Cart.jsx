import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../../store/slices/cartSlice';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, MessageSquareCode } from 'lucide-react';
import { formatWhatsAppMessage, redirectToWhatsApp } from '../../utils/whatsapp';
import { useState } from 'react';
import { motion } from 'framer-motion';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const settings = useSelector(state => state.settings);
  const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const [customer, setCustomer] = useState({
    name: '',
    phone: '',
    address: ''
  });

  const handleCheckout = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    if (!customer.name || !customer.phone || !customer.address) {
      alert('Silakan lengkapi detail pengiriman terlebih dahulu.');
      return;
    }

    const message = formatWhatsAppMessage(settings, cartItems, customer);
    redirectToWhatsApp(settings.whatsappNumber, message);
    // Optional: clear cart after checkout
    // dispatch(clearCart());
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center container mx-auto px-4">
        <div className="bg-white p-12 rounded-3xl text-center shadow-xl shadow-slate-200/50 border border-slate-100 max-w-md w-full">
          <div className="w-24 h-24 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-8">
            <ShoppingBag size={48} />
          </div>
          <h2 className="text-3xl font-display font-bold mb-4">Keranjang Kosong</h2>
          <p className="text-slate-500 mb-8 leading-relaxed">
            Sepertinya Anda belum memilih produk apapun. Yuk, jelajahi katalog kami sekarang!
          </p>
          <a href="/store" className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary-dark transition-all transform hover:scale-105 shadow-lg shadow-primary/20">
            Jelajahi Store <ArrowRight size={20} />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-display font-extrabold mb-12">Keranjang Belanja</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* List Items */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-50 font-bold font-display uppercase tracking-wider text-sm text-slate-400">
                Item dalam Keranjang ({cartItems.length})
              </div>
              <div className="divide-y divide-slate-50">
                {cartItems.map(item => (
                  <div key={item.id} className="p-6 flex flex-col sm:flex-row gap-6 items-center">
                    <img src={item.image} alt={item.name} className="w-24 h-24 rounded-2xl object-cover shrink-0 bg-slate-100" />
                    <div className="flex-grow text-center sm:text-left">
                      <h3 className="text-lg font-bold font-display">{item.name}</h3>
                      <p className="text-primary font-bold">Rp {item.price.toLocaleString('id-ID')}</p>
                    </div>

                    <div className="flex items-center gap-4 bg-slate-50 rounded-xl p-1 px-4">
                      <button
                        onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                        className="p-1 hover:text-primary"
                      >
                        <Minus size={18} />
                      </button>
                      <span className="w-8 text-center font-bold">{item.quantity}</span>
                      <button
                        onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                        className="p-1 hover:text-primary"
                      >
                        <Plus size={18} />
                      </button>
                    </div>

                    <div className="text-right items-end">
                      <p className="font-bold text-slate-900 mb-2">Rp {(item.price * item.quantity).toLocaleString('id-ID')}</p>
                      <button
                        onClick={() => dispatch(removeFromCart(item.id))}
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer Form */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
              <h3 className="text-xl font-display font-bold mb-6 flex items-center gap-3">
                <MessageSquareCode className="text-primary" size={24} />
                Detail Pengiriman
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-600 mb-2 uppercase tracking-wide">Nama Lengkap</label>
                  <input
                    type="text"
                    placeholder="Contoh: Anonim"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-primary focus:bg-white outline-none"
                    value={customer.name}
                    onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-600 mb-2 uppercase tracking-wide">No. WhatsApp</label>
                  <input
                    type="tel"
                    placeholder="Contoh: 0812..."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-primary focus:bg-white outline-none"
                    value={customer.phone}
                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-600 mb-2 uppercase tracking-wide">Alamat Pengiriman</label>
                  <textarea
                    placeholder="Tuliskan alamat lengkap pengiriman..."
                    rows={3}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-primary focus:bg-white outline-none resize-none"
                    value={customer.address}
                    onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Summary */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 p-8 sticky top-24">
              <h3 className="text-xl font-display font-bold mb-8">Ringkasan Pesanan</h3>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-slate-500">
                  <span>Subtotal</span>
                  <span>Rp {total.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Ongkos Kirim</span>
                  <span className="italic">Dihitung otomatis</span>
                </div>
                <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                  <span className="font-bold text-slate-900 border-l-4 border-primary pl-3">Total Tagihan</span>
                  <span className="text-2xl font-display font-bold text-primary">Rp {total.toLocaleString('id-ID')}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full py-5 bg-primary text-white font-bold rounded-2xl hover:bg-primary-dark transition-all transform hover:scale-[1.02] shadow-xl shadow-primary/20 flex items-center justify-center gap-3 text-lg"
              >
                Checkout ke WhatsApp <ArrowRight size={22} />
              </button>

              <p className="mt-6 text-[10px] text-center text-slate-400 uppercase tracking-widest font-medium">
                Pesan anda akan diformat otomatis dan dikirim langsung ke WhatsApp seller.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Cart;
