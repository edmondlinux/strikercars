
import { motion } from "framer-motion";
import { Trash, Edit } from "lucide-react";
import { useCategoryStore } from "../stores/useCategoryStore";

const CategoriesList = () => {
	const { categories, deleteCategory } = useCategoryStore();

	const handleDeleteCategory = (id) => {
		if (window.confirm("Are you sure you want to delete this category?")) {
			deleteCategory(id);
		}
	};

	return (
		<motion.div
			className='bg-gray-800 shadow-xl rounded-lg overflow-hidden max-w-4xl mx-auto'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8 }}
		>
			<table className='min-w-full divide-y divide-gray-700'>
				<thead className='bg-gray-700'>
					<tr>
						<th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>
							Category
						</th>
						<th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>
							Description
						</th>
						<th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>
							Actions
						</th>
					</tr>
				</thead>

				<tbody className='bg-gray-800 divide-y divide-gray-700'>
					{categories?.map((category) => (
						<tr key={category._id} className='hover:bg-gray-700'>
							<td className='px-6 py-4 whitespace-nowrap'>
								<div className='flex items-center'>
									<div className='flex-shrink-0 h-10 w-10'>
										<img className='h-10 w-10 rounded-full object-cover' src={category.image} alt={category.name} />
									</div>
									<div className='ml-4'>
										<div className='text-sm font-medium text-white'>{category.name}</div>
									</div>
								</div>
							</td>

							<td className='px-6 py-4 whitespace-nowrap'>
								<div className='text-sm text-gray-300'>{category.description}</div>
							</td>

							<td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
								<button className='text-red-400 hover:text-red-300 mr-2'>
									<Edit size={18} />
								</button>
								<button
									onClick={() => handleDeleteCategory(category._id)}
									className='text-red-400 hover:text-red-300'
								>
									<Trash size={18} />
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</motion.div>
	);
};

export default CategoriesList;
