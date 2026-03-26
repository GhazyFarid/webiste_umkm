/**
 * Utility to handle WhatsApp integration
 */

export const generateOrderId = () => {
  const date = new Date();
  const timestamp = date.getTime().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `ORD-${timestamp}-${random}`;
};

export const formatWhatsAppMessage = (storeInfo, cartItems, customerInfo) => {
  const orderId = generateOrderId();
  const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  
  let message = `*PESANAN BARU - ${orderId}*\n\n`;
  message += `Halo ${storeInfo.name}, saya ingin memesan produk berikut:\n\n`;
  
  cartItems.forEach((item, index) => {
    message += `${index + 1}. ${item.name} x ${item.quantity}\n`;
    message += `   Harga: Rp ${item.price.toLocaleString('id-ID')}\n`;
  });
  
  message += `\n*Total Tagihan: Rp ${totalPrice.toLocaleString('id-ID')}*\n\n`;
  message += `*Detail Pengiriman:*\n`;
  message += `Nama: ${customerInfo.name}\n`;
  message += `No. HP: ${customerInfo.phone}\n`;
  message += `Alamat: ${customerInfo.address}\n\n`;
  
  message += `Terima kasih!`;
  
  return encodeURIComponent(message);
};

export const redirectToWhatsApp = (phone, encodedMessage) => {
  // Clean phone number (remove +, spaces, etc)
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const url = `https://wa.me/${cleanPhone}/?text=${encodedMessage}`;
  window.open(url, '_blank');
};
