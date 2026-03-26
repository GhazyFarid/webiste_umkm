import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  storeName: 'Nama Toko Anda',
  whatsappNumber: '6281234567890',
  address: 'Alamat lengkap toko Anda di sini.',
  bankAccount: {
    bankName: 'Bank BCA',
    accountNumber: '1234567890',
    accountHolder: 'Pemilik Toko'
  },
  banners: [
    { id: '1', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200', title: 'Promo Spesial Minggu Ini!' }
  ],
  aboutContent: 'Kami adalah UMKM yang berfokus pada kualitas dan pelayanan terbaik untuk pelanggan kami.',
  contactInfo: {
    email: 'info@tokoanda.com',
    instagram: '@tokoanda',
    mapsUrl: 'https://goo.gl/maps/example'
  }
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updateSettings: (state, action) => {
      return { ...state, ...action.payload };
    }
  }
});

export const { updateSettings } = settingsSlice.actions;
export default settingsSlice.reducer;
