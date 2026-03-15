import { Link, useLocation } from "react-router";
import { useAuth } from "../auth/AuthContext";
import NavLinks from "./navcomponents/NavLink";
import WarehouseSelector from "./navcomponents/WarehouseSelector";
import LayoutSettings from "./navcomponents/LayoutSettings";
import UserNav from "./navcomponents/UserNav.";

const Navbar = ({ onSelectedTheme, position, setPosition }) => {
  const { appName, user, logout } = useAuth();
  const location = useLocation();
  const activeWarehouseName =
    localStorage.getItem("activeWarehouseName") || "Warehouse";

  const isVertical = position === "left" || position === "right";
  const isTop = position === "top";
  const isLeft = position === "left";
  const isRight = position === "right";
  const themes = [
    "forest",
    "coffee",
    "sunset",
    "dracula",
    "night",
    "synthwave",
    "halloween",
  ];

  const navLinkClass = (path) => `
    flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-400 font-medium
    ${
      location.pathname === path
        ? "bg-primary text-white shadow-md"
        : "text-base-100 hover:bg-primary/60 hover:text-white"
    }
    ${isVertical ? "w-full" : ""}
  `;

  return (
    <nav
      className={`navbar bg-secondary/80 backdrop-blur-md sticky top-0 z-50 px-4 md:px-8 shadow-lg border-primary/10 transition-all duration-300
      ${isVertical ? "w-64 h-screen flex flex-col border-r" : "w-full border-b"}
      ${isRight ? "order-last border-l border-r-0" : ""}
    `}
    >
      <div
        className={`flex w-full ${
          isVertical
            ? "flex-col h-full pt-6 pr-4 "
            : "justify-between items-center"
        }`}
      >
        {/* AREA ATAS / KIRI */}
        <div
          className={`flex ${
            isVertical ? "flex-col h-full w-full" : "items-center"
          }`}
        >
          <Link
            to="/"
            className={`${
              isVertical
                ? "mb-10 text-center text-2xl font-black"
                : "text-md lg:text-2xl font-black text-base-100 drop-shadow-md mr-4"
            }`}
          >
            {appName}
          </Link>

          <NavLinks
            isVertical={isVertical}
            navLinkClass={navLinkClass}
            user={user}
          />
        </div>

        {/* AREA BAWAH / KANAN */}
        <div
          className={`flex items-center gap-3 ${
            isVertical
              ? "mt-auto pt-4 border-t border-white/10 w-full justify-center"
              : ""
          }`}
        >
          {user ? (
            <>
              <WarehouseSelector
                activeWarehouseName={activeWarehouseName}
                isTop={isTop}
                isRight={isRight}
                isLeft={isLeft}
              />
              <LayoutSettings
                setPosition={setPosition}
                isTop={isTop}
                isRight={isRight}
                isLeft={isLeft}
              />

              {/* Profile Dropdown tetap di sini karena paling kompleks */}
              <UserNav
                user={user}
                isRight={isRight}
                isLeft={isLeft}
                logout={logout}
                themes={themes}
                onSelectedTheme={onSelectedTheme}
              ></UserNav>
            </>
          ) : (
            <div className="flex gap-2">
              <Link to="/login" className="btn btn-primary btn-sm">
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
