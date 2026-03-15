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
    <List size={20} className="text-error" />
    <h2 className="text-xl font-bold text-white">Existing Categories</h2>
  </div>

  {/* overflow-x-auto wajib, -mx-4 membantu tabel menempel ke pinggir di HP */}
  <div className="overflow-x-auto -mx-4 lg:mx-0">
    <table className="w-full table-fixed md:table-auto border-collapse">
      <thead>
        <tr className="border-b border-error/30 text-base-300/60">
          <th className="p-3 font-semibold uppercase text-xs w-16">No</th>
          <th className="p-3 font-semibold uppercase text-xs">Name</th>
          <th className="p-3 font-semibold uppercase text-xs hidden md:table-cell">Slug</th>
          <th className="p-3 font-semibold uppercase text-xs">Description</th>
        </tr>
      </thead>
      <tbody>
        {categories.length > 0 ? (
          categories.map((cat, index) => (
            <tr 
              key={cat._id} 
              className="border-b border-base-100/30 hover:bg-base-100/10 transition-colors"
            >
              <td className="p-3 text-white text-sm">{index + 1}</td>
              <td className="p-3 font-medium text-white text-sm">{cat.name}</td>
              <td className="p-3 text-base-300/60 italic text-xs hidden md:table-cell">
                {cat.slug}
              </td>
              {/* FIX: max-w diperbesar, lg:max-w-none untuk desktop */}
              <td className="p-3 text-sm max-w-[400px] lg:max-w-xs lg:max-w-none">
                <p className="truncate md:whitespace-normal">
                  {cat.description || "-"}
                </p>
              </td>
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