import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import Loader from "./component/Loader";
import Protected from "./features/Auth/Protected";
import { fetchItemByUserIdAsync } from "./features/Cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "./features/Auth/authSlice";

const Home = lazy(() => import("./page/Home"));
const Login = lazy(() => import("./page/Login"));
const Signup = lazy(() => import("./page/Signup"));
const Checkout = lazy(() => import("./page/Checkout"));
const ProductDetail = lazy(() => import("./page/ProductDetail"));
const Cart = lazy(() => import("./component/Cart"));

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
    path: "/pay",
    element: (
      <Suspense fallback={<Loader />}>
        <Protected>
          <Checkout />
        </Protected>
      </Suspense>
    ),
  },
]);

export function App() {
  const user=useSelector(selectLoggedInUser)
  const dispatch=useDispatch()
  useEffect(()=>{
    if(user){
      dispatch(fetchItemByUserIdAsync(user.id))
    }
  },[dispatch,user])

  return <RouterProvider router={router} />;
}
