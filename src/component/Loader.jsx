import { ImSpinner9 } from "react-icons/im";
const Loader = () => {
  return (
    <span className="h-screen w-full text-3xl flex items-center justify-center"><ImSpinner9 className="animate-spin text-red-700"/></span>
  )
}

export default Loader