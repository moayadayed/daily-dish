
import React from 'react';
import { Recipe, Difficulty } from '../types';

interface Props {
  recipe: Recipe;
}

const RecipeCard: React.FC<Props> = ({ recipe }) => {
  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case Difficulty.EASY: return 'bg-green-100 text-green-700';
      case Difficulty.MEDIUM: return 'bg-yellow-100 text-yellow-700';
      case Difficulty.HARD: return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const youtubeUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(recipe.youtubeSearchQuery)}`;

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 flex flex-col h-full hover:shadow-xl transition-shadow duration-300">
      <div className="h-48 bg-orange-50 flex items-center justify-center p-6 relative">
        <div className="absolute top-4 right-4">
           <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${getDifficultyColor(recipe.difficulty)}`}>
            {recipe.difficulty}
          </span>
        </div>
        <img 
          src={`https://picsum.photos/seed/${recipe.recipeName}/400/300`} 
          alt={recipe.recipeName}
          className="w-full h-full object-cover rounded-2xl shadow-inner"
        />
      </div>
      
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-900 leading-tight">{recipe.recipeName}</h3>
          <span className="text-sm font-medium text-gray-500 flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {recipe.duration}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 flex-grow">{recipe.briefDescription}</p>
        
        <div className="mb-4">
          <p className="text-xs font-bold text-gray-400 mb-2 uppercase">المكونات المستخدمة:</p>
          <div className="flex flex-wrap gap-1">
            {recipe.mainIngredients.map((ing, i) => (
              <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                {ing}
              </span>
            ))}
          </div>
        </div>

        <a 
          href={youtubeUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="block w-full text-center bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
          </svg>
          مشاهدة الطريقة على يوتيوب
        </a>
      </div>
    </div>
  );
};

export default RecipeCard;
