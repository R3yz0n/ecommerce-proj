"use client";
import { useState } from "react";
import axios from "axios";

export default function AddProductPage() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    try {
      const res = await axios.post("/api/products", {
        name: form.name,
        description: form.description,
        price: Number(form.price),
        image: form.image,
        category: form.category,
      });
      if (res.data.success) {
        setMessage("✅ Product added successfully!");
        setForm({ name: "", description: "", price: "", image: "", category: "" });
      } else {
        setMessage(res.data.error || "Failed to add product.");
      }
    } catch (err: any) {
      setMessage(err.response?.data?.error || "Failed to add product.");
    }
    setLoading(false);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Add Product</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            required
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            required
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            required
            type="number"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="Image URL"
            required
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Category"
            required
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </form>
        {message && (
          <p
            className={`mt-4 text-center ${
              message.includes("successfully") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </main>
  );
}
