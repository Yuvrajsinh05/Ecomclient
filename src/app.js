import React, { useState, useEffect } from "react";
import { Route, Routes, BrowserRouter, useLocation } from "react-router-dom"; // Import useLocation here
import Contact from "./routes/contact/Contact";
import Home from "./routes/home/home";
import Cart from "./routes/cart/Cart";
import Checkout from "./routes/checkout/Checkout";
import Shop from "./routes/shop/Shop";
import Details from "./routes/productdetail/Details";
import { Login_register } from "./routes/login/login-register";
import store from "./fetures/store";
import OpenShop from "./routes/OpenShop/Shop";
import { Provider } from "react-redux";
import { Liked } from "./routes/liked/liked";
import { Header } from "./components/header/header";
import UserProfile from "./routes/Profile/profile";
// import { Footer } from "./components/footer/Footer";

// ErrorBoundary functional component to catch errors within its child components
function ErrorBoundary(props) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const errorHandler = (error, errorInfo) => {
      console.error("Error caught by error boundary:", error, errorInfo);
      setHasError(true);
    };

    // Add event listener for unhandled errors
    window.addEventListener("error", errorHandler);

    return () => {
      // Clean up event listener
      window.removeEventListener("error", errorHandler);
    };
  }, []); // Empty dependency array to run only once on mount

  if (hasError) {
    return <div>Something went wrong. Please try again later.</div>;
  }

  return props.children;
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </Provider>
  );
}

function AppContent() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname == "/") return;
    localStorage.setItem("lastRoute", location.pathname);
  }, [location]);

  return (
    <ErrorBoundary>
      <Header />
      <Routes>
        <Route path="/" exact element={<Login_register />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/Shop" element={<Shop />} />
        <Route path="/OpenShop" element={<OpenShop />} />
        <Route path="/shopdetail/:productId" element={<Details />} />
        <Route path="/shoppingcart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/liked" element={<Liked />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
      {/* <Footer /> */}
    </ErrorBoundary>
  );
}

export default App;
