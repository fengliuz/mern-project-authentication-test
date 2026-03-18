import { useEffect, useState } from "react";
import api from "../lib/api";
import toast from "react-hot-toast";
import {
  ArrowUpRight,
  ArrowDownLeft,
  History,
  Plus,
  Search,
  Calendar,
  Box,
  User,
  SmilePlus,
  Trash2,
} from "lucide-react";
import AddTransaction from "../components/AddTransaction";

const TransactionPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [formData, setFormData] = useState({
    productId: "",
    type: "IN", // 'in' atau 'out'
    quantity: 1,
    note: "",
  });

  const activeWarehouseId = localStorage.getItem("activeWarehouseId");
  const handleDelete = async (id) => {
    // Gunakan confirm sederhana atau library modal
    if (!window.confirm("Hapus transaksi ini? penghapusan ini tidak akan mengembalikan ke stock barang sebelumnya!")) return;

    try {
      await api.delete(`/transaction/${id}`);
      toast.success("Riwayat transaksi telah dihapus!");
      fetchData(); // Refresh data untuk melihat perubahan stok terbaru
    } catch (error) {
      toast.error(error.response?.data?.message || "Gagal menghapus transaksi");
    }
  };
  const fetchData = async () => {
    try {
      setLoading(true);
      // Fetch produk untuk dropdown & riwayat transaksi
      const [prodRes, transRes] = await Promise.all([
        api.get(`/product?warehouseId=${activeWarehouseId}`),
        api.get(`/transaction?warehouseId=${activeWarehouseId}`),
      ]);
      setProducts(prodRes.data.data);
      setTransactions(transRes.data.data);
    } catch (error) {
      toast.error("Gagal memuat data transaksi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeWarehouseId) fetchData();
  }, [activeWarehouseId]);

  return (
    <div className="flex flex-col gap-6 p-4 lg:p-8 min-h-screen bg-base-200/50">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-base-content uppercase tracking-tight">
            Stock Movement
          </h1>
          <p className="opacity-60 text-sm italic">
            Catat barang masuk dan keluar gudang.
          </p>
        </div>
        <button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className={`btn ${
            isFormOpen ? "btn-ghost" : "btn-secondary"
          } shadow-lg shadow-secondary/20`}
        >
          {isFormOpen ? (
            "Close"
          ) : (
            <>
              <Plus size={20} /> New Transaction
            </>
          )}
        </button>
      </div>

      {/* TRANSACTION FORM (GRID LAYOUT) */}
      {isFormOpen && (
        <div className="mb-8 animate-in slide-in-from-top-4 duration-300">
          <AddTransaction
            products={products}
            onSuccess={() => {
              setIsFormOpen(false);
              fetchData();
            }}
          />
        </div>
      )}

      {/* TRANSACTION LOG (LIST OF CARDS) */}
      <div className="flex flex-col gap-3">
        <h2 className="flex items-center gap-2 font-black opacity-50 uppercase text-xs tracking-widest">
          <History size={14} /> Recent Activity
        </h2>

        {loading ? (
          <div className="flex justify-center p-10">
            <span className="loading loading-ring loading-lg"></span>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {transactions.map((t) => (
              <div
                key={t._id}
                className="card card-side bg-base-100 shadow-sm border border-base-300 hover:border-primary/30 transition-all overflow-hidden"
              >
                {/* Type Indicator Bar */}
                <div
                  className={`w-2 ${
                    t.type === "IN" ||
                    (t.type === "TRANSFER" &&
                      t.toWarehouseId?._id === activeWarehouseId)
                      ? "bg-success"
                      : "bg-error"
                  }`}
                ></div>

                <div className="card-body p-4 flex flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-3 rounded-full ${
                        t.type === "IN" ||
                        (t.type === "TRANSFER" &&
                          t.toWarehouseId?._id === activeWarehouseId)
                          ? "bg-success/10 text-success"
                          : "bg-error/10 text-error"
                      }`}
                    >
                      {t.type === "IN" ? <ArrowDownLeft /> : <ArrowUpRight />}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg leading-none">
                        {t.product?.name || "Deleted Product"}
                      </h3>
                      <div className="flex items-center gap-3 mt-1 opacity-50 text-[10px] font-bold uppercase">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />{" "}
                          {new Date(t.createdAt).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Box size={12} /> SKU: {t.productId?.sku || "-"}
                        </span>

                        <span className="flex items-center gap-1">
                          <SmilePlus size={12} /> Operator:{" "}
                          {t.operator?.username || "-"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right flex gap-2">
                    <div className="">
                      <p
                        className={`text-2xl font-black ${
                          t.type === "IN" ||
                          (t.type === "TRANSFER" &&
                            t.toWarehouseId?._id === activeWarehouseId)
                            ? "text-success"
                            : "text-error"
                        }`}
                      >
                        {t.type === "IN" ||
                        (t.type === "TRANSFER" &&
                          t.toWarehouseId?._id === activeWarehouseId)
                          ? "+"
                          : "-"}
                        {t.quantity}
                      </p>
                      <p className="text-[10px] opacity-40 italic max-w-[150px] truncate">
                        {t.note || "No notes"}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDelete(t._id)}
                      className="btn btn-ghost btn-xs text-error hover:bg-error/10 p-1 h-auto min-h-0"
                      title="Delete & Revert Stock"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {transactions.length === 0 && (
              <div className="text-center py-20 opacity-30 italic">
                No transactions recorded yet.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionPage;
