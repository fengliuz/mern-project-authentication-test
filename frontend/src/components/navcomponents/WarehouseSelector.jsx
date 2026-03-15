import { ChevronDown, Warehouse } from "lucide-react";
import { Link } from "react-router";

const WarehouseSelector = ({ activeWarehouseName, isTop, isRight, isLeft }) => (
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
    </ul>
  </div>
);
export default WarehouseSelector