import { useEffect, useState } from "react";
import api from "../lib/api";
import toast from "react-hot-toast";
import { X } from "lucide-react";

const AddProduct = ({ onSuccess, isEdit, id, onClose }) => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    categoryId: "",
    stock: 0,
    minStock: 5,
    unit: "pcs",
  });

  // Fetch data produk jika mode EDIT
  useEffect(() => {
    api.get("/category").then((res) => setCategories(res.data.data));
    
    if (isEdit && id) {
      api.get(`/product/${id}`).then((res) => {
        const p = res.data.data;
        setFormData({
          name: p.name,
          description: p.description,
          categoryId: p.categoryId?._id || p.categoryId,
          stock: p.stock,
          minStock: p.minStock,
          unit: p.unit,
          sku: p.sku
        });
      });
    }
  }, [isEdit, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/product", formData);
      toast.success(res.data.message);
      onSuccess();
    } catch (error) {
      toast.error(error.response?.data?.message || "Gagal simpan");
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put(`/product/${id}`, formData);
      toast.success(res.data.message);
      onSuccess();
    } catch (error) {
      toast.error(error.response?.data?.message || "Gagal update");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <form
        className="relative bg-base-100 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-base-300 animate-in zoom-in-95 duration-300"
        onSubmit={isEdit ? handleEdit : handleSubmit}
      >
        {/* Header Modal */}
        <div className="bg-primary p-6 text-primary-content flex justify-between items-center">
          <div>
            <h2 className="text-xl font-black uppercase tracking-tight">
              {isEdit ? "Edit Product" : "New Product"}
            </h2>
            <p className="text-xs opacity-70">Lengkapi detail informasi barang</p>
          </div>
          <button 
            type="button" 
            onClick={onClose}
            className="btn btn-circle btn-sm btn-ghost hover:bg-black/10"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body Modal */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {!isEdit && (
            <div className="form-control">
              <label className="label-text mb-1 font-bold ml-1">SKU Code</label>
              <input
                type="text"
                placeholder="Contoh: ELK-001"
                className="input input-bordered w-full focus:input-primary"
                value={formData.sku || ""}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
              />
            </div>
          )}

          <div className="form-control">
            <label className="label-text mb-1 font-bold ml-1">Nama Produk</label>
            <input
              type="text"
              required
              placeholder="Masukkan nama barang"
              className="input input-bordered w-full focus:input-primary"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="form-control">
            <label className="label-text mb-1 font-bold ml-1">Kategori</label>
            <select
              className="select select-bordered w-full focus:select-primary"
              value={formData.categoryId}
              onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
            >
              <option value="">Pilih Kategori</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label-text mb-1 font-bold ml-1">Stok Awal</label>
              <input
                type="number"
                className="input input-bordered w-full"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
              />
            </div>
            <div className="form-control">
              <label className="label-text mb-1 font-bold ml-1">Min. Stok</label>
              <input
                type="number"
                className="input input-bordered w-full"
                value={formData.minStock}
                onChange={(e) => setFormData({ ...formData, minStock: Number(e.target.value) })}
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label-text mb-1 font-bold ml-1">Deskripsi</label>
            <textarea
              className="textarea textarea-bordered h-20"
              placeholder="Tambahkan catatan produk..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
        </div>

        {/* Footer Modal */}
        <div className="p-6 border-t border-base-200 bg-base-200/50 flex gap-3">
          <button type="button" onClick={onClose} className="btn btn-ghost flex-1">
            Batal
          </button>
          <button type="submit" className="btn btn-primary flex-[2] shadow-lg shadow-primary/20">
            {isEdit ? "Update Produk" : "Simpan Produk"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;