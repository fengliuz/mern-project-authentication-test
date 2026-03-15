import { useEffect, useState } from "react";
import api from "../lib/api";
import toast from "react-hot-toast";
import { PlusCircle, List } from "lucide-react";

const CategoryManagerPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  // 1. Ambil Data Kategori
  const fetchCategories = async () => {
    try {
      const res = await api.get("/category");
      setCategories(res.data.data);
    } catch (error) {
      toast.error("Gagal mengambil data kategori "+ error.response.data.message);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // 2. Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/category", formData);
      toast.success(res.data.message);
      setFormData({ name: "", description: "" })
      fetchCategories(); // Refresh list
    } catch (error) {
      toast.error(error.response?.data?.message || "Gagal menambah kategori");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-full flex-col gap-8 p-4 lg:p-8">
      {/* SECTION FORM */}
      <div className="bg-primary p-6 rounded-sm shadow-md lg:w-1/2 mx-auto w-full text-base-300/70">
        <div className="flex items-center gap-2 mb-4">
          <PlusCircle size={20} className="text-base-300/50" />
          <h2 className="text-xl font-bold text-white">Add New Category</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Category Name (e.g. Elektronik)"
            value={formData.name}
            className="border-2 rounded-sm border-error p-2 w-full placeholder:text-base-300/55 bg-base-100/10 text-white focus:outline-none focus:border-secondary transition-all"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <textarea
            placeholder="Short Description"
            value={formData.description}
            className="border-2 rounded-sm border-error p-2 w-full h-24 placeholder:text-base-300/55 bg-base-100/10 text-white focus:outline-none focus:border-secondary transition-all"
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          <button
            type="submit"
            disabled={loading}
            className={`bg-secondary font-bold border border-accent shadow-md hover:shadow-xl transition duration-200 text-white px-4 py-2 rounded-sm ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:-translate-y-0.5"
            }`}
          >
            {loading ? "Saving..." : "Create Category"}
          </button>
        </form>
      </div>

      {/* SECTION LIST TABLE */}
      <div className="bg-primary p-6 rounded-sm shadow-md w-full text-base-300/70">
        <div className="flex items-center gap-2 mb-6">
          <List size={20} className="text-secondary" />
          <h2 className="text-xl font-bold text-white">Existing Categories</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-error/30 text-base-300/45">
                <th className="p-3 font-semibold uppercase text-sm">No</th>
                <th className="p-3 font-semibold uppercase text-sm">Name</th>
                <th className="p-3 font-semibold uppercase text-sm">Slug</th>
                <th className="p-3 font-semibold uppercase text-sm">Description</th>
              </tr>
            </thead>
            <tbody>
              {categories.length > 0 ? (
                categories.map((cat, index) => (
                  <tr key={cat._id} className="border-b border-error/10 hover:bg-base-100/5 transition-colors">
                    <td className="p-3 text-white">{index + 1}</td>
                    <td className="p-3 font-medium text-white">{cat.name}</td>
                    <td className="p-3 text-base-300/80 italic text-sm">{cat.slug}</td>
                    <td className="p-3 text-sm">{cat.description || "-"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-6 text-center italic opacity-50">
                    No categories found. Start by adding one above.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CategoryManagerPage;