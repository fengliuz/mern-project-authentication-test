import { useEffect, useState } from "react";
import api from "../lib/api";
import toast from "react-hot-toast";
import {
  Package,
  PlusCircle,
  Search,
  AlertTriangle,
  MoreVertical,
  Layers,
  Box,
  Info,
  SearchCheckIcon,
  SearchCode,
  DeleteIcon,
  Edit2Icon,
} from "lucide-react";
import AddProduct from "../components/AddProduct";

const ProductManagerPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const activeWarehouseId = localStorage.getItem("activeWarehouseId");
  const activeWarehouseName = localStorage.getItem("activeWarehouseName");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/product?warehouseId=${activeWarehouseId}`);
      setProducts(res.data.data);
    } catch (error) {
      toast.error("Gagal memuat produk", error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (id) => {
    try {
      const res = await api.delete(`/product/${id}`);
      toast.success(res.data.message);
      fetchProducts();
    } catch (error) {
      toast.error("Gagal hapus produk", error.response.data.message);
    }
  };

  useEffect(() => {
    if (activeWarehouseId) fetchProducts();
    // eslint-disable-next-line
  }, [activeWarehouseId]);

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-6 p-4 lg:p-8 min-h-screen bg-base-200/50">
      {/* HEADER: Keren & Minimalis */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-primary mb-1">
            <Package size={20} className="animate-pulse" />
            <span className="text-xs font-black tracking-widest uppercase opacity-70">
              Inventory System
            </span>
          </div>
          <h1 className="text-4xl font-black text-base-content tracking-tight">
            {activeWarehouseName || "Warehouse"}
          </h1>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => {
              setIsFormOpen(!isFormOpen);
              setIsEditFormOpen(false);
            }}
            className={`btn ${
              isFormOpen ? "btn-error" : "btn-primary"
            } shadow-lg group`}
          >
            {isFormOpen ? (
              "Cancel"
            ) : (
              <>
                <PlusCircle
                  size={20}
                  className="group-hover:rotate-90 transition-transform"
                />{" "}
                New Product
              </>
            )}
          </button>
        </div>
      </div>

      {/* FORM SECTION */}
      {!isEditFormOpen && isFormOpen && (
        <div className="flex justify-center animate-in zoom-in-95 duration-300">
          <AddProduct
            onSuccess={() => {
              setIsFormOpen(false);
              fetchProducts();
            }}
            onClose={() => {
              setIsFormOpen(false);
            }}
            isEdit={false}
          />
        </div>
      )}
      {isEditFormOpen && !isFormOpen && (
        <div className="flex justify-center animate-in zoom-in-95 duration-300">
          <AddProduct
            onSuccess={() => {
              setIsEditFormOpen(false);
              fetchProducts();
            }}
            onClose={() => {
              setIsEditFormOpen(false);
              setSelectedProduct(null);
            }}
            isEdit={true}
            id={selectedProduct}
          />
        </div>
      )}

      {/* SEARCH BAR: Fokus ke Glassmorphism */}
      <div className="relative group max-w-2xl flex items-center">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30 group-focus-within:opacity-100 group-focus-within:text-primary transition-all"
          size={20}
        />
        <input
          type="text"
          placeholder="Cari SKU atau nama barang..."
          className="input input-lg w-full pl-12 bg-base-100 border-none shadow-inner focus:ring-2 focus:ring-primary/20 transition-all"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <SearchCode />
      </div>

      {/* GRID CARDS: Pengganti Tabel */}
      {loading ? (
        <div className="flex justify-center p-20">
          <span className="loading loading-dots loading-lg text-primary"></span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProducts.map((p) => {
            const isLowStock = p.stock <= p.minStock;
            return (
              <div
                key={p._id}
                className={`group card bg-base-100 shadow-sm hover:shadow-xl transition-all border-b-4 ${
                  isLowStock ? "border-error" : "border-secondary"
                }`}
              >
                <div className="card-body p-5">
                  {/* Category & Action */}
                  <div className="flex justify-between items-start mb-2">
                    <div className="badge badge-ghost badge-sm text-[10px] uppercase font-bold opacity-60">
                      {p.category?.name || "General"}
                    </div>
                    <div className="dropdown dropdown-end">
                      <button
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-xs btn-circle"
                      >
                        <MoreVertical size={14} />
                      </button>
                      <ul
                        tabIndex={0}
                        className="dropdown-content menu p-2 shadow  rounded-box w-40 z-1 bg-base-200"
                      >
                        <li className="text-blue-400">
                          <button
                            onClick={() => {
                              setSelectedProduct(p._id);
                              setIsEditFormOpen(true);
                            }}
                          >
                            <Edit2Icon /> Edit
                          </button>
                        </li>
                        <li className="text-error">
                          <button onClick={() => handleDelete(p._id)}>
                            <DeleteIcon /> Delete
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Product Info */}
                  <h2 className="card-title text-lg font-black leading-tight group-hover:text-primary transition-colors">
                    {p.name}
                  </h2>
                  <p className="text-[10px] font-mono opacity-40 uppercase tracking-tighter mb-4">
                    SKU: {p.sku || "N/A"}
                  </p>

                  {/* Stock Visualizer */}
                  <div
                    className={`p-4 rounded-2xl flex items-end justify-between ${
                      isLowStock
                        ? "bg-error/10 text-error"
                        : "bg-secondary/10 text-secondary"
                    }`}
                  >
                    <div>
                      <p className="text-[10px] uppercase font-black opacity-60">
                        Current Stock
                      </p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-black">{p.stock}</span>
                        <span className="text-xs font-bold uppercase">
                          {p.unit}
                        </span>
                      </div>
                    </div>
                    {isLowStock && (
                      <AlertTriangle
                        size={24}
                        className="mb-1 animate-bounce"
                      />
                    )}
                  </div>

                  {/* Footer Info */}
                  <div className="mt-4 flex items-center justify-between text-[10px] font-bold opacity-50 uppercase">
                    <div className="flex items-center gap-1">
                      <Layers size={12} /> Min: {p.minStock}
                    </div>
                    <div className="flex items-center gap-1">
                      <Box size={12} /> Ready
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="col-span-full py-20 text-center opacity-20">
              <Info size={48} className="mx-auto mb-2" />
              <p className="font-black italic">NO PRODUCTS FOUND</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductManagerPage;
