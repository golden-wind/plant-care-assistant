import type { WeatherData } from '@/types';

// 模拟天气数据
export const mockWeatherData: Record<string, WeatherData> = {
  '北京': {
    city: '北京',
    temperature: 22,
    humidity: 45,
    weather: '晴',
    weatherCode: 'sunny',
    windLevel: 3,
    windDirection: '北风',
    forecast: [
      { date: '今天', dayWeather: '晴', nightWeather: '晴', highTemp: 25, lowTemp: 12, humidity: 40, windLevel: 3, precipitation: 0 },
      { date: '明天', dayWeather: '多云', nightWeather: '多云', highTemp: 23, lowTemp: 14, humidity: 45, windLevel: 2, precipitation: 0 },
      { date: '后天', dayWeather: '小雨', nightWeather: '阴', highTemp: 20, lowTemp: 13, humidity: 70, windLevel: 3, precipitation: 10 },
      { date: '周四', dayWeather: '晴', nightWeather: '晴', highTemp: 24, lowTemp: 11, humidity: 35, windLevel: 4, precipitation: 0 },
      { date: '周五', dayWeather: '晴', nightWeather: '多云', highTemp: 26, lowTemp: 13, humidity: 40, windLevel: 3, precipitation: 0 },
      { date: '周六', dayWeather: '多云', nightWeather: '阴', highTemp: 22, lowTemp: 12, humidity: 50, windLevel: 2, precipitation: 0 },
      { date: '周日', dayWeather: '阴', nightWeather: '小雨', highTemp: 19, lowTemp: 11, humidity: 65, windLevel: 3, precipitation: 5 },
    ],
    alerts: []
  },
  '上海': {
    city: '上海',
    temperature: 24,
    humidity: 65,
    weather: '多云',
    weatherCode: 'cloudy',
    windLevel: 4,
    windDirection: '东南风',
    forecast: [
      { date: '今天', dayWeather: '多云', nightWeather: '多云', highTemp: 26, lowTemp: 18, humidity: 65, windLevel: 4, precipitation: 0 },
      { date: '明天', dayWeather: '小雨', nightWeather: '中雨', highTemp: 23, lowTemp: 17, humidity: 80, windLevel: 5, precipitation: 25 },
      { date: '后天', dayWeather: '中雨', nightWeather: '小雨', highTemp: 21, lowTemp: 16, humidity: 85, windLevel: 6, precipitation: 35 },
      { date: '周四', dayWeather: '多云', nightWeather: '多云', highTemp: 25, lowTemp: 17, humidity: 60, windLevel: 3, precipitation: 0 },
      { date: '周五', dayWeather: '晴', nightWeather: '晴', highTemp: 27, lowTemp: 18, humidity: 55, windLevel: 3, precipitation: 0 },
      { date: '周六', dayWeather: '多云', nightWeather: '多云', highTemp: 25, lowTemp: 17, humidity: 60, windLevel: 4, precipitation: 0 },
      { date: '周日', dayWeather: '小雨', nightWeather: '阴', highTemp: 22, lowTemp: 16, humidity: 70, windLevel: 4, precipitation: 10 },
    ],
    alerts: [
      {
        id: '1',
        type: 'wind',
        level: 'yellow',
        title: '大风黄色预警',
        content: '预计今天下午到夜间，本市将有6-7级大风，阵风可达8级，请注意将室外花盆移至室内或避风处。',
        publishTime: '2026-05-02 10:00'
      }
    ]
  },
  '广州': {
    city: '广州',
    temperature: 30,
    humidity: 75,
    weather: '晴',
    weatherCode: 'sunny',
    windLevel: 2,
    windDirection: '南风',
    forecast: [
      { date: '今天', dayWeather: '晴', nightWeather: '晴', highTemp: 32, lowTemp: 24, humidity: 70, windLevel: 2, precipitation: 0 },
      { date: '明天', dayWeather: '多云', nightWeather: '多云', highTemp: 31, lowTemp: 25, humidity: 75, windLevel: 2, precipitation: 0 },
      { date: '后天', dayWeather: '雷阵雨', nightWeather: '雷阵雨', highTemp: 29, lowTemp: 24, humidity: 85, windLevel: 4, precipitation: 40 },
      { date: '周四', dayWeather: '中雨', nightWeather: '小雨', highTemp: 28, lowTemp: 23, humidity: 80, windLevel: 3, precipitation: 30 },
      { date: '周五', dayWeather: '多云', nightWeather: '多云', highTemp: 30, lowTemp: 24, humidity: 70, windLevel: 2, precipitation: 0 },
      { date: '周六', dayWeather: '晴', nightWeather: '晴', highTemp: 33, lowTemp: 25, humidity: 65, windLevel: 2, precipitation: 0 },
      { date: '周日', dayWeather: '晴', nightWeather: '多云', highTemp: 34, lowTemp: 26, humidity: 60, windLevel: 2, precipitation: 0 },
    ],
    alerts: [
      {
        id: '2',
        type: 'heat',
        level: 'orange',
        title: '高温橙色预警',
        content: '预计未来三天最高气温将达35°C以上，请注意给植物遮阴，增加浇水频率，避免正午浇水。',
        publishTime: '2026-05-02 08:00'
      }
    ]
  },
  '深圳': {
    city: '深圳',
    temperature: 29,
    humidity: 70,
    weather: '多云',
    weatherCode: 'cloudy',
    windLevel: 3,
    windDirection: '东南风',
    forecast: [
      { date: '今天', dayWeather: '多云', nightWeather: '多云', highTemp: 30, lowTemp: 24, humidity: 70, windLevel: 3, precipitation: 0 },
      { date: '明天', dayWeather: '雷阵雨', nightWeather: '雷阵雨', highTemp: 28, lowTemp: 23, humidity: 80, windLevel: 4, precipitation: 35 },
      { date: '后天', dayWeather: '大雨', nightWeather: '中雨', highTemp: 26, lowTemp: 22, humidity: 85, windLevel: 5, precipitation: 50 },
      { date: '周四', dayWeather: '小雨', nightWeather: '多云', highTemp: 28, lowTemp: 23, humidity: 75, windLevel: 3, precipitation: 15 },
      { date: '周五', dayWeather: '多云', nightWeather: '晴', highTemp: 30, lowTemp: 24, humidity: 65, windLevel: 2, precipitation: 0 },
      { date: '周六', dayWeather: '晴', nightWeather: '晴', highTemp: 31, lowTemp: 25, humidity: 60, windLevel: 2, precipitation: 0 },
      { date: '周日', dayWeather: '晴', nightWeather: '多云', highTemp: 32, lowTemp: 25, humidity: 60, windLevel: 2, precipitation: 0 },
    ],
    alerts: [
      {
        id: '3',
        type: 'rain',
        level: 'yellow',
        title: '暴雨黄色预警',
        content: '预计明后两天将有大到暴雨，请注意将室外花盆移至避雨处，防止积水烂根。',
        publishTime: '2026-05-02 09:00'
      }
    ]
  },
  '杭州': {
    city: '杭州',
    temperature: 23,
    humidity: 60,
    weather: '阴',
    weatherCode: 'cloudy',
    windLevel: 3,
    windDirection: '东北风',
    forecast: [
      { date: '今天', dayWeather: '阴', nightWeather: '小雨', highTemp: 24, lowTemp: 16, humidity: 60, windLevel: 3, precipitation: 5 },
      { date: '明天', dayWeather: '小雨', nightWeather: '中雨', highTemp: 22, lowTemp: 15, humidity: 75, windLevel: 4, precipitation: 20 },
      { date: '后天', dayWeather: '中雨', nightWeather: '小雨', highTemp: 20, lowTemp: 14, humidity: 80, windLevel: 4, precipitation: 25 },
      { date: '周四', dayWeather: '多云', nightWeather: '多云', highTemp: 23, lowTemp: 13, humidity: 55, windLevel: 3, precipitation: 0 },
      { date: '周五', dayWeather: '晴', nightWeather: '晴', highTemp: 25, lowTemp: 14, humidity: 50, windLevel: 2, precipitation: 0 },
      { date: '周六', dayWeather: '晴', nightWeather: '多云', highTemp: 26, lowTemp: 15, humidity: 50, windLevel: 2, precipitation: 0 },
      { date: '周日', dayWeather: '多云', nightWeather: '阴', highTemp: 24, lowTemp: 15, humidity: 55, windLevel: 3, precipitation: 0 },
    ],
    alerts: []
  },
  '成都': {
    city: '成都',
    temperature: 21,
    humidity: 70,
    weather: '阴',
    weatherCode: 'cloudy',
    windLevel: 2,
    windDirection: '北风',
    forecast: [
      { date: '今天', dayWeather: '阴', nightWeather: '小雨', highTemp: 22, lowTemp: 15, humidity: 70, windLevel: 2, precipitation: 5 },
      { date: '明天', dayWeather: '小雨', nightWeather: '小雨', highTemp: 20, lowTemp: 14, humidity: 80, windLevel: 2, precipitation: 15 },
      { date: '后天', dayWeather: '多云', nightWeather: '多云', highTemp: 23, lowTemp: 15, humidity: 65, windLevel: 2, precipitation: 0 },
      { date: '周四', dayWeather: '晴', nightWeather: '晴', highTemp: 26, lowTemp: 16, humidity: 55, windLevel: 2, precipitation: 0 },
      { date: '周五', dayWeather: '晴', nightWeather: '多云', highTemp: 27, lowTemp: 17, humidity: 55, windLevel: 2, precipitation: 0 },
      { date: '周六', dayWeather: '多云', nightWeather: '阴', highTemp: 24, lowTemp: 16, humidity: 60, windLevel: 2, precipitation: 0 },
      { date: '周日', dayWeather: '小雨', nightWeather: '小雨', highTemp: 21, lowTemp: 15, humidity: 75, windLevel: 2, precipitation: 10 },
    ],
    alerts: []
  }
};

