import { motion } from "framer-motion";
import { useCategoryStore } from "../stores/useCategoryStore";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const CarCategories = () => {
	const { categories, fetchAllCategories } = useCategoryStore();

	useEffect(() => {
		fetchAllCategories();
	}, [fetchAllCategories]);

	return (
		<div className='py-16'>
			<div className='container mx-auto px-4'>
				<motion.h2
					className='text-4xl font-bold text-center mb-12 text-white'
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					Browse by Category
				</motion.h2>

				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
					{categories.map((category, index) => (
						<motion.div
							key={category._id}
							className='relative group cursor-pointer'
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							<Link to={`/category/${category.href}`}>
								<div className='relative overflow-hidden rounded-lg bg-gray-800 shadow-lg'>
									{category.image ? (
										<img
											src={category.image}
											alt={category.name}
											className='w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110'
											onError={(e) => {
												console.log('Category image failed to load:', category.image);
												e.target.style.display = 'none';
												e.target.parentNode.innerHTML = `
													<div class='w-full h-48 bg-gray-700 flex items-center justify-center'>
														<span class='text-gray-400'>No Image Available</span>
													</div>
												`;
											}}
										/>
									) : (
										<div className='w-full h-48 bg-gray-700 flex items-center justify-center'>
											<span className='text-gray-400'>No Image Available</span>
										</div>
									)}
									<div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
										<div className='text-center'>
											<h3 className='text-xl font-bold text-white mb-2'>{category.name}</h3>
											<p className='text-gray-300 text-sm'>{category.description}</p>
										</div>
									</div>
								</div>
							</Link>
						</motion.div>
					))}
				</div>
			</div>
		</div>
	);
};

export default CarCategories;