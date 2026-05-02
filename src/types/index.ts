// 养护指南
export interface CareGuide {
  light: string;
  temperature: string;
  humidity: string;
  wateringFrequency: number; // 天数
  wateringAmount: string;
  fertilizingFrequency: number; // 天数
  fertilizingType: string;
  soilType: string;
  pruning: string;
}

// 常见问题
export interface CommonIssue {
  symptom: string;
  cause: string;
  solution: string;
}

// 植物定义
export interface Plant {
  id: string;
  name: string;
  alias: string;
  category: 'foliage' | 'flowering' | 'succulent' | 'herb' | 'hydroponic' | 'air-purifying';
  categoryName: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  origin: string;
  description: string;
  imageUrl: string;
  careGuide: CareGuide;
  commonIssues: CommonIssue[];
  tips: string[];
}

// 用户植物
export interface UserPlant {
  id: string;
  plantId: string;
  nickname: string;
  location: string;
  acquiredDate: string;
  wateringInterval: number;
  lastWatered: string | null;
  lastFertilized: string | null;
  status: 'healthy' | 'attention' | 'abnormal';
  notes: string;
  plant: Plant;
}

// 提醒类型
export type ReminderType = 'water' | 'fertilize' | 'warning';

// 提醒
export interface Reminder {
  id: string;
  userPlantId: string;
  type: ReminderType;
  title: string;
  message: string;
  scheduledTime: string;
  status: 'pending' | 'completed' | 'skipped';
  createdAt: string;
  userPlant?: UserPlant;
}

// 天气数据
export interface WeatherData {
  city: string;
  temperature: number;
  humidity: number;
  weather: string;
  weatherCode: string;
  windLevel: number;
  windDirection: string;
  forecast: WeatherForecast[];
  alerts: WeatherAlert[];
}

// 天气预报
export interface WeatherForecast {
  date: string;
  dayWeather: string;
  nightWeather: string;
  highTemp: number;
  lowTemp: number;
  humidity: number;
  windLevel: number;
  precipitation: number;
}

// 天气预警
export interface WeatherAlert {
  id: string;
  type: 'wind' | 'rain' | 'heat' | 'cold' | 'drought';
  level: 'blue' | 'yellow' | 'orange' | 'red';
  title: string;
  content: string;
  publishTime: string;
}

// 应用状态
export interface AppState {
  userPlants: UserPlant[];
  reminders: Reminder[];
  weather: WeatherData | null;
  selectedCity: string;
  isFirstVisit: boolean;
}

// 分类信息
export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
}
