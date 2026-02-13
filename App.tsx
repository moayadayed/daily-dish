
import React, { useState } from 'react';
import { Recipe, DishType } from './types';
import { generateRecipes } from './services/geminiService';
import IngredientSelector from './components/IngredientSelector';
import RecipeCard from './components/RecipeCard';
import { DISH_TYPES } from './constants';

const App: React.FC = () => {
  const [dishType, setDishType] = useState<DishType | null>(null);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleIngredient = (name: string) => {
    setSelectedIngredients(prev => 
      prev.includes(name) 
        ? prev.filter(i => i !== name) 
        : [...prev, name]
    );
  };

  const handleFindRecipes = async () => {
    if (!dishType) return;
    if (selectedIngredients.length === 0) {
      setError("يرجى اختيار مكون واحد على الأقل لنتمكن من مساعدتك!");
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const results = await generateRecipes(selectedIngredients, dishType);
      setRecipes(results);
      setTimeout(() => {
        document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err: any) {
      setError(err.message || "حدث خطأ غير متوقع");
    } finally {
      setIsLoading(false);
    }
  };

  const resetSelection = () => {
    setDishType(null);
    setSelectedIngredients([]);
    setRecipes([]);
    setError(null);
  };

  const goBack = () => {
    setDishType(null);
    setSelectedIngredients([]);
    setRecipes([]);
    setError(null);
  };

  return (
    <div className="min-h-screen flex flex-col pb-20 md:pb-10">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-30 px-4 py-4 md:py-6 shadow-sm">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-orange-500 p-2 rounded-xl text-white shadow-lg shadow-orange-200 cursor-pointer" onClick={resetSelection}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-black text-gray-900 leading-none">شو نطبخ اليوم؟</h1>
              <p className="text-xs text-gray-500 hidden sm:block mt-1">مساعدك الذكي في المطبخ</p>
            </div>
          </div>
          {dishType && (
            <button 
              onClick={goBack}
              className="text-orange-500 hover:text-orange-600 text-sm font-bold flex items-center gap-1 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              تغيير النوع
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-5xl mx-auto w-full px-4 py-8">
        {!dishType ? (
          <section className="animate-fade-in py-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">أهلاً بك! ماذا تود أن نصنع اليوم؟</h2>
              <p className="text-gray-600">اختر التصنيف أولاً لنعرض لك المكونات المناسبة</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {DISH_TYPES.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setDishType(type.id)}
                  className="group bg-white p-8 rounded-3xl border-2 border-gray-100 hover:border-orange-500 hover:shadow-xl hover:shadow-orange-100 transition-all duration-300 text-right flex flex-col items-start gap-4 relative overflow-hidden"
                >
                  <div className="text-5xl group-hover:scale-110 transition-transform duration-300">{type.icon}</div>
                  <div>
                    <h3 className="text-2xl font-black text-gray-900 mb-1">{type.title}</h3>
                    <p className="text-gray-500">{type.description}</p>
                  </div>
                  <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-orange-500 p-2 rounded-full text-white">
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </section>
        ) : (
          <div className="animate-fade-in">
            <section className="mb-12 text-center">
              <div className="inline-flex items-center justify-center bg-orange-100 text-orange-600 px-4 py-1 rounded-full text-sm font-bold mb-4">
                قائمة الـ {dishType}
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                ماذا يوجد في مطبخك؟
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                اختر المكونات المتوفرة لديك حالياً، وسنقترح عليك أفضل الـ {dishType} التي يمكنك تحضيرها.
              </p>
            </section>

            <IngredientSelector 
              selected={selectedIngredients} 
              toggleIngredient={toggleIngredient} 
              dishType={dishType}
            />

            <div className="mt-12 flex flex-col items-center sticky bottom-8 z-20">
              <button
                onClick={handleFindRecipes}
                disabled={isLoading}
                className={`w-full max-w-md bg-orange-500 hover:bg-orange-600 text-white font-black py-4 px-8 rounded-2xl shadow-xl shadow-orange-200 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                    جاري البحث عن أفكار...
                  </>
                ) : (
                  <>
                    اقترح عليّ أطباق!
                    <span className="bg-orange-600 px-2 py-0.5 rounded-lg text-sm">{selectedIngredients.length}</span>
                  </>
                )}
              </button>
              
              {error && (
                <p className="mt-4 text-red-500 font-bold bg-red-50 px-4 py-2 rounded-lg border border-red-100">
                  {error}
                </p>
              )}
            </div>

            {/* Results Section */}
            {recipes.length > 0 && (
              <section id="results-section" className="mt-20 py-12 border-t border-gray-100">
                <h2 className="text-3xl font-black text-gray-900 mb-8 text-center">
                  اقتراحاتنا لك اليوم 👩‍🍳
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {recipes.map((recipe, index) => (
                    <RecipeCard key={index} recipe={recipe} />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t py-12 px-4 mt-auto">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <p className="text-gray-500 text-sm">
            تم التطوير بواسطة الذكاء الاصطناعي لمساعدتك في المطبخ
          </p>
          <div className="flex justify-center gap-6">
            <span className="text-2xl">🥘</span>
            <span className="text-2xl">🍰</span>
            <span className="text-2xl">🥗</span>
            <span className="text-2xl">🥣</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
