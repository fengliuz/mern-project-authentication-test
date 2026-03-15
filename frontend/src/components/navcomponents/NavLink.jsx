import { Box, LayoutGrid, Warehouse } from "lucide-react";
import { Link } from "react-router";

const NavLinks = ({ isVertical, navLinkClass, user }) => {
  if (!user) return null;
  return (
    <div className={`flex ${isVertical ? "flex-col flex-1 gap" : "hidden lg:flex items-center gap-2"}`}>
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
  );
};
export default NavLinks