import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../lib/axios";

export const useProductStore = create((set) => ({
	products: [],
	loading: false,
	isLoading: false,

	setProducts: (products) => set({ products }),
	createProduct: async (productData) => {
		set({ loading: true });
		try {
			const res = await axios.post("/products", productData);
			set((prevState) => ({
				products: [...prevState.products, res.data],
				loading: false,
			}));
		} catch (error) {
			toast.error(error.response.data.error);
			set({ loading: false });
		}
	},
	fetchAllProducts: async () => {
		set({ loading: true, isLoading: true });
		try {
			const response = await axios.get("/products");
			set({ products: response.data.products, loading: false, isLoading: false });
		} catch (error) {
			set({ products: [], loading: false, isLoading: false });
			console.log("Error fetching products:", error);
			// Only show toast if it's not a network/auth error
			if (error.response?.status !== 401 && error.response?.status !== 500) {
				toast.error(error.response?.data?.error || "Failed to fetch products");
			}
		}
	},
	fetchProductsByCategory: async (category) => {
		set({ loading: true });
		try {
			const response = await axios.get(`/products/category/${category}`);
			set({ products: response.data.products, loading: false });
		} catch (error) {
			set({ error: "Failed to fetch products", loading: false });
			toast.error(error.response.data.error || "Failed to fetch products");
		}
	},
	deleteProduct: async (productId) => {
		set({ loading: true });
		try {
			await axios.delete(`/products/${productId}`);
			set((prevProducts) => ({
				products: prevProducts.products.filter((product) => product._id !== productId),
				loading: false,
			}));
		} catch (error) {
			set({ loading: false });
			toast.error(error.response.data.error || "Failed to delete product");
		}
	},
	toggleFeaturedProduct: async (productId) => {
		set({ loading: true });
		try {
			const response = await axios.patch(`/products/${productId}`);
			// this will update the isFeatured prop of the product
			set((prevProducts) => ({
				products: prevProducts.products.map((product) =>
					product._id === productId ? { ...product, isFeatured: response.data.isFeatured } : product
				),
				loading: false,
			}));
		} catch (error) {
			set({ loading: false });
			toast.error(error.response.data.error || "Failed to update product");
		}
	},
	fetchFeaturedProducts: async () => {
		set({ loading: true });
		try {
			const response = await axios.get("/products/featured");
			const featuredProducts = response.data || [];
			set({ products: Array.isArray(featuredProducts) ? featuredProducts : [], loading: false });
		} catch (error) {
			console.log("Error fetching featured products:", error);
			// If featured products fail, try to get all products (for public access)
			try {
				const fallbackResponse = await axios.get("/products");
				const allProducts = fallbackResponse.data.products || [];
				// Take first 8 products as "featured" if no specific featured products
				const limitedProducts = Array.isArray(allProducts) ? allProducts.slice(0, 8) : [];
				set({ products: limitedProducts, loading: false });
			} catch (fallbackError) {
				console.log("Error fetching fallback products:", fallbackError);
				set({ products: [], loading: false });
			}
		}
	},
}));
