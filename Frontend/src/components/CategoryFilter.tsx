interface CategoryFilterProps {
  categories: string[]
  selectedCategory: string
  onSelectCategory: (category: string) => void
}

function CategoryFilter({ categories, selectedCategory, onSelectCategory }: CategoryFilterProps) {
  return (
    <div className="accordion mb-3" id="categoryAccordion">
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingOne">
          <button
            className="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseCategories"
            aria-expanded="true"
            aria-controls="collapseCategories"
          >
            Filter by Category
          </button>
        </h2>
        <div
          id="collapseCategories"
          className="accordion-collapse collapse show"
          aria-labelledby="headingOne"
        >
          <div className="accordion-body">
            <div className="d-grid gap-2">
              <button
                className={`btn ${selectedCategory === 'All' ? 'btn-dark' : 'btn-outline-dark'}`}
                onClick={() => onSelectCategory('All')}
              >
                All
              </button>

              {categories.map((category) => (
                <button
                  key={category}
                  className={`btn ${selectedCategory === category ? 'btn-dark' : 'btn-outline-dark'}`}
                  onClick={() => onSelectCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryFilter
