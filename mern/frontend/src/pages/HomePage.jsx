
import { useEffect } from "react";
import HeroSection from "../components/HeroSection";
import CarCategories from "../components/CarCategories";
import WhyChooseUs from "../components/WhyChooseUs";
import Testimonials from "../components/Testimonials";
import CallToAction from "../components/CallToAction";
import ProductGrid from "../components/ProductGrid";
import { useProductStore } from "../stores/useProductStore";

const HomePage = () => {
	const { fetchFeaturedProducts, products, loading } = useProductStore();

	useEffect(() => {
		fetchFeaturedProducts();
	}, [fetchFeaturedProducts]);
	return (
		<div className='relative min-h-screen text-white overflow-hidden bg-gray-900'>
			{/* Background gradient */}
			<div className='absolute inset-0 overflow-hidden'>
				<div className='absolute inset-0'>
					<div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(239,68,68,0.3)_0%,rgba(153,27,27,0.2)_45%,rgba(0,0,0,0.1)_100%)]' />
				</div>
			</div>

			<div className='relative z-10'>
				<HeroSection />



				{/* Featured Products Section */}
				<section className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
					<div className="text-center mb-12">
						<h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
							Featured Vehicles
						</h2>
						<p className="text-gray-300 text-lg max-w-2xl mx-auto">
							Discover our handpicked selection of premium vehicles
						</p>
					</div>

					{loading ? (
						<div className="flex justify-center items-center py-16">
							<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
						</div>
					) : (
						<ProductGrid products={products} viewMode="grid" />
					)}
				</section>
			
				<CarCategories />
				<WhyChooseUs />
				<Testimonials />
				<CallToAction />
				
				
			</div>
		</div>
	);
};

export default HomePage;
