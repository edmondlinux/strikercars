import HeroSection from "../components/HeroSection";
import CategoryItem from "../components/CategoryItem";
import { useProductStore } from "../stores/useProductStore";
import { useEffect } from "react";
import FeaturedCars from "../components/FeaturedCars";
import { useCategoryStore } from "../stores/useCategoryStore";
import CallToAction from "../components/CallToAction";
import WhyChooseUs from "../components/WhyChooseUs";
import Testimonials from "../components/Testimonials";
import SEOHead from "../components/SEOHead";

const HomePage = () => {
	return (
		<div className='relative min-h-screen text-white overflow-hidden bg-gray-900'>
			{/* Background gradient */}
			<div className='absolute inset-0 overflow-hidden'>
				<div className='absolute inset-0'>
					<div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(239,68,68,0.3)_0%,rgba(153,27,27,0.2)_45%,rgba(0,0,0,0.1)_100%)]' />
				</div>
			</div>

			<div className='relative z-10'>
				<SEOHead 
					title="Strikers No Title Cars - Quality Pre-Owned Vehicles"
					description="Find quality pre-owned vehicles at Strikers No Title Cars. We specialize in helping customers with all credit situations find reliable transportation. Browse our inventory of cars, SUVs, and more."
					keywords="used cars, pre-owned vehicles, no title cars, affordable cars, car dealership, auto sales, financing available"
					url="/"
					type="website"
				/>
				<HeroSection />
				<CarCategories />
				<FeaturedCars />
				<WhyChooseUs />
				<Testimonials />
				<CallToAction />
			</div>
		</div>
	);
};

export default HomePage;