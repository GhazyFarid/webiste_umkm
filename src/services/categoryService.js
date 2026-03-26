const MOCK_CATEGORIES = [
  { id: '1', name: 'Obat Bebas' },
  { id: '2', name: 'Obat Resep' },
  { id: '3', name: 'Suplemen & Vitamin' },
  { id: '4', name: 'Alat Kesehatan' },
  { id: '5', name: 'Perawatan Tubuh' }
];

export const categoryService = {
  getCategories: async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_CATEGORIES), 500);
    });
  },

  createCategory: async (category) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ ...category, id: Date.now().toString() });
      }, 800);
    });
  },

  updateCategory: async (id, category) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ ...category, id });
      }, 800);
    });
  },

  deleteCategory: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 500);
    });
  }
};
