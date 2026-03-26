import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/store/Home';
import Store from './pages/store/Store';
import Cart from './pages/store/Cart';
import About from './pages/store/About';
import Contact from './pages/store/Contact';
import ProductDetail from './pages/store/ProductDetail';
import Login from './pages/admin/Login';
import AdminLayout from './components/admin/AdminLayout';
import ProtectedRoute from './components/admin/ProtectedRoute';
import AdminDashboard from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/Products';
import AdminCategories from './pages/admin/Categories';
import AdminSettings from './pages/admin/Settings';

import StoreLayout from './components/store/StoreLayout';

function App() {
  return (
    <Router>
      <Routes>
        {/* Storefront Routes */}
        <Route element={<StoreLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Route>
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
