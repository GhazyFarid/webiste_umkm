import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  storeName: 'Apotik Sehat Jaya',
  whatsappNumber: '6281234567890',
  address: 'Jl. Kesehatan No. 123, Kota Semarang, Jawa Tengah.',
  bankAccount: {
    bankName: 'Bank BCA',
    accountNumber: '1234567890',
    accountHolder: 'Apotik Sehat Jaya'
  },
  banners: [
    { id: '1', image: 'https://images.unsplash.com/photo-1576091160550-2173bdd99602?w=1200', title: 'Solusi Kesehatan Terpercaya Anda' }
  ],
  aboutContent: 'Apotik Sehat Jaya berdedikasi untuk menyediakan obat-obatan berkualitas dan layanan konsultasi kesehatan profesional bagi masyarakat.',
  contactInfo: {
    email: 'kontak@apotiksehatjaya.com',
    instagram: '@apotiksehatjaya',
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
