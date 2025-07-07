import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Car } from "lucide-react";

const ContactInfoPage = () => {
	return (
		<div className="min-h-screen bg-gray-900 pt-20">
			<div className="container mx-auto px-4 py-12">
				{/* Header */}
				<motion.div
					className="text-center mb-12"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					<h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
						Contact <span className="text-red-500">Information</span>
					</h1>
					<p className="text-xl text-gray-300 max-w-2xl mx-auto">
						Get in touch with STRIKERS NO TITLE CARS. We're here to help you
						find your perfect vehicle.
					</p>
				</motion.div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
					{/* Business Information */}
					<motion.div
						className="bg-gray-800 rounded-lg p-8 border border-gray-700"
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5, delay: 0.1 }}
					>
						<div className="flex items-center mb-6">
							<Car className="text-red-500 mr-3" size={32} />
							<h2 className="text-2xl font-bold text-white">Business Info</h2>
						</div>

						<div className="space-y-6">
							{/* Phone */}
							<div className="flex items-start space-x-4">
								<Phone className="text-red-500 mt-1" size={24} />
								<div>
									<h3 className="text-lg font-semibold text-white mb-1">
										Phone
									</h3>
									<p className="text-gray-300 text-lg">+1 (281) 628-1854</p>
									<p className="text-gray-400 text-sm">Sales & Support</p>
								</div>
							</div>

							{/* Email */}
							<div className="flex items-start space-x-4">
								<Mail className="text-red-500 mt-1" size={24} />
								<div>
									<h3 className="text-lg font-semibold text-white mb-1">
										Email
									</h3>
									<p className="text-gray-300 text-lg">
										info@strikersauto.shop
									</p>
									<p className="text-gray-400 text-sm">
										We respond within 24 hours
									</p>
								</div>
							</div>

							{/* Address */}
							<div className="flex items-start space-x-4">
								<MapPin className="text-red-500 mt-1" size={24} />
								<div>
									<h3 className="text-lg font-semibold text-white mb-1">
										Location
									</h3>
									<p className="text-gray-300 text-lg">123 Auto Street</p>
									<p className="text-gray-300 text-lg">Car City, CC 12345</p>
									<p className="text-gray-400 text-sm">United States</p>
								</div>
							</div>

							{/* Hours */}
							<div className="flex items-start space-x-4">
								<Clock className="text-red-500 mt-1" size={24} />
								<div>
									<h3 className="text-lg font-semibold text-white mb-1">
										Business Hours
									</h3>
									<div className="text-gray-300 space-y-1">
										<p>Monday - Saturday: 9:00 AM - 8:00 PM</p>
										<p>Sunday: 11:00 AM - 6:00 PM</p>
									</div>
									<p className="text-gray-400 text-sm mt-2">
										Holiday hours may vary
									</p>
								</div>
							</div>
						</div>
					</motion.div>

					{/* Quick Contact Form */}
					<motion.div
						className="bg-gray-800 rounded-lg p-8 border border-gray-700"
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
					>
						<h2 className="text-2xl font-bold text-white mb-6">
							Quick Contact
						</h2>

						<div className="space-y-6">
							<div className="bg-gray-700 p-6 rounded-lg">
								<h3 className="text-lg font-semibold text-white mb-3">
									Need Immediate Assistance?
								</h3>
								<p className="text-gray-300 mb-4">
									Call us directly for immediate support or visit our showroom
									during business hours.
								</p>
								<a
									href="tel:+12816281854"
									className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md transition-colors"
								>
									<Phone className="mr-2" size={18} />
									Call Now
								</a>
							</div>

							<div className="bg-gray-700 p-6 rounded-lg">
								<h3 className="text-lg font-semibold text-white mb-3">
									Send us an Email
								</h3>
								<p className="text-gray-300 mb-4">
									For detailed inquiries or to schedule a viewing, send us an
									email.
								</p>
								<a
									href="mailto:info@strikersauto.shop"
									className="inline-flex items-center bg-gray-600 hover:bg-gray-500 text-white px-6 py-3 rounded-md transition-colors"
								>
									<Mail className="mr-2" size={18} />
									Send Email
								</a>
							</div>

							<div className="bg-gradient-to-r from-red-600 to-red-700 p-6 rounded-lg">
								<h3 className="text-lg font-semibold text-white mb-3">
									Special Services
								</h3>
								<ul className="text-gray-100 space-y-2">
									<li>• No Title Car Specialists</li>
									<li>• Financing Available</li>
									<li>• Trade-ins Welcome</li>
									<li>• Extended Warranties</li>
								</ul>
							</div>
						</div>
					</motion.div>
				</div>

				{/* Additional Info */}
				<motion.div
					className="mt-12 text-center"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.3 }}
				>
					<div className="bg-gray-800 rounded-lg p-8 border border-gray-700 max-w-4xl mx-auto">
						<h3 className="text-2xl font-bold text-white mb-4">
							Why Choose STRIKERS?
						</h3>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-300">
							<div>
								<h4 className="font-semibold text-red-400 mb-2">
									Expert Service
								</h4>
								<p>Over 10 years of experience in the automotive industry</p>
							</div>
							<div>
								<h4 className="font-semibold text-red-400 mb-2">
									Quality Vehicles
								</h4>
								<p>
									Carefully inspected and tested vehicles for your peace of mind
								</p>
							</div>
							<div>
								<h4 className="font-semibold text-red-400 mb-2">
									Customer First
								</h4>
								<p>Dedicated to providing exceptional customer service</p>
							</div>
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	);
};

export default ContactInfoPage;
