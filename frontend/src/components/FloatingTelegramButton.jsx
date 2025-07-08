
import { motion } from "framer-motion";

const FloatingTelegramButton = () => {
	return (
		<motion.a
			href="https://t.me/yourz_bans"
			target="_blank"
			rel="noopener noreferrer"
			className="fixed bottom-6 right-6 z-50 bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg transition-colors duration-300"
			whileHover={{ scale: 1.1 }}
			whileTap={{ scale: 0.9 }}
			initial={{ opacity: 0, y: 100 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: 1 }}
		>
			<img
				src="/telegram-logo.png"
				alt="Telegram"
				className="w-8 h-8"
			/>
		</motion.a>
	);
};

export default FloatingTelegramButton;
