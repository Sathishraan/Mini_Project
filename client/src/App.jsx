import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './component/AuthContext';
import Cart from './component/Cart';
import CustomerHome from './component/CustomerHome';
import FarmerHome from './component/FarmerHome';
import Address from './section/Address';
import AllProduct from './section/AllProduct';
import FarmerSign from './section/FarmerSigin';
import Farmerlogin from './section/Farmerlogin';
import ForgotPassword from './section/ForgotPassword';
import Login from './section/Login';
import ProductDetails from './section/ProductDetails';
import ResetPassword from './section/ResetPassword';
import Signin from './section/Signin';
import Welcome from './section/Welcome';
import Post from './section/Post';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/customerhome" element={<CustomerHome />} />
          <Route path="/Farmerhome" element={<FarmerHome />} />
          <Route path="/address" element={<Address />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/farmersign" element={<FarmerSign />} />
          <Route path="/farmerlogin" element={<Farmerlogin />} />
          <Route path="/search" element={<AllProduct  />} />
          <Route path="/posts" element={<Post />} />
          
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
