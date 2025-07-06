import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Heart, Calendar, Settings, Gauge, Users, ShoppingCart, Fuel, Zap } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";
import { useFavoriteStore } from "../stores/useFavoriteStore";
import { useCartStore } from "../stores/useCartStore";
import { useUserStore } from "../stores/useUserStore";
import toast from "react-hot-toast";
import LoadingSpinner from "../components/LoadingSpinner";

const ProductDetailsPage = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(true);
	const { products } = useProductStore();
	const { addToFavorites } = useFavoriteStore();
	const { addToCart } = useCartStore();
	const { user } = useUserStore();

	const handleAddToCart = () => {
		if (!user) {
			toast.error("Please login to add to cart", { id: "login" });
			return;
		}
		addToCart(product);
		toast.success("Added to cart!");
	};

	const handleAddToFavorites = () => {
		if (!user) {
			toast.error("Please login to add favorites", { id: "login" });
			return;
		}
		addToFavorites(product);
		toast.success("Added to favorites!");
	};

	useEffect(() => {
		// First check in the regular products
		const foundProduct = products.find(p => p._id === id);
		if (foundProduct) {
			setProduct(foundProduct);
			setLoading(false);
			return;
		}

		// Check if it's a featured car (static data)
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

		const featuredCar = featuredCars.find(car => car._id === id);
		if (featuredCar) {
			setProduct(featuredCar);
			setLoading(false);
		} else {
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
									{product.mileage || "N/A"} miles
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

							{product.transmission && (
								<div className='bg-gray-700 p-4 rounded-lg'>
									<div className='flex items-center mb-2'>
										<Settings className='text-red-400 mr-2' size={20} />
										<span className='text-gray-300'>Transmission</span>
									</div>
									<span className='text-white font-semibold'>
										{product.transmission}
									</span>
								</div>
							)}

							{product.fuelType && (
								<div className='bg-gray-700 p-4 rounded-lg'>
									<div className='flex items-center mb-2'>
										<Fuel className='text-red-400 mr-2' size={20} />
										<span className='text-gray-300'>Fuel Type</span>
									</div>
									<span className='text-white font-semibold'>
										{product.fuelType}
									</span>
								</div>
							)}

							{product.mpg && (
								<div className='bg-gray-700 p-4 rounded-lg col-span-2'>
									<div className='flex items-center mb-2'>
										<Zap className='text-red-400 mr-2' size={20} />
										<span className='text-gray-300'>Fuel Economy</span>
									</div>
									<span className='text-white font-semibold'>
										{product.mpg}
									</span>
								</div>
							)}
						</div>

						{/* Action Buttons */}
						<div className='space-y-4'>
							<div className='flex space-x-4'>
								<button
									onClick={handleAddToCart}
									className='flex-1 flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300'
								>
									<ShoppingCart size={20} />
									<span>Add to Cart</span>
								</button>

								<button
									onClick={handleAddToFavorites}
									className='bg-gray-700 hover:bg-gray-600 text-white py-3 px-6 rounded-lg transition duration-300'
									title="Add to Favorites"
								>
									<Heart size={20} />
								</button>
							</div>

							<button
								onClick={() => window.open('tel:(555)123-4567', '_self')}
								className='w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300'
							>
								Contact Dealer: (555) 123-4567
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