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
		// Check if we already have cached products to avoid unnecessary API calls
		const currentState = useProductStore.getState();
		if (currentState.products.length > 0 && !currentState.loading) {
			return; // Already have data, no need to fetch again
		}

		set({ loading: true });
		
		// Set mock data immediately for fast loading
		const mockProducts = [
			{
				_id: 'mock-1',
				name: 'Luxury Sedan',
				description: 'Premium comfort and performance',
				price: 45000,
				image: '/bags.jpg',
				category: 'sedan'
			},
			{
				_id: 'mock-2',
				name: 'Sports Car',
				description: 'High-performance vehicle',
				price: 65000,
				image: '/shoes.jpg',
				category: 'sports'
			},
			{
				_id: 'mock-3',
				name: 'Family SUV',
				description: 'Spacious and reliable',
				price: 35000,
				image: '/jackets.jpg',
				category: 'suv'
			},
			{
				_id: 'mock-4',
				name: 'Electric Vehicle',
				description: 'Eco-friendly transportation',
				price: 55000,
				image: '/tshirts.jpg',
				category: 'electric'
			}
		];
		
		// Load mock data instantly
		set({ products: mockProducts, loading: false });
		
		// Try to fetch real data in the background without showing loading state
		try {
			const response = await axios.get("/products/featured");
			const featuredProducts = response.data || [];
			if (Array.isArray(featuredProducts) && featuredProducts.length > 0) {
				set({ products: featuredProducts });
			}
		} catch (error) {
			// Silently fail and keep mock data - no need for multiple fallback attempts
			console.log("Using mock data - API unavailable");
		}
	},
}));
