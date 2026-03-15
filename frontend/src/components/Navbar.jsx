import { Link } from "react-router";
import { useAuth } from "../auth/AuthContext";
import { LogOutIcon, PaletteIcon } from "lucide-react";

const Navbar = ({ onSelectedTheme }) => {
  const { appName, user, logout } = useAuth();
  console.log(user);
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
        <Link to={`/`} className="text-md lg:text-2xl ">{appName}</Link>
        {user ? (
          <div className="flex gap-5 justify-center items-center">
            <Link>{user.username}</Link>
            <Link className=" hidden md:block">
              <img
                src={`${user?.avatar || "https://as1.ftcdn.net/v2/jpg/05/16/27/58/1000_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg"}`}
                className=" size-10 rounded-full border-secondary border-2 "
              />
            </Link>
            <button
              className=" text-error  lg:btn lg:btn-outline lg:bg-base-100/40"
              onClick={handleLogout}
            >
              <p className=" hidden md:block">Logout</p> <LogOutIcon></LogOutIcon>
            </button>
             <div className="dropdown dropdown-end ">
              <div tabIndex={0} role="button" className="btn m-0 lg:m-auto">
                <p className=" hidden lg:block">
                  {localStorage.getItem("theme")}
                </p>
                <PaletteIcon />
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
                <p className=" hidden lg:block">
                  {localStorage.getItem("theme")}
                </p>
                <PaletteIcon />
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
