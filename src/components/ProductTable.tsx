import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  deleteSelectedProducts,
  deleteProductById,
  toggleSelectProduct,
  toggleSelectAll,
} from '../features/products/productSlice';
import { RootState } from '../app/store';
import { Product } from '../types';
import ProductModal from './ProductModal';

const ProductTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products, selected } = useAppSelector((state: RootState) => state.products);
  const { categories, inStockOnly } = useAppSelector((state: RootState) => state.filters);

  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);

  const itemsPerPage = 5;

  const [sortConfig, setSortConfig] = useState<{ key: keyof Product; direction: 'asc' | 'desc' }>({
    key: 'name',
    direction: 'asc',
  });

  const filtered = products.filter((product) => {
    const categoryMatch = categories.length === 0 || categories.includes(product.category);
    const stockMatch = !inStockOnly || product.stock > 0;
    return categoryMatch && stockMatch;
  });

  const sortedProducts = filtered.sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const paginated = sortedProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const handleToggleAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleSelectAll(e.target.checked));
  };

  const handleEditProduct = (product: Product) => {
    setProductToEdit(product);
    setIsModalOpen(true);
  };

  const handleSort = (key: keyof Product) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr>
            <th className="px-4 py-2">
              <input
                type="checkbox"
                checked={paginated.every((p) => selected.includes(p.id))}
                onChange={handleToggleAll}
              />
            </th>
            <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('name')}>
              Name {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </th>
            <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('category')}>
              Category {sortConfig.key === 'category' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </th>
            <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('stock')}>
              Stock {sortConfig.key === 'stock' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </th>
            <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('price')}>
              Price {sortConfig.key === 'price' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((product) => (
            <tr key={product.id} className="text-center border-t">
              <td className="px-4 py-2">
                <input
                  type="checkbox"
                  checked={selected.includes(product.id)}
                  onChange={() => dispatch(toggleSelectProduct(product.id))}
                />
              </td>
              <td className="px-4 py-2">{product.name}</td>
              <td className="px-4 py-2">{product.category}</td>
              <td className="px-4 py-2">
                {product.stock <= 5 ? (
                  <span className="text-red-600 font-semibold">
                    {product.stock} ⚠ Low
                  </span>
                ) : (
                  product.stock
                )}
              </td>
              <td className="px-4 py-2">${product.price.toFixed(2)}</td>
              <td className="px-4 py-2">
                <button onClick={() => handleEditProduct(product)} className="text-blue-600 hover:underline">
                  Edit
                </button>
                <button
                  onClick={() => {
                    if (window.confirm(`Delete "${product.name}"?`)) {
                      dispatch(deleteProductById(product.id));
                    }
                  }}
                  className="text-red-600 hover:underline ml-4"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {paginated.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center text-gray-500 py-4">
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {selected.length > 0 && (
        <div className="mt-4 text-right">
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to delete the selected products?')) {
                dispatch(deleteSelectedProducts());
              }
            }}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Delete Selected ({selected.length})
          </button>
        </div>
      )}

      <div className="flex justify-between items-center mt-4">
        <div>
          Page {currentPage} of {totalPages}
        </div>
        <div className="space-x-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            Prev
          </button>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            Next
          </button>
        </div>
      </div>

      {isModalOpen && productToEdit && (
        <ProductModal onClose={() => setIsModalOpen(false)} productToEdit={productToEdit} />
      )}
    </div>
  );
};

export default ProductTable;
