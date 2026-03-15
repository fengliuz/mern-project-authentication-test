import { useEffect } from "react";
import { useState } from "react";
import api from "../lib/api";
import toast from "react-hot-toast";
const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    categoryId: "",
    stock: 0,
    minStock: 5,
    unit: "pcs",
  });

  useEffect(() => {
    api.get("/category").then((res) => setCategories(res.data.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/product", formData);
      toast.success(`${res.data.message}`);
      setFormData({
    name: "",
    description: "",
    categoryId: "",
    stock: 0,
    minStock: 5,
    unit: "pcs"})
    } catch (error) {
      toast.error(`${error.response.data.message}`);
    }
  };
  return (
    <form
      className="p-6 bg-primary lg:w-1/2 w-full rounded-sm shadow-md text-base-300/70"
      action=""
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-bold mb-4">Input a new product</h2>
      <input
        type="text"
        placeholder="No SKU Produk"
        className="border-2 rounded-sm border-error p-2 w-full mb-2 placeholder:text-base-300/55 bg-base-100/10"
        onChange={(e)=>setFormData({...formData,sku:e.target.value})}
      />
      <input
        type="text"
        placeholder="Nama Barang"
        className="border-2 rounded-sm border-error p-2 w-full mb-2 placeholder:text-base-300/55 bg-base-100/10"
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Deskripsi produk"
        className="border-2 rounded-sm border-error p-2 w-full mb-2 placeholder:text-base-300/55 bg-base-100/10"
        onChange={(e)=>setFormData({...formData,description:e.target.value})}
      />
      <input
        type="number"
        placeholder="Stock"
        className="border-2 rounded-sm border-error p-2 w-full mb-2 placeholder:text-base-300/55 bg-base-100/10"
        onChange={(e)=>setFormData({...formData,stock:Number(e.target.value)})}
      />
      <input
        type="number"
        placeholder="Stock minimal untuk memperingatkan restock"
        className="border-2 rounded-sm border-error p-2 w-full mb-2 placeholder:text-base-300/55 bg-base-100/10"
        onChange={(e)=>setFormData({...formData,minStock:Number(e.target.value)})}
      />
      <select
        className="border-2 rounded-sm border-error p-2 w-full mb-2"
        onChange={(e) =>
          setFormData({ ...formData, categoryId: e.target.value })
        }
      >
        <option value="">Pilih Kategori</option>
        {categories.map((cat) => (
          <option key={cat._id} value={cat._id}>
            {cat.name}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="bg-secondary font-bold border border-accent shadow-md hover:shadow-xl transition duration-200 hover:-translate-y-0.5 hover:bg-secondary/75 text-white px-4 py-2 rounded"
      >
        Simpan Produk
      </button>
    </form>
  );
};
export default AddProduct;
