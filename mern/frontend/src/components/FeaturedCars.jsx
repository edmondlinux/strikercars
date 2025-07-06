
import { motion } from "framer-motion";
import { ArrowRight, Heart, Eye, Calendar, Gauge, ShoppingCart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import { useFavoriteStore } from "../stores/useFavoriteStore";
import { useUserStore } from "../stores/useUserStore";
import toast from "react-hot-toast";

const FeaturedCars = () => {
	const navigate = useNavigate();
	const { addToCart } = useCartStore();
	const { addToFavorites, removeFromFavorites, isFavorite } = useFavoriteStore();
	const { user } = useUserStore();

	// Static featured cars data with realistic product structure
	const featuredCars = [
		{
			_id: "featured-car-honda-civic-2020",
			name: "2020 Honda Civic LX",
			description: "Reliable and fuel-efficient sedan perfect for daily commuting. Clean title, well-maintained with complete service history. Features include automatic transmission, power windows, air conditioning, and excellent safety ratings.",
			price: 18500,
			image: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
			year: 2020,
			mileage: "45,000",
			category: "sedan",
			engine: "1.5L 4-Cylinder",
			seats: "5",
			transmission: "CVT Automatic",
			fuelType: "Gasoline",
			mpg: "32 City / 42 Highway"
		},
		{
			_id: "featured-car-ford-explorer-2019",
			name: "2019 Ford Explorer XLT",
			description: "Spacious SUV with 3-row seating perfect for families. Equipped with advanced safety features, entertainment system, and plenty of cargo space. One owner vehicle with excellent maintenance records.",
			price: 24900,
			image: "https://images.unsplash.com/photo-1566473965997-3de9c817e938?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
			year: 2019,
			mileage: "52,000",
			category: "suv",
			engine: "3.5L V6",
			seats: "7",
			transmission: "10-Speed Automatic",
			fuelType: "Gasoline",
			mpg: "20 City / 28 Highway"
		},
		{
			_id: "featured-car-toyota-camry-2021",
			name: "2021 Toyota Camry LE",
			description: "Low mileage sedan with excellent fuel economy and Toyota's renowned reliability. Pristine interior and exterior condition with advanced safety features and modern infotainment system.",
			price: 22750,
			image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
			year: 2021,
			mileage: "28,000",
			category: "sedan",
			engine: "2.5L 4-Cylinder",
			seats: "5",
			transmission: "8-Speed Automatic",
			fuelType: "Gasoline",
			mpg: "28 City / 39 Highway"
		}
	];

	const handleToggleFavorite = (car) => {
		if (!user) {
			toast.error("Please login to add favorites", { id: "login" });
			return;
		}

		const isLiked = isFavorite(car._id);
		if (isLiked) {
			removeFromFavorites(car._id);
			toast.success("Removed from favorites");
		} else {
			addToFavorites(car._id);
			toast.success("Added to favorites");
		}
	};

	const handleAddToCart = (car) => {
		if (!user) {
			toast.error("Please login to add to cart", { id: "login" });
			return;
		}
		addToCart(car);
		toast.success("Added to cart!");
	};

	const handleViewDetails = (carId) => {
		navigate(`/product/${carId}`);
	};

	const handleContactDealer = (carName) => {
		if (!user) {
			toast.error("Please login to contact dealer", { id: "login" });
			return;
		}
		toast.success(`Dealer contacted about ${carName}. They will reach out soon!`);
	};

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
					<p className='text-xl text-gray-300 max-w-3xl mx-auto'>
						Handpicked quality vehicles with the best value. These premium cars won't last long!
					</p>
				</motion.div>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
					{featuredCars.map((car, index) => {
						const isLiked = isFavorite(car._id);
						
						return (
							<motion.div
								key={car._id}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: index * 0.2 }}
								viewport={{ once: true }}
								className='bg-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1'
							>
								<div className='relative h-60 overflow-hidden'>
									<img 
										className='object-cover w-full h-full cursor-pointer' 
										src={car.image} 
										alt={car.name}
										onClick={() => handleViewDetails(car._id)}
									/>
									<div className='absolute inset-0 bg-black bg-opacity-20' />
									
									{/* Action buttons */}
									<div className='absolute top-3 right-3 flex flex-col space-y-2'>
										<button 
											onClick={() => handleToggleFavorite(car)}
											className={`p-2 rounded-full transition-all duration-300 ${
												isLiked ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-red-500'
											}`}
										>
											<Heart size={18} fill={isLiked ? 'white' : 'none'} />
										</button>
										<button 
											onClick={() => handleViewDetails(car._id)}
											className='p-2 rounded-full bg-white/20 text-white hover:bg-gray-700 transition-all duration-300'
										>
											<Eye size={18} />
										</button>
									</div>

									{/* Featured badge */}
									<div className='absolute top-3 left-3'>
										<span className='bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium'>
											Featured
										</span>
									</div>
								</div>

								<div className='p-6'>
									<h3 
										className='text-xl font-bold text-white mb-2 cursor-pointer hover:text-red-400 transition-colors'
										onClick={() => handleViewDetails(car._id)}
									>
										{car.name}
									</h3>
									
									{/* Car details */}
									<div className='flex items-center space-x-4 mb-4 text-gray-300'>
										<div className='flex items-center space-x-1'>
											<Calendar size={16} />
											<span className='text-sm'>{car.year}</span>
										</div>
										<div className='flex items-center space-x-1'>
											<Gauge size={16} />
											<span className='text-sm'>{car.mileage} miles</span>
										</div>
									</div>

									<p className='text-gray-400 text-sm mb-4 line-clamp-3'>
										{car.description}
									</p>

									<div className='flex items-center justify-between mb-4'>
										<div>
											<p className='text-2xl font-bold text-red-500'>${car.price.toLocaleString()}</p>
											<p className='text-sm text-gray-400'>or $299/month</p>
										</div>
									</div>

									<div className='flex space-x-2 mb-3'>
										<button
											onClick={() => handleContactDealer(car.name)}
											className='flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg font-medium transition-all duration-300'
										>
											Contact Dealer
										</button>
										<button 
											onClick={() => handleViewDetails(car._id)}
											className='px-4 py-3 border border-red-600 text-red-600 hover:bg-red-600 hover:text-white rounded-lg transition-all duration-300'
										>
											View Details
										</button>
									</div>

									<button
										onClick={() => handleAddToCart(car)}
										className='w-full flex items-center justify-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-3 rounded-lg font-medium transition-all duration-300'
									>
										<ShoppingCart size={18} />
										<span>Add to Cart</span>
									</button>
								</div>
							</motion.div>
						);
					})}
				</div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.8 }}
					viewport={{ once: true }}
					className='text-center mt-12'
				>
					<Link
						to="/inventory"
						className='inline-flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold transition duration-300 transform hover:scale-105'
					>
						<span>View All Inventory</span>
						<ArrowRight size={20} />
					</Link>
				</motion.div>
			</div>
		</section>
	);
};

export default FeaturedCars;
