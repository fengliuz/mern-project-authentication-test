import { useState, useEffect } from "react";
import api from "../lib/api";
import toast from "react-hot-toast";
import { X } from "lucide-react";

const AddCategory = ({ onSuccess, onClose, isEdit, id, initialData }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    if (isEdit && initialData) {
      setFormData({
        name: initialData.name,
        description: initialData.description || "",
      });
    }
  }, [isEdit, initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEdit) {
        await api.put(`/category/${id}`, formData);
        toast.success("Kategori berhasil diperbarui");
      } else {
        await api.post("/category", formData);
        toast.success("Kategori berhasil ditambahkan");
      }
      onSuccess();
    } catch (error) {
      toast.error(error.response?.data?.message || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-base-100 rounded-2xl shadow-2xl overflow-hidden border border-base-300 animate-in zoom-in-95 duration-300"
    >
      <div className="bg-primary p-6 text-primary-content flex justify-between items-center">
        <div>
          <h2 className="text-xl font-black uppercase tracking-tight">
            {isEdit ? "Edit Category" : "New Category"}
          </h2>
          <p className="text-xs opacity-70">Kelola klasifikasi produk Anda</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="btn btn-circle btn-sm btn-ghost hover:bg-black/10"
        >
          <X size={20} />
        </button>
      </div>

      <div className="p-6 space-y-4">
        <div className="form-control">
          <label className="label-text mb-1 font-bold ml-1">Nama Kategori</label>
          <input
            type="text"
            required
            placeholder="Contoh: Elektronik, Makanan, dll"
            className="input input-bordered w-full focus:input-primary"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div className="form-control">
          <label className="label-text mb-1 font-bold ml-1">Deskripsi</label>
          <textarea
            className="textarea textarea-bordered h-28 focus:textarea-primary"
            placeholder="Jelaskan kategori ini secara singkat..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>
      </div>

      <div className="p-6 border-t border-base-200 bg-base-200/50 flex gap-3">
        <button type="button" onClick={onClose} className="btn btn-ghost flex-1">
          Batal
        </button>
        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary flex-[2] shadow-lg shadow-primary/20"
        >
          {loading ? (
            <span className="loading loading-spinner"></span>
          ) : isEdit ? (
            "Update Kategori"
          ) : (
            "Simpan Kategori"
          )}
        </button>
      </div>
    </form>
  );
};

export default AddCategory;