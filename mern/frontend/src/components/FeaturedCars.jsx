
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useProductStore } from "../stores/useProductStore";
import ProductCard from "./ProductCard";
import LoadingSpinner from "./LoadingSpinner";

const FeaturedCars = () => {
	const { fetchFeaturedProducts, products, loading } = useProductStore();

	useEffect(() => {
		fetchFeaturedProducts();
	}, [fetchFeaturedProducts]);

	if (loading) {
		return (
			<div className="flex justify-center py-16">
				<LoadingSpinner />
			</div>
		);
	}

	// Display only first 3 products
	const featuredProducts = products?.slice(0, 3) || [];

	return (
		<section className="py-16 px-4 sm:px-6 lg:px-8">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="text-center mb-12"
				>
					<h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
						<span className="text-red-500">Featured</span> Cars
					</h2>
					<p className="text-xl text-gray-300 max-w-3xl mx-auto">
						Discover our handpicked selection of premium vehicles. Quality cars at unbeatable prices.
					</p>
				</motion.div>

				{/* Products Grid */}
				{featuredProducts.length > 0 ? (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.3 }}
						className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
					>
						{featuredProducts.map((product, index) => (
							<motion.div
								key={product._id}
								initial={{ opacity: 0, scale: 0.9 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.4, delay: index * 0.1 }}
							>
								<ProductCard product={product} />
							</motion.div>
						))}
					</motion.div>
				) : (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="text-center py-16"
					>
						<h3 className="text-2xl font-semibold text-gray-300 mb-4">No featured cars available</h3>
						<p className="text-gray-400">Check back soon for our latest featured vehicles.</p>
					</motion.div>
				)}

				{/* View All Button */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.5 }}
					className="text-center"
				>
					<Link
						to="/inventory"
						className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold transition duration-300 transform hover:scale-105"
					>
						<span>View All Cars</span>
						<ArrowRight className="ml-2" size={20} />
					</Link>
				</motion.div>
			</div>
		</section>
	);
};

export default FeaturedCars;
