import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Heart, Calendar, Settings, Gauge, Users } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";
import { useFavoriteStore } from "../stores/useFavoriteStore";
import LoadingSpinner from "../components/LoadingSpinner";

const ProductDetailsPage = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(true);
	const { products } = useProductStore();
	const { addToFavorites } = useFavoriteStore();

	useEffect(() => {
		const foundProduct = products.find(p => p._id === id);
		if (foundProduct) {
			setProduct(foundProduct);
			setLoading(false);
		} else {
			// If product not found in store, you could fetch it individually here
			setLoading(false);
		}
	}, [id, products]);

	if (loading) return <LoadingSpinner />;

	if (!product) {
		return (
			<div className='min-h-screen bg-gray-900 flex items-center justify-center'>
				<div className='text-center'>
					<h2 className='text-2xl font-bold text-white mb-4'>Car Not Found</h2>
					<button
						onClick={() => navigate('/inventory')}
						className='bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition duration-300'
					>
						Browse Our Inventory
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className='min-h-screen bg-gray-900 pt-20'>
			<div className='container mx-auto px-4 py-8'>
				<motion.button
					onClick={() => navigate(-1)}
					className='flex items-center text-gray-300 hover:text-red-400 mb-6 transition duration-300'
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.5 }}
				>
					<ArrowLeft className='mr-2' size={20} />
					Back
				</motion.button>

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
					{/* Image Section */}
					<motion.div
						className='bg-gray-800 rounded-lg overflow-hidden'
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.5 }}
					>
						<img
							src={product.image}
							alt={product.name}
							className='w-full h-96 object-cover'
						/>
					</motion.div>

					{/* Details Section */}
					<motion.div
						className='bg-gray-800 rounded-lg p-6'
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
					>
						<h1 className='text-3xl font-bold text-white mb-4'>{product.name}</h1>

						<div className='text-4xl font-bold text-red-400 mb-6'>
							${product.price.toLocaleString()}
						</div>

						<div className='text-gray-300 mb-6 leading-relaxed'>
							{product.description}
						</div>

						{/* Car Specifications */}
						<div className='grid grid-cols-2 gap-4 mb-6'>
							<div className='bg-gray-700 p-4 rounded-lg'>
								<div className='flex items-center mb-2'>
									<Calendar className='text-red-400 mr-2' size={20} />
									<span className='text-gray-300'>Year</span>
								</div>
								<span className='text-white font-semibold'>
									{product.year || new Date().getFullYear()}
								</span>
							</div>

							<div className='bg-gray-700 p-4 rounded-lg'>
								<div className='flex items-center mb-2'>
									<Gauge className='text-red-400 mr-2' size={20} />
									<span className='text-gray-300'>Mileage</span>
								</div>
								<span className='text-white font-semibold'>
									{product.mileage || "N/A"}
								</span>
							</div>

							<div className='bg-gray-700 p-4 rounded-lg'>
								<div className='flex items-center mb-2'>
									<Settings className='text-red-400 mr-2' size={20} />
									<span className='text-gray-300'>Engine</span>
								</div>
								<span className='text-white font-semibold'>
									{product.engine || "V6"}
								</span>
							</div>

							<div className='bg-gray-700 p-4 rounded-lg'>
								<div className='flex items-center mb-2'>
									<Users className='text-red-400 mr-2' size={20} />
									<span className='text-gray-300'>Seats</span>
								</div>
								<span className='text-white font-semibold'>
									{product.seats || "5"}
								</span>
							</div>
						</div>

						{/* Action Buttons */}
						<div className='flex space-x-4'>
							<button
								onClick={() => window.open('tel:(555)123-4567', '_self')}
								className='flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300'
							>
								Call Now
							</button>

							<button
								onClick={() => addToFavorites(product)}
								className='bg-gray-700 hover:bg-gray-600 text-white py-3 px-6 rounded-lg transition duration-300'
								title="Add to Favorites"
							>
								<Heart size={20} />
							</button>
						</div>

						<div className='mt-6 text-center'>
							<p className='text-gray-400 text-sm'>
								Contact us for financing options and trade-in evaluations
							</p>
						</div>
					</motion.div>
				</div>
			</div>
		</div>
	);
};

export default ProductDetailsPage;