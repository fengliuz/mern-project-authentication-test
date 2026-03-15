import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import api from "../lib/api";
import { Warehouse, Plus, ArrowRight, Package, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const HomePage = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        const res = await api.get("/warehouse");
        setWarehouses(res.data.data);
      } catch (error) {
        toast.error(
          "Failed to load warehouses, " + error.response.data.message,
        );
      } finally {
        setLoading(false);
      }
    };
    fetchWarehouses();
  }, []);

  const handleEnterWarehouse = (id, name) => {
    // Simpan ke localStorage agar Interceptor & Navbar tahu gudang mana yang aktif
    localStorage.setItem("activeWarehouseId", id);
    localStorage.setItem("activeWarehouseName", name);

    toast.success(`Entering ${name}...`);
    // Arahkan ke halaman produk gudang tersebut
    navigate("/product");
  };

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-primary">Your Warehouses</h1>
          <p className="opacity-70">
            Select a warehouse to manage your inventory and stocks.
          </p>
        </div>
        <button
          onClick={() => navigate("/create-warehouse")}
          className="btn btn-primary shadow-lg"
        >
          <Plus size={20} /> New Warehouse
        </button>
      </div>

      {/* Warehouse Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {warehouses.map((wh) => (
          <div
            key={wh._id}
            className="card bg-base-100 shadow-xl border border-primary/10 hover:border-primary/40 transition-all group"
          >
            <div className="card-body">
              <div className="flex justify-between items-start">
                <div className="bg-primary/10 p-3 rounded-2xl text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <Warehouse size={28} />
                </div>
                <div className="badge badge-outline opacity-50 text-[10px]">
                  ID: {wh._id.slice(-5)}
                </div>
              </div>

              <h2 className="card-title mt-4 text-xl">{wh.name}</h2>
              <p className="text-sm opacity-60 line-clamp-2">
                {wh.description ||
                  "No description provided for this warehouse."}
              </p>

              <div className="divider my-2"></div>

              <div className="card-actions justify-between items-center">
                <div className="flex items-center text-success gap-2 opacity-70">
                  <Package size={16} />
                  <span className="text-xs font-medium ">Inventory Active</span>
                </div>
                <button
                  onClick={() => handleEnterWarehouse(wh._id, wh.name)}
                  className="btn btn-primary btn-sm gap-2"
                >
                  Enter <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Empty State / Add New Placeholder */}
        {warehouses.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center p-12 bg-base-200/50 rounded-3xl border-2 border-dashed border-base-content/20">
            <Warehouse size={48} className="opacity-20 mb-4" />
            <p className="font-bold opacity-50">No warehouses found.</p>
            <button
              onClick={() => navigate("/create-warehouse")}
              className="btn btn-link btn-primary"
            >
              Create your first warehouse
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
