import { useEffect, useState } from "react";
import { Eye, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useFavoriteStore } from "../stores/useFavoriteStore";

const FeaturedProducts = ({ featuredProducts }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [itemsPerPage, setItemsPerPage] = useState(4);
	const navigate = useNavigate();
	const { addToFavorites } = useFavoriteStore();

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 640) setItemsPerPage(1);
			else if (window.innerWidth < 1024) setItemsPerPage(2);
			else if (window.innerWidth < 1280) setItemsPerPage(3);
			else setItemsPerPage(4);
		};

		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const nextSlide = () => {
		setCurrentIndex((prevIndex) => prevIndex + itemsPerPage);
	};

	const prevSlide = () => {
		setCurrentIndex((prevIndex) => prevIndex - itemsPerPage);
	};

	// Limit to 3 featured products maximum
	const displayProducts = featuredProducts?.slice(0, 3) || [];

	const isStartDisabled = currentIndex === 0;
	const isEndDisabled = currentIndex >= displayProducts.length - itemsPerPage;

	return (
		<div className='py-12'>
			<div className='container mx-auto px-4'>
				<h2 className='text-center text-5xl sm:text-6xl font-bold text-red-400 mb-4'>Featured Cars</h2>
				
				{displayProducts.length === 0 ? (
					<div className='text-center py-12'>
						<p className='text-gray-400 text-lg'>No featured cars available at the moment</p>
					</div>
				) : (
				<div className='relative'>
					<div className='overflow-hidden'>
						<div
							className='flex transition-transform duration-300 ease-in-out'
							style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}
						>
							{displayProducts.map((product) => (
								<div key={product._id} className='w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 flex-shrink-0 px-2'>
									<div className='bg-white bg-opacity-10 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden h-full transition-all duration-300 hover:shadow-xl border border-red-500/30'>
										<div className='overflow-hidden relative'>
											<img
												src={product.image}
												alt={product.name}
												className='w-full h-48 object-cover transition-transform duration-300 ease-in-out hover:scale-110'
											/>
											<div className='absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100'>
												<button
													onClick={() => navigate(`/products/${product._id}`)}
													className='bg-red-600 hover:bg-red-700 text-white p-3 rounded-full transition-colors duration-300 mr-2'
													title="View Details"
												>
													<Eye className='w-5 h-5' />
												</button>
												<button
													onClick={(e) => {
														e.stopPropagation();
														addToFavorites(product);
													}}
													className='bg-gray-700 hover:bg-gray-600 text-white p-3 rounded-full transition-colors duration-300'
													title="Add to Favorites"
												>
													<Heart className='w-5 h-5' />
												</button>
											</div>
										</div>
										<div className='p-4'>
											<h3 className='text-lg font-semibold mb-2 text-white'>{product.name}</h3>
											<p className='text-red-300 font-bold text-xl mb-4'>
												${product.price.toLocaleString()}
											</p>
											<div className='flex space-x-2'>
												<button
													onClick={() => navigate(`/products/${product._id}`)}
													className='flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition-colors duration-300 
													flex items-center justify-center'
												>
													<Eye className='w-5 h-5 mr-2' />
													View Details
												</button>
												<button
													onClick={(e) => {
														e.stopPropagation();
														addToFavorites(product);
													}}
													className='bg-gray-700 hover:bg-gray-600 text-white py-2 px-3 rounded transition-colors duration-300'
													title="Add to Favorites"
												>
													<Heart className='w-5 h-5' />
												</button>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
					<button
						onClick={prevSlide}
						disabled={isStartDisabled}
						className={`absolute top-1/2 -left-4 transform -translate-y-1/2 p-2 rounded-full transition-colors duration-300 ${
							isStartDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-500"
						}`}
					>
						<ChevronLeft className='w-6 h-6' />
					</button>

					<button
						onClick={nextSlide}
						disabled={isEndDisabled}
						className={`absolute top-1/2 -right-4 transform -translate-y-1/2 p-2 rounded-full transition-colors duration-300 ${
							isEndDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-500"
						}`}
					>
						<ChevronRight className='w-6 h-6' />
					</button>
				</div>
				)}
			</div>
		</div>
	);
};
export default FeaturedProducts;
