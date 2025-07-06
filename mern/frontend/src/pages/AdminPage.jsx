import { BarChart, PlusCircle, ShoppingBasket, Grid3X3 } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import AnalyticsTab from "../components/AnalyticsTab";
import CreateProductForm from "../components/CreateProductForm";
import ProductsList from "../components/ProductsList";
import CreateCategoryForm from "../components/CreateCategoryForm";
import CategoriesList from "../components/CategoriesList";
import { useProductStore } from "../stores/useProductStore";
import { useCategoryStore } from "../stores/useCategoryStore";

const tabs = [
	{ id: "create", label: "Create Product", icon: PlusCircle },
	{ id: "products", label: "Products", icon: ShoppingBasket },
	{ id: "categories", label: "Categories", icon: Grid3X3 },
	{ id: "analytics", label: "Analytics", icon: BarChart },
];

const AdminPage = () => {
	const [activeTab, setActiveTab] = useState("create");
	const { fetchAllProducts, products } = useProductStore();
	const { fetchAllCategories } = useCategoryStore();

	useEffect(() => {
		fetchAllProducts();
		fetchAllCategories();
	}, [fetchAllProducts, fetchAllCategories]);

	return (
		<div className='min-h-screen relative overflow-hidden bg-gray-900'>
			<div className='relative z-10 container mx-auto px-4 pt-24 pb-16'>
				<motion.div
					className='bg-gradient-to-r from-emerald-800 to-emerald-600 rounded-xl p-8 mb-8 shadow-2xl'
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					<h1 className='text-4xl font-bold text-white text-center mb-2'>
						Admin Dashboard
					</h1>
					<p className='text-emerald-100 text-center'>Manage your products, categories, and analytics</p>
				</motion.div>

				<div className='flex flex-wrap justify-center gap-4 mb-8'>
					{tabs.map((tab) => (
						<button
							key={tab.id}
							onClick={() => setActiveTab(tab.id)}
							className={`flex items-center px-6 py-3 rounded-lg transition-all duration-300 font-medium shadow-lg ${
								activeTab === tab.id
									? "bg-emerald-600 text-white shadow-emerald-500/50 scale-105"
									: "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:shadow-gray-700/50 hover:scale-102"
							}`}
						>
							<tab.icon className='mr-3 h-5 w-5' />
							{tab.label}
						</button>
					))}
				</div>
				{activeTab === "create" && <CreateProductForm />}
				{activeTab === "products" && <ProductsList />}
				{activeTab === "categories" && (
					<div className="space-y-8">
						<CreateCategoryForm />
						<CategoriesList />
					</div>
				)}
				{activeTab === "analytics" && <AnalyticsTab />}
			</div>
		</div>
	);
};
export default AdminPage;