
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Eye, Calendar, Gauge, MapPin, Phone, Mail, Star, Check, X, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useProductStore } from "../stores/useProductStore";
import toast from "react-hot-toast";

const ProductPage = () => {
	const { id } = useParams();
	const { user } = useUserStore();
	const { products, fetchProductsByCategory } = useProductStore();
	const [product, setProduct] = useState(null);
	const [isLiked, setIsLiked] = useState(false);
	const [selectedImage, setSelectedImage] = useState(0);
	const [showContactForm, setShowContactForm] = useState(false);
	const [contactForm, setContactForm] = useState({
		name: "",
		email: "",
		phone: "",
		message: ""
	});

	// Mock additional car details (in a real app, this would come from the API)
	const carDetails = {
		year: 2020,
		mileage: "45,000",
		transmission: "Automatic",
		fuelType: "Gasoline",
		drivetrain: "FWD",
		exterior: "Midnight Blue",
		interior: "Black Leather",
		engine: "2.0L 4-Cylinder",
		horsepower: "158 HP",
		mpg: "32 city / 42 highway",
		vin: "1HGBH41JXMN109186",
		stockNumber: "ST2024001",
		features: [
			"Bluetooth Connectivity",
			"Backup Camera",
			"Heated Seats",
			"Sunroof",
			"Cruise Control",
			"Apple CarPlay",
			"Lane Departure Warning",
			"Automatic Emergency Braking",
			"Keyless Entry",
			"Power Windows",
			"Air Conditioning",
			"Premium Sound System"
		],
		images: [
			"https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
			"https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
			"https://images.unsplash.com/photo-1549399524-9e3c3e3ff1b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
			"https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
		]
	};

	useEffect(() => {
		// In a real app, you would fetch the product by ID
		// For now, we'll simulate finding a product
		const mockProduct = {
			_id: id,
			name: "2020 Honda Civic LX",
			price: 15999,
			description: "This well-maintained 2020 Honda Civic LX is the perfect combination of reliability, fuel efficiency, and modern features. With only 45,000 miles, this vehicle has been carefully maintained and is ready for its next owner. The Civic's reputation for longevity and low maintenance costs makes it an excellent choice for both first-time buyers and experienced drivers.",
			image: carDetails.images[0],
			category: "sedan"
		};
		setProduct(mockProduct);
	}, [id]);

	const handleContactDealer = () => {
		if (!user) {
			toast.error("Please login to contact dealer", { id: "login" });
			return;
		}
		setShowContactForm(true);
	};

	const handleToggleLike = () => {
		setIsLiked(!isLiked);
		toast.success(isLiked ? "Removed from favorites" : "Added to favorites");
	};

	const handleContactSubmit = (e) => {
		e.preventDefault();
		toast.success("Your message has been sent to the dealer!");
		setShowContactForm(false);
		setContactForm({ name: "", email: "", phone: "", message: "" });
	};

	if (!product) {
		return (
			<div className="min-h-screen bg-gray-900 flex items-center justify-center">
				<div className="text-white text-xl">Loading...</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-900 text-white">
			{/* Header with back button */}
			<div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
				<Link 
					to="/inventory" 
					className="inline-flex items-center text-red-400 hover:text-red-300 transition-colors duration-300 mb-6"
				>
					<ArrowLeft size={20} className="mr-2" />
					Back to Inventory
				</Link>

				<div className="grid lg:grid-cols-2 gap-12">
					{/* Image Gallery */}
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6 }}
					>
						<div className="relative">
							<img
								src={carDetails.images[selectedImage]}
								alt={product.name}
								className="w-full h-96 object-cover rounded-2xl"
							/>
							
							{/* Action buttons */}
							<div className="absolute top-4 right-4 flex space-x-2">
								<button
									onClick={handleToggleLike}
									className={`p-3 rounded-full transition-all duration-300 ${
										isLiked ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-red-500'
									}`}
								>
									<Heart size={20} fill={isLiked ? 'white' : 'none'} />
								</button>
								<button className="p-3 rounded-full bg-white/20 text-white hover:bg-gray-700 transition-all duration-300">
									<Eye size={20} />
								</button>
							</div>

							{/* Status badge */}
							<div className="absolute top-4 left-4">
								<span className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium">
									Available
								</span>
							</div>
						</div>

						{/* Thumbnail gallery */}
						<div className="flex space-x-4 mt-4">
							{carDetails.images.map((image, index) => (
								<button
									key={index}
									onClick={() => setSelectedImage(index)}
									className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
										selectedImage === index ? 'border-red-500' : 'border-gray-600 hover:border-gray-400'
									}`}
								>
									<img src={image} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
								</button>
							))}
						</div>
					</motion.div>

					{/* Product Details */}
					<motion.div
						initial={{ opacity: 0, x: 50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="space-y-6"
					>
						<div>
							<h1 className="text-4xl font-bold text-white mb-2">{product.name}</h1>
							<div className="flex items-center space-x-4 text-gray-300">
								<div className="flex items-center space-x-1">
									<Calendar size={18} />
									<span>{carDetails.year}</span>
								</div>
								<div className="flex items-center space-x-1">
									<Gauge size={18} />
									<span>{carDetails.mileage} miles</span>
								</div>
								<div className="flex items-center space-x-1">
									<MapPin size={18} />
									<span>Dallas, TX</span>
								</div>
							</div>
						</div>

						{/* Price */}
						<div className="bg-gray-800 p-6 rounded-2xl">
							<div className="flex items-baseline space-x-4">
								<span className="text-4xl font-bold text-red-500">${product.price.toLocaleString()}</span>
								<span className="text-gray-400">or $299/month</span>
							</div>
							<p className="text-gray-400 mt-2">Estimated monthly payment with approved credit</p>
						</div>

						{/* Key Specs */}
						<div className="bg-gray-800 p-6 rounded-2xl">
							<h3 className="text-xl font-semibold mb-4">Key Specifications</h3>
							<div className="grid grid-cols-2 gap-4">
								<div>
									<p className="text-gray-400">Transmission</p>
									<p className="font-semibold">{carDetails.transmission}</p>
								</div>
								<div>
									<p className="text-gray-400">Fuel Type</p>
									<p className="font-semibold">{carDetails.fuelType}</p>
								</div>
								<div>
									<p className="text-gray-400">Engine</p>
									<p className="font-semibold">{carDetails.engine}</p>
								</div>
								<div>
									<p className="text-gray-400">MPG</p>
									<p className="font-semibold">{carDetails.mpg}</p>
								</div>
							</div>
						</div>

						{/* Action Buttons */}
						<div className="flex space-x-4">
							<button
								onClick={handleContactDealer}
								className="flex-1 bg-red-600 hover:bg-red-700 text-white py-4 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
							>
								Contact Dealer
							</button>
							<button className="px-6 py-4 border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white rounded-lg font-semibold transition-all duration-300">
								Schedule Test Drive
							</button>
						</div>
					</motion.div>
				</div>

				{/* Detailed Information Tabs */}
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.4 }}
					className="mt-16"
				>
					<div className="grid lg:grid-cols-3 gap-8">
						{/* Description */}
						<div className="lg:col-span-2 bg-gray-800 p-8 rounded-2xl">
							<h3 className="text-2xl font-semibold mb-4">Vehicle Description</h3>
							<p className="text-gray-300 leading-relaxed mb-6">{product.description}</p>
							
							<h4 className="text-xl font-semibold mb-4">Vehicle Features</h4>
							<div className="grid grid-cols-2 gap-3">
								{carDetails.features.map((feature, index) => (
									<div key={index} className="flex items-center space-x-2">
										<Check size={16} className="text-green-500" />
										<span className="text-gray-300">{feature}</span>
									</div>
								))}
							</div>
						</div>

						{/* Vehicle Info */}
						<div className="bg-gray-800 p-8 rounded-2xl">
							<h3 className="text-2xl font-semibold mb-6">Vehicle Information</h3>
							<div className="space-y-4">
								<div>
									<p className="text-gray-400">Stock Number</p>
									<p className="font-semibold">{carDetails.stockNumber}</p>
								</div>
								<div>
									<p className="text-gray-400">VIN</p>
									<p className="font-semibold text-sm">{carDetails.vin}</p>
								</div>
								<div>
									<p className="text-gray-400">Exterior Color</p>
									<p className="font-semibold">{carDetails.exterior}</p>
								</div>
								<div>
									<p className="text-gray-400">Interior</p>
									<p className="font-semibold">{carDetails.interior}</p>
								</div>
								<div>
									<p className="text-gray-400">Drivetrain</p>
									<p className="font-semibold">{carDetails.drivetrain}</p>
								</div>
								<div>
									<p className="text-gray-400">Horsepower</p>
									<p className="font-semibold">{carDetails.horsepower}</p>
								</div>
							</div>

							{/* Dealer Contact */}
							<div className="mt-8 pt-8 border-t border-gray-700">
								<h4 className="text-lg font-semibold mb-4">Dealer Contact</h4>
								<div className="space-y-3">
									<div className="flex items-center space-x-3">
										<Phone size={16} className="text-red-500" />
										<span>(555) 123-4567</span>
									</div>
									<div className="flex items-center space-x-3">
										<Mail size={16} className="text-red-500" />
										<span>sales@strikers.com</span>
									</div>
									<div className="flex items-center space-x-3">
										<MapPin size={16} className="text-red-500" />
										<span>123 Auto Street, Car City, CC 12345</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</motion.div>
			</div>

			{/* Contact Form Modal */}
			{showContactForm && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						className="bg-gray-800 p-8 rounded-2xl max-w-md w-full"
					>
						<div className="flex justify-between items-center mb-6">
							<h3 className="text-2xl font-semibold">Contact Dealer</h3>
							<button
								onClick={() => setShowContactForm(false)}
								className="text-gray-400 hover:text-white"
							>
								<X size={24} />
							</button>
						</div>

						<form onSubmit={handleContactSubmit} className="space-y-4">
							<div>
								<label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
								<input
									type="text"
									value={contactForm.name}
									onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
									className="w-full bg-gray-700 text-white p-3 rounded-lg border border-gray-600 focus:border-red-500 focus:outline-none"
									required
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
								<input
									type="email"
									value={contactForm.email}
									onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
									className="w-full bg-gray-700 text-white p-3 rounded-lg border border-gray-600 focus:border-red-500 focus:outline-none"
									required
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
								<input
									type="tel"
									value={contactForm.phone}
									onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
									className="w-full bg-gray-700 text-white p-3 rounded-lg border border-gray-600 focus:border-red-500 focus:outline-none"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
								<textarea
									value={contactForm.message}
									onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
									className="w-full bg-gray-700 text-white p-3 rounded-lg border border-gray-600 focus:border-red-500 focus:outline-none h-24 resize-none"
									placeholder="I'm interested in this vehicle..."
									required
								/>
							</div>
							<button
								type="submit"
								className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition-all duration-300"
							>
								Send Message
							</button>
						</form>
					</motion.div>
				</div>
			)}
		</div>
	);
};

export default ProductPage;
