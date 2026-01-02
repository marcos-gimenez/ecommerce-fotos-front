import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import AdminGuard from "./components/AdminGuard";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import UploadMedia from "./pages/admin/UploadMedia";
import ListMedia from "./pages/admin/ListMedia";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Thanks from "./pages/Thanks";
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import Sales from "./pages/admin/Sales";
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

          <Route
            path="/admin"
            element={
              <AdminGuard>
                <AdminDashboard />
              </AdminGuard>
            }
          />

          <Route
            path="/admin/upload"
            element={
              <AdminGuard>
                <UploadMedia />
              </AdminGuard>
            }
          />

          <Route
            path="/admin/media"
            element={
              <AdminGuard>
                <ListMedia />
              </AdminGuard>
            }
          />

          <Route
            path="/admin/sales"
            element={
              <AdminGuard>
                <Sales />
              </AdminGuard>
            }
          />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
