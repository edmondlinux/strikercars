
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import ProductListItem from "./ProductListItem";

const ProductGrid = ({ products, viewMode = "grid" }) => {
	if (!products || products.length === 0) {
		return (
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className="text-center py-16"
			>
				<h3 className="text-2xl font-semibold text-gray-300 mb-4">No vehicles found</h3>
				<p className="text-gray-400">Try adjusting your search criteria or browse our categories.</p>
			</motion.div>
		);
	}

	if (viewMode === "list") {
		return (
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.3 }}
				className="space-y-4"
			>
				{products.map((product, index) => (
					<motion.div
						key={product._id}
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.4, delay: index * 0.1 }}
					>
						<ProductListItem product={product} />
					</motion.div>
				))}
			</motion.div>
		);
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6, delay: 0.3 }}
			className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
		>
			{products.map((product, index) => (
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
	);
};

export default ProductGrid;
