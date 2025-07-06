
import { motion } from "framer-motion";
import CarCard from "./CarCard";

const FeaturedCars = ({ featuredCars }) => {
	return (
		<section className='py-20 px-4 sm:px-6 lg:px-8 bg-gray-800/50'>
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
					<p className='text-xl text-gray-300 max-w-3xl mx-auto'>
						Hand-picked quality vehicles at unbeatable prices. Each car is thoroughly inspected and ready to drive.
					</p>
				</motion.div>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
					{featuredCars.slice(0, 6).map((car, index) => (
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
					<button className='bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold transition duration-300 transform hover:scale-105'>
						View All Vehicles
					</button>
				</motion.div>
			</div>
		</section>
	);
};

export default FeaturedCars;
