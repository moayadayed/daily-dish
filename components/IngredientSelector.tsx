
import React from 'react';
import { CATEGORIES, DISH_TYPE_CATEGORIES } from '../constants';
import { DishType } from '../types';

interface Props {
  selected: string[];
  toggleIngredient: (name: string) => void;
  dishType: DishType;
}

const IngredientSelector: React.FC<Props> = ({ selected, toggleIngredient, dishType }) => {
  const activeCategoryIds = DISH_TYPE_CATEGORIES[dishType];
  const filteredCategories = CATEGORIES.filter(cat => activeCategoryIds.includes(cat.id));

  return (
    <div className="space-y-8 animate-fade-in">
      {filteredCategories.map((cat) => (
        <div key={cat.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold mb-4 text-gray-800 border-r-4 border-orange-500 pr-3">
            {cat.title}
          </h3>
          <div className="flex flex-wrap gap-3">
            {cat.ingredients.map((ing) => {
              const isSelected = selected.includes(ing);
              return (
                <button
                  key={ing}
                  onClick={() => toggleIngredient(ing)}
                  className={`px-4 py-2 rounded-full border-2 transition-all duration-200 text-sm font-medium ${
                    isSelected
                      ? 'bg-orange-500 border-orange-500 text-white shadow-md transform scale-105'
                      : 'bg-white border-gray-200 text-gray-600 hover:border-orange-200 hover:bg-orange-50'
                  }`}
                >
                  {ing}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default IngredientSelector;
