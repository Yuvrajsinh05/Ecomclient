import React from "react";

import {
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import Contact from "./routes/contact/Contact";
import PaymentSuccess from "./routes/home/paymentsuccess/paymentsuccess";
import Home from "./routes/home/home";
import Cart from "./routes/cart/Cart";
import Checkout from "./routes/checkout/Checkout";
import Shop from "./routes/shop/Shop";
import Details from "./routes/productdetail/Details";
import { Login_register } from "./routes/login/login-register";
import store from "./fetures/store";
import OpenShop from "./routes/OpenShop/Shop";
import { Provider } from 'react-redux';
import UserProfile from "./routes/Profile/profile";
import { Liked } from "./routes/liked/liked";


function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
          <Routes>
            <Route path="/" exact element={<Login_register />} />
            <Route path="/dashboard" element={<Home/>} />
            <Route path="/Shop" element={<Shop />} />
            <Route path="/OpenShop" element={<OpenShop />} />
            <Route path="/shopdetail/:productId" element={<Details/>} />
            <Route path="/shoppingcart" element={<Cart/>} />
            <Route path="/checkout" element={<Checkout/>} />
            <Route path="/liked" element={<Liked/>} />
            <Route path="/profile" element={<UserProfile/>} />
            <Route path="/Contact" element={<Contact/>} />
          </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

