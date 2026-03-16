import { useEffect, useState } from "react";
import api from "../lib/api";
import toast from "react-hot-toast";
import {
  PlusCircle,
  List,
  Edit2,
  Trash2,
  Tag,
  Search,
  MoreVertical
} from "lucide-react";
import AddCategory from "../components/AddCategory";

const CategoryManagerPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await api.get("/category");
      setCategories(res.data.data);
    } catch (error) {
      toast.error("Gagal memuat kategori");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Hapus kategori ini? Produk terkait mungkin akan terpengaruh.")) return;
    try {
      await api.delete(`/category/${id}`);
      toast.success("Kategori berhasil dihapus");
      fetchCategories();
    } catch (error) {
      toast.error("Gagal menghapus kategori",error.response.data);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 p-4 lg:p-8 min-h-screen bg-base-200/50">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-primary mb-1">
            <Tag size={20} className="animate-pulse" />
            <span className="text-xs font-black tracking-widest uppercase opacity-70">
              Master Data
            </span>
          </div>
          <h1 className="text-4xl font-black text-base-content tracking-tight">
            Categories
          </h1>
        </div>

        <button
          onClick={() => {
            setSelectedCategory(null);
            setIsFormOpen(true);
          }}
          className="btn btn-primary shadow-lg group w-full md:w-auto"
        >
          <PlusCircle size={20} className="group-hover:rotate-90 transition-transform" />
          Add Category
        </button>
      </div>

      {/* MODAL FORM */}
      {isFormOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg">
            <AddCategory
              onSuccess={() => {
                setIsFormOpen(false);
                fetchCategories();
              }}
              onClose={() => setIsFormOpen(false)}
              isEdit={!!selectedCategory}
              id={selectedCategory?._id}
              initialData={selectedCategory}
            />
          </div>
        </div>
      )}

      {/* SEARCH & TABLE CONTAINER */}
   {/* SEARCH & TABLE CONTAINER */}
<div className="bg-base-100 rounded-2xl shadow-sm border border-base-300 overflow-hidden flex flex-col">
  
  {/* Header Tabel: Search & Info */}
  <div className="p-4 border-b border-base-300 bg-base-100 flex flex-wrap md:flex-nowrap gap-4 items-center justify-between">
    <div className="relative w-full md:w-72">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 opacity-30" size={18} />
      <input
        type="text"
        placeholder="Search category..."
        className="input input-bordered input-sm w-full pl-10 focus:input-primary"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
    <div className="flex items-center gap-2 opacity-50 text-[10px] font-bold uppercase whitespace-nowrap">
      <List size={14} /> {filteredCategories.length} Categories
    </div>
  </div>

  {/* Wrapper Tabel: Scroll Horizontal Terkontrol */}
  <div className="w-full overflow-x-auto overflow-y-hidden">
    <table className="table table-zebra w-full min-w-[100px]"> 
      <thead className="bg-base-200/50">
        <tr className="text-primary uppercase text-[10px] tracking-widest border-b border-base-300">
          <th className="w-12 text-center bg-transparent">No</th>
          <th className="bg-transparent">Category</th>
          <th className="hidden md:table-cell bg-transparent">Slug</th>
          <th className="bg-transparent w-1/3 hidden md:table-header-group">Description</th>
          <th className="w-16 text-center bg-transparent">Actions</th>
        </tr>
      </thead>
      <tbody className="text-sm">
        {loading ? (
          <tr>
            <td colSpan="5" className="text-center py-10">
              <span className="loading loading-spinner text-primary"></span>
            </td>
          </tr>
        ) : filteredCategories.length > 0 ? (
          filteredCategories.map((cat, index) => (
            <tr key={cat._id} className="hover:bg-base-200/30 transition-colors">
              <td className="text-center font-mono opacity-40 text-xs">{index + 1}</td>
              <td className="font-bold text-base-content">
                <span className="truncate block max-w-[120px] md:max-w-none" title={cat.name}>
                  {cat.name}
                </span>
              </td>
              <td className="hidden md:table-cell">
                <code className="text-[10px] bg-base-200 px-2 py-0.5 rounded opacity-70 font-mono">
                  {cat.slug}
                </code>
              </td>
              <td className="hidden md:table-cell">
                <p className="text-xs opacity-60 line-clamp-1 md:line-clamp-2 leading-relaxed ">
                  {cat.description || "-"}
                </p>
              </td>
              <td className="text-center">
                <div className="dropdown dropdown-left dropdown-end">
                  <button tabIndex={0} className="btn btn-ghost btn-xs btn-circle hover:bg-base-300">
                    <MoreVertical size={16} />
                  </button>
                  <ul tabIndex={0} className="dropdown-content menu p-2 shadow-2xl bg-base-100 border border-base-300 rounded-box w-32 z-[50]">
                    <li>
                      <button 
                        onClick={() => { setSelectedCategory(cat); setIsFormOpen(true); }} 
                        className="text-info text-xs font-bold py-2"
                      >
                        <Edit2 size={14} /> Edit
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => handleDelete(cat._id)} 
                        className="text-error text-xs font-bold py-2"
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5" className="text-center py-12 opacity-30 italic">
              <div className="flex flex-col items-center gap-2">
                <Tag size={32} className="opacity-20" />
                <p>No categories found</p>
              </div>
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