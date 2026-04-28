export default function FilterBar({ categories, activeCategory, onSelect }) {
  return (
    <div className="filter-bar">
      {categories.map(cat => (
        <button
          key={cat}
          className={`filter-btn ${activeCategory === cat ? "active" : ""}`}
          onClick={() => onSelect(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}