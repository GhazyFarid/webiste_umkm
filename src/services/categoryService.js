const MOCK_CATEGORIES = [
  { id: '1', name: 'Elektronik' },
  { id: '2', name: 'Fashion' },
  { id: '3', name: 'Rumah Tangga' }
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
