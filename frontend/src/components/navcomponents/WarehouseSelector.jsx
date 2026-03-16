import { ChevronDown, Warehouse } from "lucide-react";
import { Link } from "react-router";
import { Box, LayoutGrid, LogOutIcon, PaletteIcon } from "lucide-react";

const WarehouseSelector = ({ activeWarehouseName, isTop, isRight, isLeft,children }) => (
  <div className={`dropdown ${isTop ? "dropdown-bottom dropdown-end" : "dropdown-end"} ${isRight ? "dropdown-left" : ""} ${isLeft ? "dropdown-right" : ""}`}>
    <div tabIndex={0} role="button" className="flex items-center gap-2 bg-base-100/70 px-3 py-1.5 rounded-full border border-primary/20 hover:bg-base-100 transition-all cursor-pointer">
      <Warehouse size={16} className="text-primary" />
      <span className="text-xs font-bold text-primary truncate max-w-15 md:max-w-37.5">
        {activeWarehouseName}
      </span>
      <ChevronDown size={14} className="text-primary/50" />
    </div>
    <ul tabIndex={0} className="dropdown-content menu p-2 shadow-xl bg-base-100 rounded-box w-52 mt-2 border border-primary/10">
      <li className="menu-title text-primary/50 text-[10px] uppercase">Switch Warehouse</li>
      <li><Link to="/">Manage Warehouses</Link></li>
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
        {children}
    </ul>
  </div>
);
export default WarehouseSelector