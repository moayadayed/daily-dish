
import { IngredientCategory, DishType } from './types';

export const CATEGORIES: IngredientCategory[] = [
  {
    id: 'veggies',
    title: '🥦 خضار وفواكه',
    icon: 'VegetableIcon',
    ingredients: [
      'طماطم', 'بصل', 'ثوم', 'بطاطس', 'جزر', 'فلفل أخضر', 'باذنجان', 'كوسا', 'خيار', 'خس', 'بروكلي', 'فطر', 'سبانخ', 'بقدونس', 'نعناع', 'ليمون', 'تفاح', 'موز', 'برتقال', 'فراولة'
    ]
  },
  {
    id: 'meat',
    title: '🍗 لحوم ودواجن',
    icon: 'MeatIcon',
    ingredients: [
      'دجاج كامل', 'صدور دجاج', 'أفخاذ دجاج', 'لحم غنم', 'لحم بقر', 'لحم مفروم', 'سجق', 'مرتديلا'
    ]
  },
  {
    id: 'fish',
    title: '🐟 أسماك',
    icon: 'FishIcon',
    ingredients: [
      'سمك سلمون', 'سمك تونة', 'روبيان', 'سمك قاروص', 'سمك فيليه'
    ]
  },
  {
    id: 'staples',
    title: '🥫 مواد أساسية',
    icon: 'StapleIcon',
    ingredients: [
      'أرز', 'معكرونة', 'طحين', 'عدس', 'حمص', 'فول', 'برغل', 'سميد', 'زيت زيتون', 'زيت نباتي', 'سمن', 'صلصة طماطم', 'سكر', 'ملح', 'خميرة', 'بيكنج باودر'
    ]
  },
  {
    id: 'dairy',
    title: '🧀 ألبان ومشتقات',
    icon: 'DairyIcon',
    ingredients: [
      'حليب', 'لبن (زبادي)', 'بيض', 'جبنة شيدر', 'جبنة موزاريلا', 'لبنة', 'قشطة', 'زبدة', 'كريمة طبخ', 'جبنة كريمية'
    ]
  },
  {
    id: 'spices',
    title: '🌶️ بهارات ومكسرات',
    icon: 'SpiceIcon',
    ingredients: [
      'فلفل أسود', 'كمون', 'كركم', 'بابريكا', 'زعتر', 'قرفة', 'فانيليا', 'كاكاو', 'دبس رمان', 'خل', 'مايونيز', 'كاتشب', 'لوز', 'فستق', 'جوز هند', 'جوز'
    ]
  }
];

// Mapping which categories to show based on dish type
export const DISH_TYPE_CATEGORIES: Record<DishType, string[]> = {
  [DishType.MAIN]: ['veggies', 'meat', 'fish', 'staples', 'dairy', 'spices'],
  [DishType.DESSERT]: ['staples', 'dairy', 'spices', 'veggies'], // staples has flour/sugar, veggies has fruits
  [DishType.APPETIZER]: ['veggies', 'staples', 'dairy', 'spices'],
  [DishType.SOUP]: ['veggies', 'meat', 'staples', 'spices']
};

export const DISH_TYPES = [
  { id: DishType.MAIN, title: 'طبخة رئيسية', icon: '🥘', description: 'وجبات غداء دسمة ومشبعة' },
  { id: DishType.DESSERT, title: 'حلويات', icon: '🍰', description: 'أطباق حلوة للتحلية' },
  { id: DishType.APPETIZER, title: 'مقبلات', icon: '🥗', description: 'أطباق جانبية وخفيفة' },
  { id: DishType.SOUP, title: 'شوربات', icon: '🥣', description: 'شوربات دافئة ومغذية' }
];
