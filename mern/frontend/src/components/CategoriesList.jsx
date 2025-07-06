
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
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Edit, Trash2, Upload, Save, X } from "lucide-react";
import { useCategoryStore } from "../stores/useCategoryStore";

const CategoriesList = () => {
	const { categories, fetchAllCategories, deleteCategory, updateCategory, loading } = useCategoryStore();
	const [editingCategory, setEditingCategory] = useState(null);
	const [editForm, setEditForm] = useState({
		name: "",
		description: "",
		href: "",
		image: ""
	});

	useEffect(() => {
		fetchAllCategories();
	}, [fetchAllCategories]);

	const handleEdit = (category) => {
		setEditingCategory(category._id);
		setEditForm({
			name: category.name,
			description: category.description,
			href: category.href,
			image: category.image
		});
	};

	const handleCancelEdit = () => {
		setEditingCategory(null);
		setEditForm({ name: "", description: "", href: "", image: "" });
	};

	const handleSaveEdit = async () => {
		try {
			await updateCategory(editingCategory, editForm);
			setEditingCategory(null);
			setEditForm({ name: "", description: "", href: "", image: "" });
		} catch (error) {
			console.error("Error updating category:", error);
		}
	};

	const handleDelete = async (categoryId) => {
		if (window.confirm("Are you sure you want to delete this category?")) {
			await deleteCategory(categoryId);
		}
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setEditForm({ ...editForm, image: reader.result });
			};
			reader.readAsDataURL(file);
		}
	};

	return (
		<motion.div
			className='bg-gray-800 shadow-xl rounded-lg p-6'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8 }}
		>
			<h2 className='text-2xl font-bold mb-6 text-red-400'>Manage Categories</h2>
			
			{loading ? (
				<div className="text-center py-8">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"></div>
					<p className="text-gray-300 mt-4">Loading categories...</p>
				</div>
			) : categories.length === 0 ? (
				<p className="text-gray-300 text-center py-8">No categories found.</p>
			) : (
				<div className='space-y-4'>
					{categories.map((category) => (
						<div key={category._id} className='bg-gray-700 rounded-lg p-4'>
							{editingCategory === category._id ? (
								<div className='space-y-4'>
									<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
										<div>
											<label className='block text-sm font-medium text-gray-300 mb-1'>
												Category Name
											</label>
											<input
												type='text'
												value={editForm.name}
												onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
												className='w-full bg-gray-600 border border-gray-500 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500'
											/>
										</div>
										<div>
											<label className='block text-sm font-medium text-gray-300 mb-1'>
												URL Path
											</label>
											<input
												type='text'
												value={editForm.href}
												onChange={(e) => setEditForm({ ...editForm, href: e.target.value })}
												className='w-full bg-gray-600 border border-gray-500 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500'
											/>
										</div>
									</div>
									<div>
										<label className='block text-sm font-medium text-gray-300 mb-1'>
											Description
										</label>
										<textarea
											value={editForm.description}
											onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
											rows={3}
											className='w-full bg-gray-600 border border-gray-500 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500'
										/>
									</div>
									<div>
										<label className='block text-sm font-medium text-gray-300 mb-1'>
											Category Image
										</label>
										<div className='flex items-center space-x-4'>
											<input
												type='file'
												accept='image/*'
												onChange={handleImageChange}
												className='block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-red-600 file:text-white hover:file:bg-red-700'
											/>
											{editForm.image && (
												<img
													src={editForm.image}
													alt="Preview"
													className='w-16 h-16 object-cover rounded-lg'
												/>
											)}
										</div>
									</div>
									<div className='flex space-x-2'>
										<button
											onClick={handleSaveEdit}
											className='bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center transition duration-300'
										>
											<Save size={16} className='mr-1' />
											Save
										</button>
										<button
											onClick={handleCancelEdit}
											className='bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-md flex items-center transition duration-300'
										>
											<X size={16} className='mr-1' />
											Cancel
										</button>
									</div>
								</div>
							) : (
								<div className='flex items-center justify-between'>
									<div className='flex items-center space-x-4'>
										<img
											src={category.image}
											alt={category.name}
											className='w-16 h-16 object-cover rounded-lg'
										/>
										<div>
											<h3 className='text-white font-medium'>{category.name}</h3>
											<p className='text-gray-300 text-sm'>{category.description}</p>
											<p className='text-red-400 text-sm'>{category.href}</p>
										</div>
									</div>
									<div className='flex space-x-2'>
										<button
											onClick={() => handleEdit(category)}
											className='bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md transition duration-300'
											title="Edit Category"
										>
											<Edit size={16} />
										</button>
										<button
											onClick={() => handleDelete(category._id)}
											className='bg-red-600 hover:bg-red-700 text-white p-2 rounded-md transition duration-300'
											title="Delete Category"
										>
											<Trash2 size={16} />
										</button>
									</div>
								</div>
							)}
						</div>
					))}
				</div>
			)}
		</motion.div>
	);
};

export default CategoriesList;
