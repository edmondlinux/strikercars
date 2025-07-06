
import { motion } from "framer-motion";
import { ArrowRight, Star, Award, Users } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
	return (
		<section className='relative pt-32 pb-20 px-4 sm:px-6 lg:px-8'>
			<div className='max-w-7xl mx-auto'>
				<div className='grid lg:grid-cols-2 gap-12 items-center'>
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8 }}
						className='space-y-8'
					>
						<div>
							<h1 className='text-5xl lg:text-7xl font-bold leading-tight'>
								<span className='text-white'>DRIVE YOUR</span>
								<br />
								<span className='text-red-500'>DREAM CAR</span>
								<br />
								<span className='text-white'>TODAY</span>
							</h1>
							<p className='text-xl text-gray-300 mt-6 leading-relaxed'>
								No title? No problem! Get quality pre-owned vehicles with flexible financing options. 
								Over 500+ satisfied customers and counting.
							</p>
						</div>

						<div className='flex flex-wrap gap-4'>
							<Link
								to="/inventory"
								className='bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold
								flex items-center space-x-2 transition duration-300 transform hover:scale-105'
							>
								<span>Browse Inventory</span>
								<ArrowRight size={20} />
							</Link>
							<Link
								to="/financing"
								className='border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white 
								px-8 py-4 rounded-lg font-semibold transition duration-300'
							>
								Get Financing
							</Link>
						</div>

						<div className='flex items-center space-x-8 pt-8'>
							<div className='flex items-center space-x-2'>
								<Star className='text-yellow-400' size={24} />
								<div>
									<p className='text-white font-semibold'>4.8/5</p>
									<p className='text-gray-400 text-sm'>Customer Rating</p>
								</div>
							</div>
							<div className='flex items-center space-x-2'>
								<Award className='text-red-500' size={24} />
								<div>
									<p className='text-white font-semibold'>5+ Years</p>
									<p className='text-gray-400 text-sm'>In Business</p>
								</div>
							</div>
							<div className='flex items-center space-x-2'>
								<Users className='text-blue-400' size={24} />
								<div>
									<p className='text-white font-semibold'>500+</p>
									<p className='text-gray-400 text-sm'>Happy Customers</p>
								</div>
							</div>
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, x: 50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
						className='relative'
					>
						<div className='relative z-10 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700'>
							<img
								src='https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
								alt='Featured Car'
								className='w-full h-64 object-cover rounded-lg'
							/>
							<div className='mt-6'>
								<h3 className='text-2xl font-bold text-white'>2020 Honda Civic</h3>
								<p className='text-gray-300 mt-2'>Low mileage, excellent condition</p>
								<div className='flex justify-between items-center mt-4'>
									<span className='text-3xl font-bold text-red-500'>$15,999</span>
									<span className='bg-green-600 text-white px-3 py-1 rounded-full text-sm'>Available</span>
								</div>
							</div>
						</div>
						<div className='absolute -top-4 -right-4 w-72 h-72 bg-red-500 rounded-full opacity-20 blur-3xl'></div>
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
