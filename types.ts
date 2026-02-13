
export enum Difficulty {
  EASY = "سهل",
  MEDIUM = "متوسط",
  HARD = "صعب"
}

export enum DishType {
  MAIN = "طبخة",
  DESSERT = "حلويات",
  APPETIZER = "مقبلات",
  SOUP = "شوربات"
}

export interface Ingredient {
  id: string;
  name: string;
  icon: string;
  category: string;
}

export interface Recipe {
  recipeName: string;
  duration: string;
  difficulty: Difficulty;
  youtubeSearchQuery: string;
  briefDescription: string;
  mainIngredients: string[];
}

export interface IngredientCategory {
  id: string;
  title: string;
  icon: string;
  ingredients: string[];
}
