import { useState, useEffect } from "react";
import api from "../lib/api";
import toast from "react-hot-toast";
import { MoveRight, ArrowDownCircle, ArrowUpCircle, NotepadText, Box, Warehouse } from "lucide-react";

const AddTransaction = ({ onSuccess, products }) => {
  const [loading, setLoading] = useState(false);
  const [warehouses, setWarehouses] = useState([]);
  const [formData, setFormData] = useState({
    productId: "",
    type: "IN", // in, OUT, TRANSFER
    quantity: 1,
    toWarehouseId: "", // Untuk fitur TRANSFER
    note: ""
  });

  const activeWarehouseId = localStorage.getItem("activeWarehouseId");

  useEffect(() => {
    // Ambil daftar gudang untuk pilihan TRANSFER
    api.get("/warehouse").then((res) => {
      // Filter agar tidak bisa TRANSFER ke gudang sendiri
      const otherWarehouses = res.data.data.filter(w => w._id !== activeWarehouseId);
      setWarehouses(otherWarehouses);
    });
  }, [activeWarehouseId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/transaction", {
        ...formData,
        warehouseId: activeWarehouseId, // Gudang asal otomatis
      });
      toast.success("Transaction recorded!");
      onSuccess(); // Refresh data di parent
    } catch (error) {
      toast.error(error.response?.data?.message || "Transaction failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-base-100 rounded-2xl shadow-2xl border border-primary/20 overflow-hidden">
      {/* Header Form */}
      <div className="bg-primary p-4 flex items-center gap-3">
        <div className="bg-base-100 text-primary p-2 rounded-lg">
          <MoveRight size={20} />
        </div>
        <h2 className="text-white font-black uppercase tracking-widest">New Movement</h2>
      </div>

      <form onSubmit={handleSubmit} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Pilih Produk */}
        <div className="form-control">
          <label className="label font-black text-primary text-xs uppercase tracking-tighter">
            <Box size={14} className="mr-1"/> Select Product
          </label>
          <select 
            className="select select-bordered border-primary/30 focus:border-primary bg-base-100 text-base-content font-bold"
            value={formData.productId}
            onChange={(e) => setFormData({...formData, productId: e.target.value})}
            required
          >
            <option value="">Choose item...</option>
            {products.map(p => (
              <option key={p._id} value={p._id}>{p.name} (Qty: {p.stock})</option>
            ))}
          </select>
        </div>

        {/* Jenis Transaksi */}
        <div className="form-control">
          <label className="label font-black text-primary text-xs uppercase tracking-tighter">Movement Type</label>
          <div className="join w-full border border-primary/20 p-1 rounded-xl bg-base-200">
            <button 
              type="button" 
              onClick={() => setFormData({...formData, type: 'IN', toWarehouseId: ""})}
              className={`join-item btn btn-sm flex-1 border-none ${formData.type === 'IN' ? 'btn-primary text-white' : 'btn-ghost text-primary'}`}
            >
              <ArrowDownCircle size={16}/> IN
            </button>
            <button 
              type="button" 
              onClick={() => setFormData({...formData, type: 'OUT', toWarehouseId: ""})}
              className={`join-item btn btn-sm flex-1 border-none ${formData.type === 'OUT' ? 'btn-primary text-white' : 'btn-ghost text-primary'}`}
            >
              <ArrowUpCircle size={16}/> OUT
            </button>
            <button 
              type="button" 
              onClick={() => setFormData({...formData, type: 'TRANSFER'})}
              className={`join-item btn btn-sm flex-1 border-none ${formData.type === 'TRANSFER' ? 'btn-primary text-white' : 'btn-ghost text-primary'}`}
            >
              <Warehouse size={16}/> TRANSFER
            </button>
          </div>
        </div>

        {/* Input Quantity */}
        <div className="form-control">
          <label className="label font-black text-primary text-xs uppercase tracking-tighter">Amount</label>
          <input 
            type="number" 
            min="1"
            className="input input-bordered border-primary/30 bg-base-100 text-primary font-black text-xl"
            value={formData.quantity}
            onChange={(e) => setFormData({...formData, quantity: Number(e.target.value)})}
            required
          />
        </div>

        {/* Dropdown Gudang Tujuan (Hanya muncul jika TRANSFER) */}
        <div className={`form-control transition-all duration-300 ${formData.type === 'TRANSFER' ? 'opacity-100 translate-y-0' : 'opacity-0 h-0 pointer-events-none'}`}>
          <label className="label font-black text-primary text-xs uppercase tracking-tighter">Destination Warehouse</label>
          <select 
            className="select select-primary bg-base-100 font-bold"
            value={formData.toWarehouseId}
            onChange={(e) => setFormData({...formData, toWarehouseId: e.target.value})}
            required={formData.type === 'TRANSFER'}
          >
            <option value="">Select destination...</option>
            {warehouses.map(w => (
              <option key={w._id} value={w._id}>{w.name}</option>
            ))}
          </select>
        </div>

        {/* Catatan */}
        <div className="form-control md:col-span-2">
          <label className="label font-black text-primary text-xs uppercase tracking-tighter">
            <NotepadText size={14} className="mr-1"/> Notes
          </label>
          <input 
            type="text" 
            placeholder="Reason for movement..." 
            className="input input-bordered border-primary/30 bg-base-100 text-base-content"
            value={formData.note}
            onChange={(e) => setFormData({...formData, note: e.target.value})}
          />
        </div>

        <div className="md:col-span-2 mt-2">
          <button 
            type="submit" 
            disabled={loading}
            className="btn btn-primary w-full shadow-lg shadow-primary/30 font-black tracking-widest uppercase"
          >
            {loading ? <span className="loading loading-spinner"></span> : "Process Transaction"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTransaction;