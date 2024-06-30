import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "./component/Loader";

const Home = lazy(() => import("./page/Home"));
const Login = lazy(() => import("./page/Login"));
const Signup = lazy(() => import("./page/Signup"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loader />}>
        <Home />
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
]);

export function App() {
  return <RouterProvider router={router} />;
}
