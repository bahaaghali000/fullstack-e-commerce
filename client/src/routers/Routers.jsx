import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Shop from "../pages/Shop";
import Cart from "../pages/Cart";
import ProductDetails from "../pages/ProductDetails";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Checkout from "../pages/Checkout";

import ProtectedRoute from "./ProtectedRoute";
import AllProducts from "../admin/AllProducts";
import AddProducts from "../admin/AddProducts";
import Dashboard from "../admin/Dashboard";
import Users from "../admin/Users";
import Profile from "../admin/Profile";
import Favorite from "../pages/Favorite";

const Routers = ({ searchValue }) => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />

      <Route path="/home" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/shop/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/favorite" element={<Favorite />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/*" element={<ProtectedRoute />}>
        <Route path="checkout" element={<Checkout />} />
        <Route path="profile" element={<Profile />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route
          path="dashboard/all-products"
          element={<AllProducts searchValue={searchValue} />}
        />
        <Route path="dashboard/add-product" element={<AddProducts />} />
        <Route path="dashboard/users" element={<Users />} />
      </Route>
    </Routes>
  );
};

export default Routers;
