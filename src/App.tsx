import { useState } from 'react';
import ProductTable from './components/ProductTable';
import FilterPanel from './components/FilterPanel';
import ProductModal from './components/ProductModal';

const App: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Inventory Dashboard</h1>
      <FilterPanel />
      <button onClick={() => setShowModal(true)} className="mb-4 bg-green-600 text-white px-4 py-1 rounded">
        + Add Product
      </button>
      <ProductTable />
      {showModal && <ProductModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default App;
