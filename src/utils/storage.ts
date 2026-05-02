import type { UserPlant, Reminder, AppState } from '@/types';

const STORAGE_KEY = 'plant-care-assistant-data';

// 默认状态
const defaultState: AppState = {
  userPlants: [],
  reminders: [],
  weather: null,
  selectedCity: '北京',
  isFirstVisit: true
};

// 获取存储的数据
export const getStoredData = (): AppState => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return { ...defaultState, ...JSON.parse(data) };
    }
  } catch (error) {
    console.error('Error reading from localStorage:', error);
  }
  return defaultState;
};

// 保存数据到本地存储
export const saveData = (data: Partial<AppState>): void => {
  try {
    const currentData = getStoredData();
    const newData = { ...currentData, ...data };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

// 用户植物操作
export const addUserPlant = (userPlant: UserPlant): void => {
  const data = getStoredData();
  data.userPlants.push(userPlant);
  saveData({ userPlants: data.userPlants });
};

export const updateUserPlant = (plantId: string, updates: Partial<UserPlant>): void => {
  const data = getStoredData();
  const index = data.userPlants.findIndex(p => p.id === plantId);
  if (index !== -1) {
    data.userPlants[index] = { ...data.userPlants[index], ...updates };
    saveData({ userPlants: data.userPlants });
  }
};

export const removeUserPlant = (plantId: string): void => {
  const data = getStoredData();
  data.userPlants = data.userPlants.filter(p => p.id !== plantId);
  saveData({ userPlants: data.userPlants });
};

// 提醒操作
export const addReminder = (reminder: Reminder): void => {
  const data = getStoredData();
  data.reminders.push(reminder);
  saveData({ reminders: data.reminders });
};

export const updateReminder = (reminderId: string, updates: Partial<Reminder>): void => {
  const data = getStoredData();
  const index = data.reminders.findIndex(r => r.id === reminderId);
  if (index !== -1) {
    data.reminders[index] = { ...data.reminders[index], ...updates };
    saveData({ reminders: data.reminders });
  }
};

export const removeReminder = (reminderId: string): void => {
  const data = getStoredData();
  data.reminders = data.reminders.filter(r => r.id !== reminderId);
  saveData({ reminders: data.reminders });
};

// 城市设置
export const setSelectedCity = (city: string): void => {
  saveData({ selectedCity: city });
};

export const getSelectedCity = (): string => {
  return getStoredData().selectedCity;
};

// 首次访问标记
export const markAsVisited = (): void => {
  saveData({ isFirstVisit: false });
};

export const isFirstVisit = (): boolean => {
  return getStoredData().isFirstVisit;
};

// 生成唯一ID
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// 格式化日期
export const formatDate = (dateStr: string | null): string => {
  if (!dateStr) return '从未';
  const date = new Date(dateStr);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return '今天';
  if (diffDays === 1) return '昨天';
  if (diffDays < 7) return `${diffDays}天前`;
  return date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' });
};

// 计算下次浇水时间
export const getNextWateringDate = (userPlant: UserPlant): Date | null => {
  if (!userPlant.lastWatered) return new Date();

  const lastWatered = new Date(userPlant.lastWatered);
  const nextWatering = new Date(lastWatered);
  nextWatering.setDate(lastWatered.getDate() + userPlant.wateringInterval);

  return nextWatering;
};

// 检查是否需要浇水
export const needsWatering = (userPlant: UserPlant): boolean => {
  if (!userPlant.lastWatered) return true;

  const nextWatering = getNextWateringDate(userPlant);
  const now = new Date();

  return now >= nextWatering!;
};

// 获取浇水状态
export const getWateringStatus = (userPlant: UserPlant): { status: 'urgent' | 'soon' | 'ok'; daysLeft: number } => {
  const nextWatering = getNextWateringDate(userPlant);
  if (!nextWatering) return { status: 'urgent', daysLeft: 0 };

  const now = new Date();
  const diffTime = nextWatering.getTime() - now.getTime();
  const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (daysLeft <= 0) return { status: 'urgent', daysLeft: 0 };
  if (daysLeft <= 2) return { status: 'soon', daysLeft };
  return { status: 'ok', daysLeft };
};
