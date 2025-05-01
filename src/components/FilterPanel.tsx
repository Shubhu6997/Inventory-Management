import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setCategories, toggleInStockOnly } from '../features/filters/filterSlice';

const FilterPanel: React.FC = () => {
  const dispatch = useAppDispatch();
  const { categories, inStockOnly } = useAppSelector(state => state.filters);

  const allCategories = ['Electronics', 'Apparel', 'Food'];

  const toggleCategory = (cat: string) => {
    const updated = categories.includes(cat)
      ? categories.filter(c => c !== cat)
      : [...categories, cat];
    dispatch(setCategories(updated));
  };

  return (
    <div className="flex gap-4 my-4">
      {allCategories.map(cat => (
        <label key={cat} className="flex items-center gap-1">
          <input
            type="checkbox"
            checked={categories.includes(cat)}
            onChange={() => toggleCategory(cat)}
          />
          {cat}
        </label>
      ))}
      <label className="ml-4 flex items-center gap-2">
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={() => dispatch(toggleInStockOnly())}         
        />
        In Stock Only
      </label>
    </div>
  );
};

export default FilterPanel;
