const MOCK_PRODUCTS = [
  {
    id: '1',
    name: 'Paracetamol 500mg',
    price: 15000,
    description: 'Membantu meredakan nyeri ringan sampai sedang, dan menurunkan demam.',
    category: 'Obat Bebas',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500',
    featured: true,
    status: 'publish',
    stock: 100
  },
  {
    id: '2',
    name: 'Vitamin C 1000mg',
    price: 45000,
    description: 'Suplemen untuk menjaga daya tahan tubuh dan membantu pemulihan.',
    category: 'Suplemen & Vitamin',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500',
    featured: true,
    status: 'publish',
    stock: 50
  },
  {
    id: '3',
    name: 'Amoxicillin 500mg',
    price: 35000,
    description: 'Antibiotik untuk membantu mengobati berbagai jenis infeksi bakteri. Memerlukan resep dokter.',
    category: 'Obat Resep',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500',
    featured: false,
    status: 'publish',
    stock: 30
  },
  {
    id: '4',
    name: 'Termometer Digital',
    price: 85000,
    description: 'Termometer digital akurat untuk mengukur suhu tubuh dengan cepat.',
    category: 'Alat Kesehatan',
    image: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=500',
    featured: false,
    status: 'publish',
    stock: 20
  }
];

export const productService = {
  getProducts: async () => {
    // Simulate API delay
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_PRODUCTS), 800);
    });
  },
  
  getProductById: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const product = MOCK_PRODUCTS.find(p => p.id === id);
        resolve(product);
      }, 500);
    });
  },

  createProduct: async (productData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newProduct = { ...productData, id: Date.now().toString() };
        resolve(newProduct);
      }, 1000);
    });
  },

  updateProduct: async (id, productData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ ...productData, id });
      }, 1000);
    });
  },

  deleteProduct: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 800);
    });
  }
};
