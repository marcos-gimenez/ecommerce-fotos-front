import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Thanks from "./pages/Thanks";

import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import UploadPage from "./pages/admin/UploadPage";
import ListMediaPage from "./pages/admin/ListMediaPage";
import SalesPage from "./pages/admin/SalesPage";
import SaleDetail from './pages/admin/SaleDetail';


import "./styles/theme.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />

        <Routes>
          {/* Público */}
          <Route path="/" element={<Events />} />
          <Route path="/event" element={<Navigate to="/" replace />} />
          <Route path="/event/:id" element={<EventDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/thanks/:orderId" element={<Thanks />} />

          {/* Admin */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/upload" element={<UploadPage />} />
          <Route path="/admin/media" element={<ListMediaPage />} />
          <Route path="/admin/sales" element={<SalesPage />} />
          <Route path="/admin/sales/:id" element={<SaleDetail />} />

        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
