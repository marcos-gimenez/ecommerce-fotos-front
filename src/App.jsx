// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Header from "./components/Header";
// import Footer from "./components/Footer";

// import Events from "./pages/Events";
// import EventDetail from "./pages/EventDetail";
// import Cart from "./pages/Cart";
// import Checkout from "./pages/Checkout";
// import Thanks from "./pages/Thanks";

// import AdminLogin from "./pages/admin/Login";
// import AdminDashboard from "./pages/admin/Dashboard";
// import UploadPage from "./pages/admin/UploadPage";
// import ListMediaPage from "./pages/admin/ListMediaPage";
// import SalesPage from "./pages/admin/SalesPage";
// import SaleDetail from './pages/admin/SaleDetail';
// import CreateEventPage from "./pages/admin/CreateEventPage";

// import "./styles/theme.css";

// function App() {
//   return (
//     <BrowserRouter>
//       <div className="app">
//         <Header />

//         <Routes>
//           {/* Público */}
//           <Route path="/" element={<Events />} />
//           <Route path="/event" element={<Navigate to="/" replace />} />
//           <Route path="/event/:id" element={<EventDetail />} />
//           <Route path="/cart" element={<Cart />} />
//           <Route path="/checkout" element={<Checkout />} />
//           <Route path="/thanks/:orderId" element={<Thanks />} />

//           {/* Admin */}
//           <Route path="/admin/login" element={<AdminLogin />} />
//           <Route path="/admin" element={<AdminDashboard />} />
//           <Route path="/admin/upload" element={<UploadPage />} />
//           <Route path="/admin/media" element={<ListMediaPage />} />
//           <Route path="/admin/sales" element={<SalesPage />} />
//           <Route path="/admin/sales/:id" element={<SaleDetail />} />
//           <Route path="/admin/create-event" element={<CreateEventPage />} />

//         </Routes>

//         <Footer />
//       </div>
//     </BrowserRouter>
//   );
// }

// export default App;

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

/* Público */
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Thanks from "./pages/Thanks";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";

/* Admin */
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import UploadPage from "./pages/admin/UploadPage";
import ListMediaPage from "./pages/admin/ListMediaPage";
import SalesPage from "./pages/admin/SalesPage";
import SaleDetail from "./pages/admin/SaleDetail";
import CreateEventPage from "./pages/admin/CreateEventPage";

import "./styles/theme.css";

/* =========================
   Layout con control Admin
========================= */
function Layout({ children }) {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <div className="app">
      {!isAdmin && <Header />}
      {children}
      {!isAdmin && <Footer />}
    </div>
  );
}

/* =========================
   App
========================= */
export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* =======================
              Público
          ======================= */}
          <Route path="/" element={<Events />} />
          <Route path="/event" element={<Navigate to="/" replace />} />
          <Route path="/event/:id" element={<EventDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/thanks/:orderId" element={<Thanks />} />
          <Route path="/terminos" element={<Terms />} />
          <Route path="/privacidad" element={<Privacy />} />

          {/* =======================
              Admin
          ======================= */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/upload" element={<UploadPage />} />
          <Route path="/admin/media" element={<ListMediaPage />} />
          <Route path="/admin/sales" element={<SalesPage />} />
          <Route path="/admin/sales/:id" element={<SaleDetail />} />
          <Route path="/admin/create-event" element={<CreateEventPage />} />

          {/* =======================
              Fallback
          ======================= */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
