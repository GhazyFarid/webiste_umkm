import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import productReducer from './slices/productSlice';
import categoryReducer from './slices/categorySlice';
import cartReducer from './slices/cartSlice';
import settingsReducer from './slices/settingsSlice';
import authReducer from './slices/authSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['cart', 'products', 'categories', 'settings', 'auth'], // Only these will be persisted
};

const rootReducer = combineReducers({
  products: productReducer,
  categories: categoryReducer,
  cart: cartReducer,
  settings: settingsReducer,
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
