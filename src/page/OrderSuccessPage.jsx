import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, Navigate, useParams } from "react-router-dom";
import { resetCartAsync } from "../features/Cart/cartSlice";
import { resetOrder } from "../features/Order/orderSlice";

export default function OrderSuccess() {
  const orderId = useParams().id;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetCartAsync());
    dispatch(resetOrder());
  }, [dispatch]);
  return (
    <>
      {!orderId && <Navigate to="/" replace={true}></Navigate>}
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-indigo-600">
            Order successfully placed
          </p>
          <h1 className="mt-4 text-3xl capitalize font-bold tracking-tight text-gray-900 sm:text-5xl">
            Order id : {orderId}
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            You can check your order in My Account {">"} My orders
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to={"/"}
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
