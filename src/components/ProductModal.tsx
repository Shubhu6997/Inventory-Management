import { useState, useEffect } from 'react';
import { useAppDispatch } from '../app/hooks';
import { addProduct, editProduct } from '../features/products/productSlice';
import { Product } from '../types';

interface ProductModalProps {
  onClose: () => void;
  productToEdit?: Product;  // Optional, passed when editing an existing product
}

const ProductModal: React.FC<ProductModalProps> = ({ onClose, productToEdit }) => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState('');
  const [category, setCategory] = useState<'Electronics' | 'Apparel' | 'Food'>('Electronics');
  const [stock, setStock] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);

  // If editing, populate the form with existing product data
  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name);
      setCategory(productToEdit.category);
      setStock(productToEdit.stock);
      setPrice(productToEdit.price);
    }
  }, [productToEdit]);

  const handleSubmit = () => {
    if (!name || !category || stock < 0 || price <= 0) {
      alert('Please fill all fields correctly.');
      return;
    }

    if (productToEdit) {
      // Editing an existing product
      dispatch(
        editProduct({
          ...productToEdit,
          name,
          category,
          stock,
          price,
        })
      );
    } else {
      // Adding a new product
      dispatch(
        addProduct({
          name,
          category,
          stock,
          price,
        })
      );
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white p-4 rounded shadow w-96">
        <h2 className="text-lg font-semibold mb-2">{productToEdit ? 'Edit Product' : 'Add Product'}</h2>
        <input
          className="border w-full mb-2 p-1"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as 'Electronics' | 'Apparel' | 'Food')}
          className="border w-full mb-2 p-1"
        >
          <option value="Electronics">Electronics</option>
          <option value="Apparel">Apparel</option>
          <option value="Food">Food</option>
        </select>
        <input
          type="number"
          className="border w-full mb-2 p-1"
          placeholder="Stock"
          value={stock}
          onChange={e => setStock(+e.target.value)}
        />
        <input
          type="number"
          className="border w-full mb-2 p-1"
          placeholder="Price"
          value={price}
          onChange={e => setPrice(+e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSubmit} className="bg-blue-600 text-white px-2 py-1 rounded">
            {productToEdit ? 'Save Changes' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
