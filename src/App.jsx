import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import UploadMedia from './pages/admin/UploadMedia';
import ListMedia from './pages/admin/ListMedia';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Thanks from './pages/Thanks';
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import Sales from './pages/admin/Sales';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Público */}
        <Route path="/" element={<Events />} />
        <Route path="/event/:id" element={<EventDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/thanks/:orderId" element={<Thanks />} />



        {/* Admin (sin auth todavía) */}
        <Route path="/admin/upload" element={<UploadMedia />} />
        <Route path="/admin/media" element={<ListMedia />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/sales" element={<Sales />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
