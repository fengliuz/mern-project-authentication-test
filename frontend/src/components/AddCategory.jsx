import { MinusCircleIcon } from "lucide-react";

export default function AddCategory({loading,setFormData,formData,handleSubmit,setIsFormOpen}) {
  return (
    <div
      className={`bg-primary p-6 rounded-sm shadow-md lg:w-1/2  w-full text-base-300/70`}
    >
      <div className="flex items-center gap-2 mb-4">
        <MinusCircleIcon
          onClick={() => setIsFormOpen((prev) => !prev)}
          className="text-base-300/50"
        />
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
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
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
  );
}
