import { useEffect, useState } from "react";
import api from "../lib/api";
import toast from "react-hot-toast";
import {
  PlusCircle,
  List,
  MinusCircleIcon,
  PlusCircleIcon,
  Minus,
} from "lucide-react";
import AddCategory from "../components/AddCategory";

const CategoryManagerPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [isFormOpen, setIsFormOpen] = useState(false);
  // 1. Ambil Data Kategori
  const fetchCategories = async () => {
    try {
      const res = await api.get("/category");
      setCategories(res.data.data);
    } catch (error) {
      toast.error(
        "Gagal mengambil data kategori " + error.response.data.message,
      );
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
      setFormData({ name: "", description: "" });
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
      {isFormOpen ? (
        <AddCategory {...{ loading,setFormData,formData,handleSubmit,setIsFormOpen }}/>
      ) : (
        <div className={`p-6 lg:w-1/2  w-full text-base-300/70`}>
          <div className="flex items-center gap-2 mb-4">
            <PlusCircleIcon
              className="text-primary"
              onClick={() => setIsFormOpen((prev) => !prev)}
            />
          </div>
        </div>
      )}

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
                <th className="p-3 font-semibold uppercase text-xs hidden md:table-cell">
                  Slug
                </th>
                <th className="p-3 font-semibold uppercase text-xs">
                  Description
                </th>
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
                    <td className="p-3 font-medium text-white text-sm">
                      {cat.name}
                    </td>
                    <td className="p-3 text-base-300/60 italic text-xs hidden md:table-cell">
                      {cat.slug}
                    </td>
                    {/* FIX: max-w diperbesar, lg:max-w-none untuk desktop */}
                    <td className="p-3 text-sm max-w-[400px] lg:max-w-none lg:max-w-none">
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
