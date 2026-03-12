import { Link } from "react-router";
import { useAuth } from "../auth/AuthContext";
import { LogOutIcon } from "lucide-react";

const Navbar = () => {
  const { appName, user, logout } = useAuth();
    const handleLogout = async(e)=>{
        e.preventDefault()
        await logout()
    }
  return (
    <nav className="navbar bg-secondary/65 ">
        <div className="flex justify-between items-center px-0 md:px-5 lg:px-9 w-full text-primary font-bold  text-shadow-slate-900 text-shadow-sm">
          {appName}
          {user ? (
            <div className="flex">
              <Link>{user.username}</Link>
              <Link>
                <img src={user.avatar} alt="User Profile" />
              </Link>
              <button onClick={handleLogout}>Logout <LogOutIcon></LogOutIcon></button>
            </div>
          ) : (
            <div className="flex justify-around gap-5">
                <Link className=" hover:text-accent btn btn-outline  bg-base-100/60 transition duration-300" to={"/login"}>Login</Link>
                <Link className=" hover:text-accent btn btn-outline  bg-base-100/60 transition duration-300" to={"/register"}>Register</Link>
            </div>
          )}
        </div>
    </nav>
  );
};
export default Navbar;
