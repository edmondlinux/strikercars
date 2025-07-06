
import toast from "react-hot-toast";
import { Heart, Eye, Calendar, Gauge } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useState } from "react";

const CarCard = ({ car }) => {
	const { user } = useUserStore();
	const [isLiked, setIsLiked] = useState(false);

	const handleContactDealer = () => {
		if (!user) {
			toast.error("Please login to contact dealer", { id: "login" });
			return;
		}
		toast.success("Dealer contact information sent to your email!");
	};

	const handleToggleLike = () => {
		setIsLiked(!isLiked);
		toast.success(isLiked ? "Removed from favorites" : "Added to favorites");
	};

	return (
		<div className='flex w-full relative flex-col overflow-hidden rounded-2xl border border-gray-700 shadow-xl bg-gray-800 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1'>
			<div className='relative mx-4 mt-4 flex h-60 overflow-hidden rounded-xl'>
				<img className='object-cover w-full h-full' src={car.image} alt={car.name} />
				<div className='absolute inset-0 bg-black bg-opacity-20' />
				
				{/* Action buttons */}
				<div className='absolute top-3 right-3 flex flex-col space-y-2'>
					<button
						onClick={handleToggleLike}
						className={`p-2 rounded-full transition-all duration-300 ${
							isLiked ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-red-500'
						}`}
					>
						<Heart size={18} fill={isLiked ? 'white' : 'none'} />
					</button>
					<button className='p-2 rounded-full bg-white/20 text-white hover:bg-gray-700 transition-all duration-300'>
						<Eye size={18} />
					</button>
				</div>

				{/* Status badge */}
				<div className='absolute top-3 left-3'>
					<span className='bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium'>
						Available
					</span>
				</div>
			</div>

			<div className='mt-4 px-5 pb-5 flex-1 flex flex-col'>
				<h5 className='text-xl font-bold tracking-tight text-white mb-2'>{car.name}</h5>
				
				{/* Car details */}
				<div className='flex items-center space-x-4 mb-4 text-gray-300'>
					<div className='flex items-center space-x-1'>
						<Calendar size={16} />
						<span className='text-sm'>2020</span>
					</div>
					<div className='flex items-center space-x-1'>
						<Gauge size={16} />
						<span className='text-sm'>45K miles</span>
					</div>
				</div>

				<p className='text-gray-400 text-sm mb-4 line-clamp-2'>
					{car.description || "Well-maintained vehicle with clean history. Perfect for daily commuting."}
				</p>

				<div className='mt-auto'>
					<div className='flex items-center justify-between mb-4'>
						<div>
							<p className='text-3xl font-bold text-red-500'>${car.price.toLocaleString()}</p>
							<p className='text-sm text-gray-400'>or $299/month</p>
						</div>
					</div>

					<div className='flex space-x-2'>
						<button
							className='flex-1 flex items-center justify-center rounded-lg bg-red-600 px-4 py-3 text-center text-sm font-medium
							text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 transition-all duration-300'
							onClick={handleContactDealer}
						>
							Contact Dealer
						</button>
						<button className='px-4 py-3 border border-red-600 text-red-600 hover:bg-red-600 hover:text-white rounded-lg transition-all duration-300'>
							View Details
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CarCard;
