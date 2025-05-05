import React from "react";

const FilterPanel = (selectedCategory, selectCategory) => {
  return (
    <div>
      <div className="input-group">
        <p className="label">Category</p>
        <FilterListToggle
          options={categoryList}
          value={selectedCategory}
          selectToggle={selectCategory}
        />
      </div>
    </div>
  );
};

export default FilterPanel;
