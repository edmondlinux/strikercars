
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useProductStore } from "../stores/useProductStore";
import CarCard from "./ProductCard";

const FeaturedCars = () => {
	const { products, fetchFeaturedProducts, loading } = useProductStore();

	useEffect(() => {
		fetchFeaturedProducts();
	}, [fetchFeaturedProducts]);

	// Get only featured products and limit to 3
	const featuredCars = products?.filter(product => product.isFeatured)?.slice(0, 3) || [];

	if (loading) {
		return (
			<section className='py-20 px-4 sm:px-6 lg:px-8'>
				<div className='max-w-7xl mx-auto'>
					<div className='text-center'>
						<div className='animate-spin rounded-full h-16 w-16 border-b-2 border-red-500 mx-auto'></div>
						<p className='text-white mt-4'>Loading featured vehicles...</p>
					</div>
				</div>
			</section>
		);
	}

	return (
		<section className='py-20 px-4 sm:px-6 lg:px-8'>
			<div className='max-w-7xl mx-auto'>
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					className='text-center mb-16'
				>
					<h2 className='text-4xl lg:text-5xl font-bold text-white mb-4'>
						Featured <span className='text-red-500'>Vehicles</span>
					</h2>
					<p className='text-xl text-gray-300'>
						Discover our handpicked selection of premium vehicles
					</p>
				</motion.div>

				{featuredCars.length > 0 ? (
					<>
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
							{featuredCars.map((car, index) => (
								<motion.div
									key={car._id}
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: index * 0.1 }}
									viewport={{ once: true }}
								>
									<CarCard car={car} />
								</motion.div>
							))}
						</div>

						<motion.div
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							transition={{ duration: 0.6, delay: 0.3 }}
							viewport={{ once: true }}
							className='text-center mt-12'
						>
							<Link
								to='/inventory'
								className='bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold transition duration-300 transform hover:scale-105 inline-block'
							>
								View All Vehicles
							</Link>
						</motion.div>
					</>
				) : (
					<motion.div
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
						className='text-center'
					>
						<p className='text-gray-400 text-lg mb-8'>
							No featured vehicles available at the moment.
						</p>
						<Link
							to='/inventory'
							className='bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold transition duration-300 transform hover:scale-105 inline-block'
						>
							Browse All Vehicles
						</Link>
					</motion.div>
				)}
			</div>
		</section>
	);
};

export default FeaturedCars;
