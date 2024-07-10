/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllProductsAsync,
  selectAllProducts,
} from "../features/ProductList/productSlice";
import { useEffect } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { selectLoggedInUser } from "../features/Auth/authSlice";

export default function Products({handlePage,page,setPage,totalItems}) {
  const dispatch = useDispatch();

  const products = useSelector(selectAllProducts);
  const user = useSelector(selectLoggedInUser);

  useEffect(() => {
    dispatch(fetchAllProductsAsync());
  }, [dispatch]);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
        {user.role === "admin" && (
          <div>
            <Link
              to="/admin/product-form"
              className="rounded-md my-5 bg-green-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add New Product
            </Link>
          </div>
        )}

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {products.data?.map((product) => {
            const averageRating = Math.round(product.rating);
            return (
              <div key={product.id} className="group relative">
                <div
                  className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80"
                >
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between gap-3">
                  <div className="overflow-hidden whitespace-nowrap">
                    <h3 className="text-sm text-gray-700 truncate">
                      <Link to={`/productdetail/${product.id}`}>
                        {product.title}
                      </Link>
                    </h3>
                    <div className="mt-1 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {Array.from({ length: averageRating }, (_, index) => (
                            <StarIcon
                              key={index}
                              className="h-4 w-4 text-yellow-500"
                            />
                          ))}
                        </div>
                        <span className="text-md">{averageRating}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-center">
                    <p className="text-sm font-medium text-green-600">
                      $
                      {Math.round(
                        product.price -
                          product.price * (product.discountPercentage / 100)
                      )}
                    </p>
                    <p className="text-sm font-medium text-red-400 line-through">
                      ${product.price}
                    </p>
                  </div>
                  {product.deleted && (
                    <div>
                      <p className="text-sm text-red-400">product deleted</p>
                    </div>
                  )}
                </div>
                {user.role === "admin" && (
                  <div className="mt-5">
                    <Link
                      to={`/admin/product-form/edit/${product.id}`}
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Edit Product
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <Pagination handlePage={handlePage} page={page} setPage={setPage} totalItems={totalItems}/>
    </div>
  );
}
