
import { Car, Phone, MapPin, LogIn, LogOut, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";

const Navbar = () => {
	const { user, logout } = useUserStore();
	const isAdmin = user?.role === "admin";

	return (
		<header className='fixed top-0 left-0 w-full bg-gray-900 bg-opacity-95 backdrop-blur-md shadow-xl z-50 transition-all duration-300 border-b border-red-600'>
			<div className='container mx-auto px-4 py-3'>
				{/* Top bar with contact info */}
				<div className='hidden md:flex justify-between items-center text-sm text-gray-300 pb-2 border-b border-gray-700'>
					<div className='flex items-center space-x-6'>
						<div className='flex items-center space-x-2'>
							<Phone size={14} />
							<span>(555) 123-4567</span>
						</div>
						<div className='flex items-center space-x-2'>
							<MapPin size={14} />
							<span>123 Auto Street, Car City, CC 12345</span>
						</div>
					</div>
					<div className='text-red-400 font-medium'>
						Open Mon-Sat 9AM-8PM, Sun 11AM-6PM
					</div>
				</div>

				{/* Main navigation */}
				<div className='flex flex-wrap justify-between items-center pt-2'>
					<Link to='/' className='flex items-center space-x-3'>
						<Car className='text-red-500' size={32} />
						<div>
							<h1 className='text-2xl font-bold text-white'>STRIKERS</h1>
							<p className='text-xs text-red-400 font-medium'>NO TITLE CARS</p>
						</div>
					</Link>

					<nav className='flex flex-wrap items-center gap-6'>
						<Link
							to="/"
							className='text-gray-300 hover:text-red-400 transition duration-300 font-medium'
						>
							Home
						</Link>
						<Link
							to="/shop"
							className='text-gray-300 hover:text-red-400 transition duration-300 font-medium'
						>
							Shop
						</Link>
						<Link
							to="/payments"
							className='text-gray-300 hover:text-red-400 transition duration-300 font-medium'
						>
							Payments
						</Link>

						{isAdmin && (
							<Link
								className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium
								 transition duration-300 ease-in-out flex items-center'
								to="/admin-dashboard"
							>
								<Shield className='inline-block mr-2' size={18} />
								<span className='hidden sm:inline'>Admin</span>
							</Link>
						)}

						{user ? (
							<button
								className='bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 
								rounded-md flex items-center transition duration-300 ease-in-out'
								onClick={logout}
							>
								<LogOut size={18} />
								<span className='hidden sm:inline ml-2'>Log Out</span>
							</button>
						) : (
							<Link
								to="/login"
								className='bg-red-600 hover:bg-red-700 text-white py-2 px-4 
								rounded-md flex items-center transition duration-300 ease-in-out'
							>
								<LogIn className='mr-2' size={18} />
								Login
							</Link>
						)}
					</nav>
				</div>
			</div>
		</header>
	);
};

export default Navbar;
