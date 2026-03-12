import { Link } from "react-router";
import { useAuth } from "../auth/AuthContext";
import { LogOutIcon, PaletteIcon } from "lucide-react";

const Navbar = ({ onSelectedTheme }) => {
  const { appName, user, logout } = useAuth();
  console.log(user)
  const handleLogout = async (e) => {
    e.preventDefault();
    await logout();
  };
  const themes = [
    "forest",
    "coffee",
    "sunset",
    "dracula",
    "night",
    "synthwave",
    "halloween",
  ];
  return (
    <nav className="navbar bg-secondary/65 ">
      <div className="flex justify-between items-center px-0 md:px-5 lg:px-9 w-full text-primary font-bold  text-shadow-slate-900 text-shadow-sm">
        <p className="text-md lg:text-2xl ">{appName}</p>
        {user ? (
          <div className="flex">
            <Link>{user.username}</Link>
            <Link>
              <img src={user.avatar} alt="User Profile" />
            </Link>
            <button onClick={handleLogout}>
              Logout <LogOutIcon></LogOutIcon>
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-around gap-1 lg:gap-5">
            <Link
              className="btn-sm lg:btn-lg   hover:text-accent btn btn-outline  bg-base-100/60 transition duration-300"
              to={"/login"}
            >
              Login
            </Link>
            <Link
              className="btn-sm lg:btn-lg hover:text-accent btn btn-outline  bg-base-100/60 transition duration-300"
              to={"/register"}
            >
              Register
            </Link>
            <div className="dropdown dropdown-end ">
              <div tabIndex={0} role="button" className="btn m-0 lg:m-auto">
                <p className=" hidden lg:block">{localStorage.getItem("theme")}</p><PaletteIcon />
              </div>
              <ul
                tabIndex="-1"
                className="dropdown-content menu bg-base-100/50 rounded-box z-1 w-52 p-2 shadow-sm"
              >
                {themes.map((t) => (
                  <li key={t}>
                    <button onClick={() => onSelectedTheme(`${t}`)}>{t}</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
