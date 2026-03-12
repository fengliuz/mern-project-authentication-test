import { useNavigate } from "react-router";

const RegisterPage = () => {
    const navigate = useNavigate()
    const handleGoogleLogin = (e)=>{
        e.preventDefault()
        window.location.href="http://localhost:5001/auth/google"
    }
  return (
    <div className="flex justify-center items-center  min-h-full">
      <form className="w-full">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
          <div className="w-full bg-secondary/50 rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <p className="text-xl font-bold leading-tight tracking-tight text-success md:text-2xl">
                Create an account
              </p>
              <div>
                <label className="block mb-2 text-sm font-medium text-success text-shadow-md text-shadow-slate-700">
                  Your username
                </label>
                <input
                  placeholder="JohnDoe"
                  className="bg-gray-50 border border-gray-300 text-success sm:text-sm rounded-lg block w-full p-2.5"
                  id="username"
                  type="text"
                ></input>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-success text-shadow-md text-shadow-slate-700">
                  Password
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-success sm:text-sm rounded-lg block w-full p-2.5"
                  placeholder="••••••••"
                  id="password"
                  type="password"
                ></input>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-success text-shadow-md text-shadow-slate-700">
                  Confirm password
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-success sm:text-sm rounded-lg block w-full p-2.5"
                  placeholder="••••••••"
                  id="confirmPassword"
                  type="password"
                ></input>
              </div>
              <div className="divider">OR</div>
              <button
                onClick={handleGoogleLogin}
                className="btn-outline hover:btn-secondary hover:btn-soft btn btn-primary cursor-pointer "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 488 512"
                >
                  <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
                </svg>
                Continue With Google
              </button>
              <button
                className="w-full bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  focus:ring-blue-800 text-white"
                type="submit"
              >
                Create an account
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default RegisterPage;