// 获取天气数据（模拟API）
export const getWeatherData = async (city: string): Promise<WeatherData> => {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 500));

  // 返回对应城市数据或默认数据
  return mockWeatherData[city] || {
    city: city,
    temperature: 22,
    humidity: 55,
    weather: '晴',
    weatherCode: 'sunny',
    windLevel: 3,
    windDirection: '微风',
    forecast: mockWeatherData['北京'].forecast,
    alerts: []
  };
};

// 天气图标映射
export const weatherIcons: Record<string, string> = {
  sunny: '☀️',
  cloudy: '☁️',
  overcast: '🌥️',
  'light-rain': '🌦️',
  rain: '🌧️',
  'heavy-rain': '⛈️',
  thunder: '⚡',
  snow: '❄️',
  fog: '🌫️'
};

// 获取天气建议
export const getWeatherAdvice = (weather: WeatherData): string[] => {
  const advice: string[] = [];

  // 温度建议
  if (weather.temperature >= 35) {
    advice.push('🌡️ 高温天气，请增加浇水频率，避免正午浇水');
  } else if (weather.temperature <= 5) {
    advice.push('❄️ 低温天气，畏寒植物请移至室内保暖');
  }

  // 湿度建议
  if (weather.humidity < 40) {
    advice.push('💨 空气干燥，喜湿植物可适当喷雾增湿');
  }

  // 风力建议
  if (weather.windLevel >= 6) {
    advice.push('💨 大风天气，建议将花盆移至室内或避风处');
  }

  // 预警建议
  weather.alerts.forEach(alert => {
    if (alert.type === 'rain') {
      advice.push('🌧️ ' + alert.content);
    } else if (alert.type === 'wind') {
      advice.push('💨 ' + alert.content);
    } else if (alert.type === 'heat') {
      advice.push('🌡️ ' + alert.content);
    } else if (alert.type === 'cold') {
      advice.push('❄️ ' + alert.content);
    }
  });

  // 降水建议
  const hasRain = weather.forecast.slice(0, 2).some(f => f.precipitation > 0);
  if (hasRain && !advice.some(a => a.includes('雨'))) {
    advice.push('🌧️ 近期有雨，可适当延后浇水');
  }

  return advice.length > 0 ? advice : ['🌱 天气适宜，按正常计划养护即可'];
};

// 城市列表
export const cities = ['北京', '上海', '广州', '深圳', '杭州', '成都', '南京', '武汉', '西安', '重庆'];
