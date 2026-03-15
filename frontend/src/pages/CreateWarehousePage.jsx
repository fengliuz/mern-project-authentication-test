import { useState } from "react";
import { useNavigate } from "react-router";
import api from "../lib/api";
import { Warehouse, ArrowLeft, Save, Loader2, AlignLeft, MapPin } from "lucide-react";
import toast from "react-hot-toast";

const CreateWarehousePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "", // Opsional, sesuaikan dengan schema backend-mu
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/warehouse", formData);
      toast.success("Warehouse created successfully!");
      navigate("/"); // Kembali ke list gudang
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to create warehouse"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)} 
        className="btn btn-ghost btn-sm gap-2 mb-6 opacity-70 hover:opacity-100"
      >
        <ArrowLeft size={18} /> Back to List
      </button>

      {/* Card Form */}
      <div className="card bg-base-100 shadow-2xl border border-primary/10 overflow-hidden">
        <div className="bg-primary p-6 text-white flex items-center gap-4">
          <div className="bg-white/20 p-3 rounded-xl backdrop-blur-md">
            <Warehouse size={32} />
          </div>
          <div>
            <h1 className="text-2xl font-black">Add New Warehouse</h1>
            <p className="text-sm opacity-80 italic">Scale up your logistics empire.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="card-body gap-6 bg-base-100 ">
          {/* Warehouse Name */}
          <div className="form-control w-full flex justify-between">
            <label className="label">
              <span className="label-text font-bold flex items-center gap-2">
                <Warehouse size={16} className="text-primary" /> Warehouse Name
              </span>
            </label>
            <input
              type="text"
              placeholder="e.g. Jakarta Distribution Center"
              className="input input-bordered focus:input-primary transition-all font-medium"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          {/* Location (Opsional) */}
          <div className="form-control w-full flex justify-between">
            <label className="label">
              <span className="label-text font-bold flex items-center gap-2">
                <MapPin size={16} className="text-primary" /> Location
              </span>
            </label>
            <input
              type="text"
              placeholder="e.g. Jakarta Timur, Indonesia"
              className="input input-bordered focus:input-primary transition-all"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
          </div>

          {/* Description */}
          <div className="form-contro flex flex-col">
            <label className="label">
              <span className="label-text font-bold flex items-center gap-2">
                <AlignLeft size={16} className="text-primary" /> Description
              </span>
            </label>
            <textarea
              className="textarea textarea-bordered focus:textarea-primary h-24 transition-all"
              placeholder="Tell something about this warehouse..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            ></textarea>
          </div>

          {/* Action Buttons */}
          <div className="card-actions justify-end mt-4">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="btn btn-ghost"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary px-8 shadow-lg shadow-primary/20"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={18} /> Saving...
                </>
              ) : (
                <>
                  <Save size={18} /> Save Warehouse
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateWarehousePage;