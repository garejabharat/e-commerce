import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ErrorPage from "../components/common/ErrorPage";
import ProtectedPages from "../components/common/ProtectedPages";
import MasterLayout from "../layouts/MasterLayout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import {
  loginInfo,
  setIsAuthenticated,
} from "../redux/slices/useAuth/userAuth";
import { useAppDispatch } from "../redux/store";
import Ourteam from "../pages/OurTeam";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import CartPage from "../pages/CartPage";
import OrdersListPage from "../pages/OrdersListPage";
import WhishlistPage from "../pages/WhishlistPage";
import { setCartData } from "../redux/slices/cart/cartSlice";
import Checkout from "../pages/Checkout";
import Profile from "../pages/Profile";
import { setSaveForLater } from "../redux/slices/saveforlater/saveforlaterSlice";
import Search from "../components/Search";
import TermsAndConditions from "../pages/Termcondition";
import AboutUs from "../pages/AboutUs";
import PrivacyPolicy from "../pages/Privacy";
import SupportPage from "../pages/SupportPage";
import EWayBill from "../pages/EWayBill";
const Router = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const userInfo = localStorage?.getItem("loginuser");
    const cartItems = localStorage?.getItem("cartItem");
    const savedItems = localStorage?.getItem("savedItems");
    const userAuth = localStorage?.getItem("userAuth");

    if (userAuth) {
      const userData = JSON.parse(userAuth);
      dispatch(setIsAuthenticated(userData));
    }
    if (userInfo) {
      const user = JSON.parse(userInfo);
      dispatch(loginInfo(user));
    }

    if (cartItems) {
      const cart = JSON.parse(cartItems);
      console.log(cart);
      dispatch(setCartData(cart));
    }
    if (savedItems) {
      const savedCart = JSON.parse(savedItems);
      console.log(savedCart);
      dispatch(setSaveForLater(savedCart));
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MasterLayout />}>
            <Route index element={<HomePage />} />
            <Route path="signup" element={<SignupPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="wishlist" element={<WhishlistPage />} />
            <Route
              path="/termsandconditions"
              element={<TermsAndConditions />}
            />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
            <Route
              path="productdetails/:productId"
              element={<ProductDetailsPage />}
            />
            <Route
              path="orderlist"
              element={
                <ProtectedPages>
                  <OrdersListPage />
                </ProtectedPages>
              }
            />
            <Route
              path="our-team"
              element={
                <ProtectedPages>
                  <Ourteam />
                </ProtectedPages>
              }
            />
            <Route path="cart" element={<CartPage />} />
            <Route path="search" element={<Search />} />
            <Route
              path="checkout"
              element={
                <ProtectedPages>
                  <Checkout />
                </ProtectedPages>
              }
            />
            <Route
              path="profile"
              element={
                <ProtectedPages>
                  <Profile />
                </ProtectedPages>
              }
            />
            <Route
              path="order"
              element={
                <ProtectedPages>
                  <OrdersListPage />
                </ProtectedPages>
              }
            />
            <Route
              path="support"
              element={
                <ProtectedPages>
                  <SupportPage />
                </ProtectedPages>
              }
            />

            <Route
              path="ewaybill"
              element={
                <ProtectedPages>
                  <EWayBill />
                </ProtectedPages>
              }
            />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
