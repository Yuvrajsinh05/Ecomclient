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
import { Provider } from 'react-redux';

function App() {

console.log("inner trigger")
  return (
    <Provider store={store}>
      <BrowserRouter>
          <Routes>
            <Route path="/" exact element={<Login_register />} />
            <Route path="/dashboard" element={<Home/>} />
            <Route path="/Shop" element={<Shop />} />
            <Route path="/shopdetail/:productId" element={<Details/>} />
            <Route path="/shoppingcart" element={<Cart/>} />
            <Route path="/checkout" element={<Checkout/>} />
          </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

