import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import Loader from "./component/Loader";
import Protected from "./features/Auth/Protected";
import { fetchItemByUserIdAsync } from "./features/Cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  checkAuthAsync,
  // checkLoggedInUserAsync,
  selectLoggedInUser,
} from "./features/Auth/authSlice";
import ProtectedAdmin from "./features/Auth/ProtectedAdmin";
import { getLoggedInUserByIdAsync } from "./features/User/userSlice";

const Home = lazy(() => import("./page/Home"));
const Login = lazy(() => import("./page/Login"));
const Signup = lazy(() => import("./page/Signup"));
const Checkout = lazy(() => import("./page/Checkout"));
const ProductDetail = lazy(() => import("./page/ProductDetail"));
const Cart = lazy(() => import("./component/Cart"));
const Page404 = lazy(() => import("./page/404"));
const OrderSuccess = lazy(() => import("./page/OrderSuccessPage"));
const UserOrders = lazy(() => import("./page/UserOrders"));
const UserProfile = lazy(() => import("./page/UserProfile"));
const Logout = lazy(() => import("./component/Logout"));
const ForgotPassword = lazy(() => import("./page/ForgotPassword"));
const StripeCheckout = lazy(() => import("./page/StripeCheckout"));
const AdminHome = lazy(() => import("./page/AdminPages/AdminHome"));
const AdminProductDetails = lazy(() =>
  import("./page/AdminPages/AdminProductDetails")
);
const AdminProductForm = lazy(() =>
  import("./page/AdminPages/AdminProductForm")
);
const AdminOrders = lazy(() => import("./page/AdminPages/AdminOrders"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loader />}>
        <Protected>
          <Home />
        </Protected>
      </Suspense>
    ),
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<Loader />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/signup",
    element: (
      <Suspense fallback={<Loader />}>
        <Signup />
      </Suspense>
    ),
  },
  {
    path: "/cart",
    element: (
      <Suspense fallback={<Loader />}>
        <Protected>
          <Cart />
        </Protected>
      </Suspense>
    ),
  },
  {
    path: "/checkout",
    element: (
      <Suspense fallback={<Loader />}>
        <Protected>
          <Checkout />
        </Protected>
      </Suspense>
    ),
  },
  {
    path: "/productdetail/:id",
    element: (
      <Suspense fallback={<Loader />}>
        <Protected>
          <ProductDetail />
        </Protected>
      </Suspense>
    ),
  },
  {
    path: "/order-success/:id",
    element: (
      <Suspense fallback={<Loader />}>
        <Protected>
          <OrderSuccess />
        </Protected>
      </Suspense>
    ),
  },
  {
    path: "/stripe-checkout/",
    element: (
      <Suspense fallback={<Loader />}>
        <Protected>
          <StripeCheckout />
        </Protected>
      </Suspense>
    ),
  },
  {
    path: "/my-orders",
    element: (
      <Suspense fallback={<Loader />}>
        <Protected>
          <UserOrders />
        </Protected>
      </Suspense>
    ),
  },
  {
    path: "/profile",
    element: (
      <Suspense fallback={<Loader />}>
        <Protected>
          <UserProfile />
        </Protected>
      </Suspense>
    ),
  },
  {
    path: "/logout",
    element: (
      <Suspense fallback={<Loader />}>
        <Protected>
          <Logout />
        </Protected>
      </Suspense>
    ),
  },
  {
    path: "/forgotpassword",
    element: (
      <Suspense fallback={<Loader />}>
        <ForgotPassword />
      </Suspense>
    ),
  },
  {
    path: "/admin",
    element: (
      <Suspense fallback={<Loader />}>
        <ProtectedAdmin>
          <AdminHome />
        </ProtectedAdmin>
      </Suspense>
    ),
  },
  {
    path: "/admin/product-details/:id",
    element: (
      <Suspense fallback={<Loader />}>
        <ProtectedAdmin>
          <AdminProductDetails />
        </ProtectedAdmin>
      </Suspense>
    ),
  },
  {
    path: "/admin/product-form",
    element: (
      <Suspense fallback={<Loader />}>
        <ProtectedAdmin>
          <AdminProductForm />
        </ProtectedAdmin>
      </Suspense>
    ),
  },
  {
    path: "/admin/product-form/edit/:id",
    element: (
      <Suspense fallback={<Loader />}>
        <ProtectedAdmin>
          <AdminProductForm />
        </ProtectedAdmin>
      </Suspense>
    ),
  },
  {
    path: "/admin/orders",
    element: (
      <Suspense fallback={<Loader />}>
        <ProtectedAdmin>
          <AdminOrders />
        </ProtectedAdmin>
      </Suspense>
    ),
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<Loader />}>
        <Page404 />
      </Suspense>
    ),
  },
]);

export function App() {
  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthAsync());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(fetchItemByUserIdAsync());
      dispatch(getLoggedInUserByIdAsync());
    }
  }, [dispatch, user]);

  return <RouterProvider router={router} />;
}
