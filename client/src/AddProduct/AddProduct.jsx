import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
        imageUrl: ""
    });

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.name === "price" || e.target.name === "stock" 
                ? Number(e.target.value)  // Convert price and stock to numbers
                : e.target.value
        });
    }

    async function addProduct(e) {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:5000/api/product/add", formData, {
                headers: { Authorization: `Bearer ${user.token}` },
            });

            alert("Product added successfully!");
            console.log("Product added:", response.data);
            
            // Redirect to products list after adding
            navigate("/admin/products");
        } catch (error) {
            console.error("Error adding product:", error.response?.data || error.message);
            alert(error.response?.data?.message || "Failed to add product.");
        }
    }

    return (
        <div>
            <h2>Add Product</h2>
            <form onSubmit={addProduct} encType="multipart/form-data">
                <div>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter product name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="description"
                        placeholder="Enter product description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <input
                        type="number"
                        name="price"
                        placeholder="Enter product price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <input
                        type="number"
                        name="stock"
                        placeholder="Enter product stock"
                        value={formData.stock}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="category"
                        placeholder="Enter type of product"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="imageUrl"
                        placeholder="Enter product image URL"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Add</button>
            </form>
        </div>
    );
}
