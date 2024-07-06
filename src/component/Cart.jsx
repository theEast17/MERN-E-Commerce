import { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartItem } from "../features/Cart/cartSlice";
import { useDispatch } from "react-redux";
import { updateCartAsync, deleteCartAsync } from "../features/Cart/cartSlice";

export default function Cart() {
  const [open, setOpen] = useState(true);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const products = useSelector(selectCartItem);

  const totalAmount = products.reduce(
    (amount, item) => item.price * item.quantity + amount,
    0
  );
  const totalItems = products.reduce((total, item) => item.quantity + total, 0);

  const handleQuantity = (e, product) => {
    dispatch(updateCartAsync({ ...product, quantity: +e.target.value }));
  };

  const handleDelete = (id) => {
    dispatch(deleteCartAsync(id));
  };

  return (
    <>
      {!products.length && <Navigate to="/" replace={true}></Navigate>}
      <Dialog
        className="fixed inset-0 z-10 overflow-y-auto"
        open={open}
        onClose={setOpen}
      >
        <div className="flex items-center justify-center min-h-screen p-4 text-center sm:p-0">
          <div
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            aria-hidden="true"
          ></div>

          <DialogPanel className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 ">
              <div className="flex items-center justify-between flex-row-reverse">
                <div className=" cursor-pointer flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <XMarkIcon
                    className="h-6 w-6 text-red-600"
                    aria-hidden="true"
                    onClick={() => navigate("/")}
                  />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    Shopping cart
                  </DialogTitle>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:px-6 sm:pb-4">
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {products.map((product) => (
                    <li key={product.id} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={product.thumbnail}
                          alt={product.title}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <Link to={`/productdetail/${product.id}`}>
                                {product.title}
                              </Link>
                            </h3>
                            <p className="ml-4">${product.price}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            {product.brand}
                          </p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="text-gray-500">
                            Qty
                            <select
                              name="quantity"
                              className="border ml-2 p-1"
                              value={product.quantity}
                              onChange={(e) => handleQuantity(e, product)}
                            >
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                            </select>
                          </div>

                          <div className="flex">
                            <button
                              type="button"
                              onClick={() => handleDelete(product.id)}
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-gray-50 border px-4 py-3">
              <div className="flex flex-col justify-between text-base font-medium text-gray-900 w-full">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <p>${totalAmount}</p>
                </div>
                <div>
                  <div className="flex justify-between">
                    <p>Total Items</p>
                    <p>{totalItems} Items</p>
                  </div>
                </div>

                <p className="mt-0.5 text-sm text-gray-500 w-full">
                  Shipping and taxes calculated at checkout.
                </p>
              </div>

              <div className="mt-6 w-full">
                <Link
                  to={"/checkout"}
                  className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                >
                  Checkout
                </Link>
              </div>
              <div className="mt-6 flex justify-center text-center text-sm text-gray-500 w-full">
                <p>
                  or{" "}
                  <button
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                    onClick={() => navigate("/")}
                  >
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </button>
                </p>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
