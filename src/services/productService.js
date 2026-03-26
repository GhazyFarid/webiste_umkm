// Mock data for initial development
const MOCK_PRODUCTS = [
  {
    id: '1',
    name: 'Produk Unggulan A',
    price: 150000,
    description: 'Deskripsi lengkap produk A yang sangat menarik.',
    category: 'Elektronik',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    featured: true,
    status: 'publish',
    stock: 10
  },
  {
    id: '2',
    name: 'Produk B',
    price: 75000,
    description: 'Deskripsi singkat produk B.',
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
    featured: false,
    status: 'publish',
    stock: 5
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
