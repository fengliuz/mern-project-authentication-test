import { Link, useLocation } from "react-router";
import { useAuth } from "../auth/AuthContext";
import {
  LogOutIcon,
  PaletteIcon,
  Box,
  LayoutGrid,
  Warehouse,
  ChevronDown,
  Settings2,
} from "lucide-react";

const Navbar = ({ onSelectedTheme, position, setPosition }) => {
  const { appName, user, logout } = useAuth();
  const location = useLocation();
  const activeWarehouseName =
    localStorage.getItem("activeWarehouseName") || "Warehouse";
  const themes = [
    "forest",
    "coffee",
    "sunset",
    "dracula",
    "night",
    "synthwave",
    "halloween",
  ];

  // Helper untuk styling link aktif
  const navLinkClass = (path) => `
  flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-400 font-medium
  ${
    location.pathname === path
      ? "bg-primary text-white shadow-md"
      : "text-base-100 hover:bg-primary/60 hover:text-white"
  }
  `;
  const isVertical = position === "left" || position === "right";
  const isLeft = position === "left";
  const isRight = position === "right";
  const isTop = position === "top";
  console.log(isVertical);
  return (
    <nav
      className={`navbar bg-secondary/80 backdrop-blur-md sticky top-0 z-50 px-4 md:px-8 shadow-lg border-b border-primary/10 ${
        isVertical
          ? "w-64 h-screen flex flex-col border-r"
          : "w-full sticky top-0 border-b"
      }${position === "right" ? "border-l border-r-0 order-last" : ""}`}
    >
      <div
        className={`flex ${
          isVertical
            ? "flex-col h-full p-6"
            : " justify-between items-center w-full"
        }`}
      >
        {/* KIRI: Logo & Info Warehouse */}
        <div
          className={`flex ${
            isVertical ? "flex-col h-full p-6" : " items-center "
          }`}
        >
          <Link
            to="/"
            className={`${
              isVertical
                ? "mb-10 text-center text-2xl font-black"
                : "text-md lg:text-2xl font-black text-base-100 drop-shadow-md"
            }`}
          >
            {appName}
          </Link>

          {/* DESKTOP NAV: Muncul hanya di layar besar */}
          {user && (
            <div
              className={`flex ${
                isVertical
                  ? "flex-col flex-1 gap-2"
                  : "hidden lg:flex items-center gap-2"
              }`}
            >
              <Link to="/category" className={navLinkClass("/category")}>
                <LayoutGrid size={18} /> Categories
              </Link>
              <Link to="/product" className={navLinkClass("/product")}>
                <Box size={18} /> Products
              </Link>
              <Link to="/transaction" className={navLinkClass("/transaction")}>
                <Warehouse size={18} /> Transactions
              </Link>
            </div>
          )}
        </div>

        {/* KANAN: Warehouse Info & Profile */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              {/* Warehouse Selector Pill */}
              <div
                className={`dropdown ${isTop ? "" : "dropdown-end"} ${
                  isRight ? "dropdown-left" : ""
                }${isLeft ? "dropdown-right" : ""}
`}
              >
                <div
                  tabIndex={0}
                  role="button"
                  className="flex items-center gap-2 bg-base-100/70 px-3 py-1.5 rounded-full border border-primary/20 hover:bg-base-100 transition-all cursor-pointer"
                >
                  <Warehouse size={16} className="text-primary" />
                  <span className="text-xs font-bold text-primary truncate max-w-10 md:max-w-37.5">
                    {activeWarehouseName}
                  </span>
                  <ChevronDown size={14} className="text-primary/50" />
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow-xl bg-base-100 rounded-box w-52 mt-2 border border-primary/10"
                >
                  <li className="menu-title text-primary/50 text-[10px] uppercase">
                    Switch Warehouse
                  </li>
                  <li>
                    <Link to="/select-warehouse">Manage Warehouses</Link>
                  </li>
                </ul>
              </div>

              <div
              className={`hidden md:block dropdown ${isTop ? "dropdown-start dropdown-left" : "dropdown-end"} ${
                  isRight ? "dropdown-left" : ""
                }${isLeft ? "dropdown-right" : ""}
`}
              >
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-sm btn-circle"
                >
                  <Settings2 size={18} />
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40 border border-primary/20"
                >
                  <li className="menu-title">Layout</li>
                  <li>
                    <button onClick={() => setPosition("top")}>Top</button>
                  </li>
                  <li>
                    <button onClick={() => setPosition("left")}>
                      Left Sidebar
                    </button>
                  </li>
                  <li>
                    <button onClick={() => setPosition("right")}>
                      Right Sidebar
                    </button>
                  </li>
                </ul>
              </div>
              <div
               className={`dropdown dropdown-end ${
                  isRight ? "dropdown-left" : ""
                }${isLeft ? "dropdown-right" : ""}
`}
              >
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar border-2 border-primary/30"
                >
                  <div className="w-10 rounded-full">
                    <img
                      src={
                        user?.avatar ||
                        "https://ui-avatars.com/api/?name=" + user.username
                      }
                      alt="avatar"
                    />
                  </div>
                </div>

                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow-2xl bg-base-100 rounded-box w-64 mt-3 border border-primary/10 gap-1"
                >
                  <li className="px-4 py-3 border-b border-base-content/10 mb-2">
                    <p className="text-[10px] uppercase opacity-50 font-bold">
                      Logged in as
                    </p>
                    <p className="font-bold text-primary">{user.username}</p>
                  </li>

                  {/* MOBILE ONLY NAV: Muncul di dropdown saat layar kecil */}
                  <div className="lg:hidden">
                    <li className="menu-title text-[10px] uppercase opacity-50">
                      Navigation
                    </li>
                    <li>
                      <Link to="/category">
                        <LayoutGrid size={18} /> Categories
                      </Link>
                    </li>
                    <li>
                      <Link to="/product">
                        <Box size={18} /> Products
                      </Link>
                    </li>
                    <li>
                      <Link to="/transaction">
                        <Warehouse size={18} /> Transactions
                      </Link>
                    </li>
                    <div className="divider my-1"></div>
                  </div>

                  <li className="menu-title text-[10px] uppercase opacity-50">
                    Appearance
                  </li>
                  <div className="collapse collapse-arrow join-item border-none">
                    <input type="checkbox" className="min-h-0" />
                    <div className="collapse-title p-0 min-h-0 flex items-center gap-3 px-4 py-2 hover:bg-base-content/5 rounded-lg cursor-pointer">
                      <PaletteIcon size={18} /> Theme:{" "}
                      <span className="capitalize">
                        {localStorage.getItem("theme")}
                      </span>
                    </div>
                    <div className="collapse-content p-0">
                      <ul className="bg-base-200/50 rounded-lg mt-1 max-h-40 overflow-y-auto">
                        {themes.map((t) => (
                          <li key={t}>
                            <button
                              onClick={() => onSelectedTheme(t)}
                              className="text-sm capitalize"
                            >
                              {t}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="divider my-1"></div>

                  <li>
                    <button
                      onClick={logout}
                      className="text-error hover:bg-error/10 font-bold"
                    >
                      <LogOutIcon size={18} /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link
                to="/login"
                className="btn btn-primary btn-sm md:btn-md text-white font-bold"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="btn btn-sm md:btn-md btn-primary text-white font-bold"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
