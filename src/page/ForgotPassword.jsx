import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  // checkLoggedInUserAsync,
  selectLoggedInUser,
  selectError,
  resetPasswordRequestAsync,
  selectMailSent,
} from "../features/Auth/authSlice";
import { Navigate } from "react-router-dom";
export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const error = useSelector(selectError);
  const user = useSelector(selectLoggedInUser);
  const mailSent=useSelector(selectMailSent)
  const dispatch = useDispatch();
  const onSubmit = (data) => {
   dispatch(resetPasswordRequestAsync(data.email))
  };
  console.log(mailSent)
  return (
    <>
      {user && <Navigate to="/" replace={true}></Navigate>}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-10 w-auto" src={logo} alt="Logo" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Enter your email to reset password
          </h2>
        </div>
        {
          mailSent && <p className="text-green-400">Mail Sent!</p>
        }

        {error && <p className="text-red-400 underline mt-2 mx-auto font-bold capitalize -tracking-tighter">{error.message}</p>}

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...register("email", {
                    required: "Please enter your email",
                  })}
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.email && (
                  <span className=" text-red-400">{errors.email.message}</span>
                )}
              </div>
            </div>



            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Send Email
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Send me back to{" "}
            <Link
              to={"/login"}
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
