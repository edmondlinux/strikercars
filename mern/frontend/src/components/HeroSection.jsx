
import { motion } from "framer-motion";
import { ArrowRight, Star, Award, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const HeroSection = () => {
	const [displayText, setDisplayText] = useState("");
	const [currentLineIndex, setCurrentLineIndex] = useState(0);
	const [currentCharIndex, setCurrentCharIndex] = useState(0);
	const [isDeleting, setIsDeleting] = useState(false);
	const [isWaiting, setIsWaiting] = useState(false);

	const lines = [
		{ text: "DRIVE YOUR", color: "text-white" },
		{ text: "DREAM CAR", color: "text-red-500" },
		{ text: "TODAY", color: "text-white" }
	];

	useEffect(() => {
		const timeout = setTimeout(() => {
			if (isWaiting) {
				setIsWaiting(false);
				setIsDeleting(true);
				return;
			}

			const currentLine = lines[currentLineIndex];
			const currentText = currentLine.text;

			if (!isDeleting) {
				// Typing
				if (currentCharIndex < currentText.length) {
					setDisplayText(currentText.substring(0, currentCharIndex + 1));
					setCurrentCharIndex(currentCharIndex + 1);
				} else {
					// Line complete, move to next line or start deleting
					if (currentLineIndex < lines.length - 1) {
						setCurrentLineIndex(currentLineIndex + 1);
						setCurrentCharIndex(0);
					} else {
						// All lines complete, wait then start deleting
						setIsWaiting(true);
					}
				}
			} else {
				// Deleting
				if (currentCharIndex > 0) {
					setDisplayText(currentText.substring(0, currentCharIndex - 1));
					setCurrentCharIndex(currentCharIndex - 1);
				} else {
					// Character deletion complete for current line
					if (currentLineIndex > 0) {
						setCurrentLineIndex(currentLineIndex - 1);
						setCurrentCharIndex(lines[currentLineIndex - 1].text.length);
					} else {
						// All lines deleted, start over
						setIsDeleting(false);
						setCurrentCharIndex(0);
					}
				}
			}
		}, isDeleting ? 50 : isWaiting ? 2000 : 100);

		return () => clearTimeout(timeout);
	}, [currentCharIndex, currentLineIndex, isDeleting, isWaiting]);

	const getCurrentLineColor = () => {
		return lines[currentLineIndex]?.color || "text-white";
	};

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
							<h1 className='text-5xl lg:text-7xl font-bold leading-tight min-h-[200px]'>
								<span className={getCurrentLineColor()}>
									{displayText}
									<span className="animate-pulse">|</span>
								</span>
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

					
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
