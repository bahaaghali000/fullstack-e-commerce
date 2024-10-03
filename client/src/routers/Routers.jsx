import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import {
  Home,
  Shop,
  Cart,
  ProductDetails,
  Login,
  Signup,
  Checkout,
  AllProducts,
  AddProducts,
  Dashboard,
  Users,
  Profile,
  Favorite,
  ForgotPassword,
  VerifyCode,
  RestPassword,
  NotFound,
  EditProduct,
} from "../pages";
import { useSelector } from "react-redux";

const Routers = ({ searchValue }) => {
  const { user } = useSelector((state) => state.auth);
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />

      <Route path="/home" element={<Home />} />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-code" element={<VerifyCode />} />
      <Route path="/rest-password" element={<RestPassword />} />

      <Route path="/shop">
        <Route index element={<Shop />} />
        <Route path=":id" element={<ProductDetails />} />
      </Route>

      <Route path="/cart" element={<Cart />} />
      <Route path="/favorite" element={<Favorite />} />

      <Route path="/" element={<ProtectedRoute />}>
        <Route path="checkout" element={<Checkout />} />
        <Route path="profile" element={<Profile />} />

        <Route
          path="dashboard"
          element={user.role === "admin" ? <Outlet /> : <NotFound />}
        >
          <Route index element={<Dashboard />} />
          <Route
            path="all-products"
            element={<AllProducts searchValue={searchValue} />}
          />
          <Route path="add-product" element={<AddProducts />} />
          <Route path="edit-product/:id" element={<EditProduct />} />
          <Route path="users" element={<Users />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Routers;
