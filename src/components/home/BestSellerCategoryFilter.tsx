interface Category {
  name: string;
  filter: string;
}

interface BestSellerCategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (categoryFilter: string) => void;
}

const BestSellerCategoryFilter: React.FC<BestSellerCategoryFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div
      className="best-seller-category-filter flex justify-center flex-wrap gap-2 mb-10"
      role="group"
    >
      {categories.map((cat) => (
        <button
          key={cat.filter}
          onClick={() => onSelectCategory(cat.filter)}
          className={`px-4 py-2 text-sm font-medium transition-colors duration-200 cursor-pointer ${
            selectedCategory === cat.filter
              ? "bg-blue-600 text-white shadow-md"
              : "hover:bg-blue-100"
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
};

export default BestSellerCategoryFilter;
