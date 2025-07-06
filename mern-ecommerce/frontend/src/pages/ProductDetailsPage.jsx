
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProductStore } from "../stores/useProductStore";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
import { motion } from "framer-motion";
import { ArrowLeft, Heart, ShoppingCart, Phone, Calendar, Gauge, MapPin, Shield } from "lucide-react";
import toast from "react-hot-toast";

const ProductDetailsPage = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const { products, fetchAllProducts } = useProductStore();
	const { user } = useUserStore();
	const { addToCart } = useCartStore();
	const [product, setProduct] = useState(null);
	const [isLiked, setIsLiked] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadProduct = async () => {
			if (!products || products.length === 0) {
				await fetchAllProducts();
			}
			
			const foundProduct = products?.find(p => p._id === id);
			setProduct(foundProduct);
			setLoading(false);
		};

		loadProduct();
	}, [id, products, fetchAllProducts]);

	const handleAddToCart = () => {
		if (!user) {
			toast.error("Please login to add items to cart");
			return;
		}
		addToCart(product);
		toast.success("Added to cart!");
	};

	const handleContactDealer = () => {
		if (!user) {
			toast.error("Please login to contact dealer");
			return;
		}
		toast.success("Dealer contact information sent to your email!");
	};

	const handleToggleLike = () => {
		setIsLiked(!isLiked);
		toast.success(isLiked ? "Removed from favorites" : "Added to favorites");
	};

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500"></div>
			</div>
		);
	}

	if (!product) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="text-center">
					<h1 className="text-2xl font-bold text-white mb-4">Product Not Found</h1>
					<button
						onClick={() => navigate("/inventory")}
						className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
					>
						Back to Inventory
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-900 text-white pt-20">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* Back Button */}
				<button
					onClick={() => navigate("/inventory")}
					className="flex items-center text-red-400 hover:text-red-300 mb-8 transition-colors"
				>
					<ArrowLeft className="mr-2" size={20} />
					Back to Inventory
				</button>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
					{/* Product Image */}
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5 }}
						className="relative"
					>
						<div className="relative bg-gray-800 rounded-xl overflow-hidden">
							<img
								src={product.image}
								alt={product.name}
								className="w-full h-96 lg:h-[600px] object-cover"
							/>
							<div className="absolute top-4 left-4">
								<span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
									Available
								</span>
							</div>
							<div className="absolute top-4 right-4">
								<button
									onClick={handleToggleLike}
									className={`p-3 rounded-full transition-all duration-300 ${
										isLiked ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-red-500'
									}`}
								>
									<Heart size={20} fill={isLiked ? 'white' : 'none'} />
								</button>
							</div>
						</div>
					</motion.div>

					{/* Product Details */}
					<motion.div
						initial={{ opacity: 0, x: 50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5 }}
						className="space-y-6"
					>
						<div>
							<h1 className="text-4xl font-bold text-white mb-2">{product.name}</h1>
							<div className="flex items-center space-x-2 mb-4">
								<span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">
									{product.category}
								</span>
							</div>
						</div>

						{/* Price */}
						<div className="bg-gray-800 rounded-lg p-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-4xl font-bold text-red-500">${product.price.toLocaleString()}</p>
									<p className="text-gray-400 text-sm mt-1">or $299/month</p>
								</div>
								<div className="text-right">
									<p className="text-sm text-gray-400">Starting at</p>
									<p className="text-2xl font-semibold text-white">2.9% APR</p>
								</div>
							</div>
						</div>

						{/* Vehicle Details */}
						<div className="bg-gray-800 rounded-lg p-6">
							<h3 className="text-xl font-semibold mb-4">Vehicle Details</h3>
							<div className="grid grid-cols-2 gap-4">
								<div className="flex items-center space-x-2">
									<Calendar size={16} className="text-red-400" />
									<span className="text-sm">2020 Model</span>
								</div>
								<div className="flex items-center space-x-2">
									<Gauge size={16} className="text-red-400" />
									<span className="text-sm">45,000 miles</span>
								</div>
								<div className="flex items-center space-x-2">
									<MapPin size={16} className="text-red-400" />
									<span className="text-sm">Local Trade</span>
								</div>
								<div className="flex items-center space-x-2">
									<Shield size={16} className="text-red-400" />
									<span className="text-sm">Clean Title</span>
								</div>
							</div>
						</div>

						{/* Description */}
						<div className="bg-gray-800 rounded-lg p-6">
							<h3 className="text-xl font-semibold mb-4">Description</h3>
							<p className="text-gray-300 leading-relaxed">
								{product.description || "This well-maintained vehicle comes with a clean history and has been thoroughly inspected. Perfect for daily commuting or weekend adventures. Features include premium interior, excellent fuel economy, and reliable performance."}
							</p>
						</div>

						{/* Action Buttons */}
						<div className="space-y-4">
							<div className="flex space-x-4">
								<button
									onClick={handleAddToCart}
									className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center"
								>
									<ShoppingCart className="mr-2" size={20} />
									Add to Cart
								</button>
								<button
									onClick={handleContactDealer}
									className="flex-1 border border-red-600 text-red-600 hover:bg-red-600 hover:text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center"
								>
									<Phone className="mr-2" size={20} />
									Contact Dealer
								</button>
							</div>
							
							<div className="text-center">
								<button className="bg-gray-700 hover:bg-gray-600 text-white py-3 px-8 rounded-lg font-medium transition-colors">
									Schedule Test Drive
								</button>
							</div>
						</div>

						{/* Financing Info */}
						<div className="bg-gray-800 rounded-lg p-6">
							<h3 className="text-xl font-semibold mb-4">Financing Options</h3>
							<div className="space-y-3">
								<div className="flex justify-between">
									<span className="text-gray-400">Monthly Payment:</span>
									<span className="text-white font-semibold">$299/month</span>
								</div>
								<div className="flex justify-between">
									<span className="text-gray-400">Down Payment:</span>
									<span className="text-white font-semibold">$2,000</span>
								</div>
								<div className="flex justify-between">
									<span className="text-gray-400">Term:</span>
									<span className="text-white font-semibold">72 months</span>
								</div>
								<div className="flex justify-between">
									<span className="text-gray-400">APR:</span>
									<span className="text-white font-semibold">2.9%</span>
								</div>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</div>
	);
};

export default ProductDetailsPage;
