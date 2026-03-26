export const authService = {
  login: async (username, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username === 'admin' && password === 'admin123') {
          resolve({ id: '1', username: 'admin', role: 'admin', token: 'fake-jwt-token' });
        } else {
          reject(new Error('Username atau password salah'));
        }
      }, 1000);
    });
  },

  logout: async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(true), 500);
    });
  }
};
