import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useCategoryStore } from "../store/categoryStore";
import { useEffect } from "react";

const CarCategories = () => {
	const { categories, fetchAllCategories, loading } = useCategoryStore();

	useEffect(() => {
		fetchAllCategories();
	}, [fetchAllCategories]);

	if (loading) {
		return (
			<div className="py-16 text-center">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"></div>
			</div>
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
						Shop by <span className='text-red-500'>Category</span>
					</h2>
					<p className='text-xl text-gray-300 max-w-3xl mx-auto'>
						Find the perfect vehicle for your lifestyle. From fuel-efficient sedans to powerful trucks.
					</p>
				</motion.div>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
					{categories.map((category, index) => (
						<motion.div
							key={category.name}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: index * 0.1 }}
							viewport={{ once: true }}
						>
							<Link
								to={`/category/${category._id}`}
								className='group block relative overflow-hidden rounded-2xl bg-gray-800 hover:transform hover:scale-105 transition-all duration-300'
							>
								<div className='aspect-w-16 aspect-h-12'>
									<img
										src={category.imageUrl}
										alt={category.name}
										className='w-full h-64 object-cover group-hover:scale-110 transition duration-500'
									/>
								</div>
								<div className='absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent' />
								<div className='absolute bottom-0 left-0 right-0 p-6'>
									<h3 className='text-2xl font-bold text-white mb-2'>{category.name}</h3>
									<p className='text-red-400 font-medium'>{category.count}</p>
								</div>
							</Link>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

export default CarCategories;