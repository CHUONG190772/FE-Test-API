import React, { useEffect, useState } from "react";
import { categoryService } from "../services/categoryService";

function CategoriesPage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await categoryService.getAllCategories();
        setCategories(res.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Danh sách Category</h2>
      <ul>
        {categories.map((cat) => (
          <li key={cat.id}>{cat.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default CategoriesPage;
