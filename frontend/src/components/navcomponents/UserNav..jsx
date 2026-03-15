import { Link } from "react-router";
import { Box, LayoutGrid, LogOutIcon, PaletteIcon, Warehouse } from "lucide-react";

const UserNav = ({user,isRight,isLeft,logout,themes,onSelectedTheme}) => {
  return (
    <div
      className={`dropdown dropdown-end ${isRight ? "dropdown-left" : ""}${
        isLeft ? "dropdown-right" : ""
      }
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
        <div className="collapse collapse-arrow join-item border-none">
          <input type="checkbox" className="min-h-0" />
          <div className="collapse-title p-0 min-h-0 flex items-center gap-3 px-4 py-2 hover:bg-base-content/5 rounded-lg cursor-pointer">
            <PaletteIcon size={18} /> Theme:{" "}
            <span className="capitalize">{localStorage.getItem("theme")}</span>
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
  );
};
export default UserNav