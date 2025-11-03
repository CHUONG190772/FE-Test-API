import React, { useEffect, useState } from "react";
import { productService } from "../services/productService";
import { categoryService } from "../services/categoryService";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: 0,
    categoryId: "",
  });

  const load = async () => {
    try {
      const [pRes, cRes] = await Promise.all([
        productService.getAll(),
        categoryService.getAll(),
      ]);
      setProducts(pRes.data);
      setCategories(cRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const create = async () => {
    if (!form.name) return;
    await productService.create({
      name: form.name,
      price: Number(form.price),
      stock: Number(form.stock),
      categoryId: form.categoryId || null,
    });
    setForm({ name: "", price: "", stock: 0, categoryId: "" });
    load();
  };

  const toggle = async (id) => {
    await productService.toggleStatus(id);
    load();
  };

  return (
    <div>
      <h2>Products</h2>
      <div style={{ marginBottom: 12 }}>
        <input
          placeholder="name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <input
          placeholder="stock"
          value={form.stock}
          onChange={(e) => setForm({ ...form, stock: e.target.value })}
        />
        <select
          value={form.categoryId}
          onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
        >
          <option value="">--Select category--</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <button onClick={create}>Add Product</button>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #ddd" }}>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Category</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} style={{ borderBottom: "1px solid #f0f0f0" }}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.price}</td>
              <td>{p.stock}</td>
              <td>{p.category?.name}</td>
              <td>{p.status ? "ACTIVE" : "INACTIVE"}</td>
              <td>
                <button onClick={() => toggle(p.id)}>Toggle</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
