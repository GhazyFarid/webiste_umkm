# Sales Website UMKM — Walkthrough

## Apa yang Dibangun

Website katalog produk (sales website) yang dirancang khusus untuk UMKM sebagai channel jualan utama atau backup Shopee. Dilengkapi dengan fitur **WhatsApp Checkout** untuk kemudahan transaksi manual.

**Tech stack:** React 19 + Vite 7 + Tailwind CSS v4 + Framer Motion + Redux Toolkit + React Helmet Async

**Live URL:** 

## Struktur Proyek (API-Ready)

```
website_jualan/
├── src/
│   ├── services/       ← Abstraction layer untuk data (API/Mock)
│   ├── store/          ← Redux slices & thunks (State Management)
│   ├── utils/          ← Utilities (v.g. WhatsApp formatting)
│   ├── components//    ← Reusable UI components
│   │   ├── admin/      ← Admin Dashboard components
│   │   ├── store/      ← Storefront components
│   │   └── common/     ← Shared components (Button, Modal, etc)
│   ├── pages/          ← Page-level components
│   ├── index.css       ← Tailwind v4 styling
│   └── App.jsx         ← Routing & Layout setup
```

## Arsitektur & Fitur Utama

### 1. Service Layer & Persistence
- Menggunakan `src/services/` sebagai penengah antara data (mock/API) dan Redux.
- **Persistence:** State tersimpan di `localStorage` menggunakan `redux-persist`, sehingga data CMS tidak hilang saat refresh.

### 2. WhatsApp Checkout Logic
- Seluruh logika format pesan dan redirect dipusahkan ke `src/utils/whatsapp.js`.
- Mendukung auto-format pesanan: Nama Produk, Harga, Total, dan Detail Pembeli.

### 3. Admin CMS (Protected)
- Fitur Kelola Produk & Kategori (CRUD) dengan state management yang robust.
- Pengaturan informasi toko (Nama Toko, No. WA, Rekening).
- **Security:** Rute `/admin` dilindungi dengan proteksi sederhana untuk demo.

### 4. User Side (Storefront)
- **Home:** Banner promo, kategori populer, produk unggulan.
- **Store:** Katalog lengkap dengan fitur Search & Category Filter.
- **Cart:** Manajemen keranjang belanja yang intuitif.

## Dependencies Utama

| Package | Kegunaan |
|---------|----------|
| `react` v19 | UI framework terbaru |
| `@reduxjs/toolkit` | State management dengan `createAsyncThunk` |
| `redux-persist` | Data persistence (localStorage) |
| `tailwindcss` v4 | Styling modern & performan |
| `framer-motion` | Animasi premium & micro-interactions |
| `react-router-dom` | Routing (Client-side navigation) |
| `lucide-react` | Icon library modern |

## Cara Menjalankan

```bash
npm install
npm run dev
```

> [!TIP]
> Struktur ini dirancang agar siap "colok API" di masa depan tanpa perlu melakukan refactor besar pada bagian UI dan Redux.
