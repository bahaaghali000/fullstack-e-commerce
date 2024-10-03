import { lazy } from "react";

const Home = lazy(() => import("./Home.jsx"));
const Shop = lazy(() => import("./Shop.jsx"));
const Cart = lazy(() => import("./Cart.jsx"));
const ProductDetails = lazy(() => import("./ProductDetails.jsx"));
const Login = lazy(() => import("./Login.jsx"));
const Signup = lazy(() => import("./Signup.jsx"));
const Checkout = lazy(() => import("./Checkout.jsx"));
const AllProducts = lazy(() => import("../admin/AllProducts/AllProducts.jsx"));
const AddProducts = lazy(() => import("../admin/AddProduct/AddProducts.jsx"));
const Dashboard = lazy(() => import("../admin/Dashboard.jsx"));
const Users = lazy(() => import("../admin/Users/Users.jsx"));
const Profile = lazy(() => import("../admin/Profile.jsx"));
const EditProduct = lazy(() => import("../admin/EditProduct/EditProduct.jsx"));
const Favorite = lazy(() => import("./Favorite.jsx"));
const ForgotPassword = lazy(() => import("./ForgotPassword.jsx"));
const VerifyCode = lazy(() => import("./VerifyCode.jsx"));
const RestPassword = lazy(() => import("./RestPassword.jsx"));
const NotFound = lazy(() => import("./NotFound.jsx"));

export {
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
};
