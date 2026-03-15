import toast from "react-hot-toast";
import { Navigate, Outlet } from "react-router";

const WarehouseProtectedRoute = () => {
  const activeWarehouseId = localStorage.getItem("activeWarehouseId");

  if (!activeWarehouseId) {
    toast.error("Please enter a spesific Warehouse first")
    return <Navigate to={"/"} />;
  }

  return <Outlet />;
};

export default WarehouseProtectedRoute;