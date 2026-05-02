import { useState, useEffect } from 'react';
import { MapPin, Droplets, Wind, ChevronDown, AlertTriangle } from 'lucide-react';
import type { WeatherData } from '@/types';
import { getWeatherData, getWeatherAdvice, cities } from '@/data/weather';
import { getSelectedCity, setSelectedCity } from '@/utils/storage';

interface WeatherCardProps {
  compact?: boolean;
}

export function WeatherCard({ compact = false }: WeatherCardProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showCitySelector, setShowCitySelector] = useState(false);
  const [showForecast, setShowForecast] = useState(false);

  useEffect(() => {
    loadWeather();
  }, []);

  const loadWeather = async () => {
    const city = getSelectedCity();
    try {
      const data = await getWeatherData(city);
      setWeather(data);
    } catch (error) {
      console.error('Failed to load weather:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    setShowCitySelector(false);
    setLoading(true);
    setTimeout(() => {
      getWeatherData(city).then(data => {
        setWeather(data);
        setLoading(false);
      });
    }, 300);
  };

  if (loading) {
    return (
      <div style={{
        background: 'linear-gradient(135deg, #4CAF50 0%, #81C784 100%)',
        borderRadius: '16px',
        padding: '20px',
        color: '#fff',
        minHeight: compact ? '100px' : '180px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ fontSize: '14px', opacity: 0.9 }}>加载中...</div>
      </div>
    );
  }

  if (!weather) return null;

  const advice = getWeatherAdvice(weather);

  if (compact) {
    return (
      <div
        onClick={() => setShowForecast(!showForecast)}
        style={{
          background: 'linear-gradient(135deg, #4CAF50 0%, #81C784 100%)',
          borderRadius: '16px',
          padding: '16px 20px',
          color: '#fff',
          cursor: 'pointer'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div
              onClick={(e) => {
                e.stopPropagation();
                setShowCitySelector(!showCitySelector);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '14px',
                opacity: 0.9,
                cursor: 'pointer'
              }}
            >
              <MapPin size={14} />
              {weather.city}
              <ChevronDown size={14} />
            </div>
            <div style={{ fontSize: '32px', fontWeight: 300, marginTop: '4px' }}>
              {weather.temperature}°
            </div>
            <div style={{ fontSize: '13px', opacity: 0.9 }}>{weather.weather}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '48px', lineHeight: 1 }}>
              {weather.weatherCode === 'sunny' ? '☀️' :
               weather.weatherCode === 'cloudy' ? '☁️' :
               weather.weatherCode === 'rain' ? '🌧️' : '🌤️'}
            </div>
            <div style={{ fontSize: '12px', opacity: 0.8, marginTop: '8px' }}>
              <Droplets size={12} style={{ display: 'inline', marginRight: '4px' }} />
              {weather.humidity}%
            </div>
          </div>
        </div>

        {weather.alerts.length > 0 && (
          <div style={{
            marginTop: '12px',
            padding: '10px 12px',
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '13px'
          }}>
            <AlertTriangle size={16} />
            <span>{weather.alerts[0].title}</span>
          </div>
        )}

        {showForecast && (
          <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.2)' }}>
            <div style={{ fontSize: '13px', marginBottom: '12px', opacity: 0.9 }}>未来7天</div>
            <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '8px' }}>
              {weather.forecast.map((day, index) => (
                <div key={index} style={{ textAlign: 'center', minWidth: '50px' }}>
                  <div style={{ fontSize: '12px', opacity: 0.8 }}>{day.date}</div>
                  <div style={{ fontSize: '20px', margin: '4px 0' }}>
                    {day.dayWeather === '晴' ? '☀️' :
                     day.dayWeather === '多云' ? '☁️' :
                     day.dayWeather.includes('雨') ? '🌧️' : '🌤️'}
                  </div>
                  <div style={{ fontSize: '12px' }}>{day.highTemp}°</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {showCitySelector && (
          <div
            style={{
              position: 'absolute',
              top: '50px',
              left: '20px',
              right: '20px',
              background: '#fff',
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
              zIndex: 100,
              maxHeight: '200px',
              overflow: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {cities.map(city => (
              <div
                key={city}
                onClick={() => handleCityChange(city)}
                style={{
                  padding: '12px 16px',
                  color: '#333',
                  fontSize: '14px',
                  cursor: 'pointer',
                  borderBottom: '1px solid #f0f0f0',
                  background: city === weather.city ? '#E8F5E9' : '#fff'
                }}
              >
                {city}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{
      background: 'linear-gradient(135deg, #4CAF50 0%, #81C784 100%)',
      borderRadius: '20px',
      padding: '24px',
      color: '#fff'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div
            onClick={() => setShowCitySelector(!showCitySelector)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '16px',
              opacity: 0.9,
              cursor: 'pointer'
            }}
          >
            <MapPin size={18} />
            {weather.city}
            <ChevronDown size={16} />
          </div>
          <div style={{ fontSize: '56px', fontWeight: 300, marginTop: '8px' }}>
            {weather.temperature}°
          </div>
          <div style={{ fontSize: '16px', opacity: 0.9 }}>{weather.weather}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '72px', lineHeight: 1 }}>
            {weather.weatherCode === 'sunny' ? '☀️' :
             weather.weatherCode === 'cloudy' ? '☁️' :
             weather.weatherCode === 'rain' ? '🌧️' : '🌤️'}
          </div>
        </div>
      </div>

      <div style={{
        display: 'flex',
        gap: '24px',
        marginTop: '24px',
        paddingTop: '20px',
        borderTop: '1px solid rgba(255,255,255,0.2)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Droplets size={18} opacity={0.8} />
          <span style={{ fontSize: '14px' }}>湿度 {weather.humidity}%</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Wind size={18} opacity={0.8} />
          <span style={{ fontSize: '14px' }}>{weather.windDirection} {weather.windLevel}级</span>
        </div>
      </div>

      {weather.alerts.length > 0 && (
        <div style={{ marginTop: '16px' }}>
          {weather.alerts.map(alert => (
            <div
              key={alert.id}
              style={{
                padding: '12px 16px',
                background: alert.level === 'red' ? 'rgba(244,67,54,0.3)' :
                           alert.level === 'orange' ? 'rgba(255,152,0,0.3)' :
                           'rgba(255,235,59,0.3)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '14px',
                marginBottom: '8px'
              }}
            >
              <AlertTriangle size={18} />
              <span>{alert.title}</span>
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: '20px' }}>
        <div style={{ fontSize: '14px', fontWeight: 500, marginBottom: '10px' }}>
          养护建议
        </div>
        {advice.map((item, index) => (
          <div
            key={index}
            style={{
              padding: '10px 14px',
              background: 'rgba(255,255,255,0.15)',
              borderRadius: '10px',
              fontSize: '13px',
              marginBottom: '8px',
              lineHeight: 1.5
            }}
          >
            {item}
          </div>
        ))}
      </div>

      {showCitySelector && (
        <div
          style={{
            position: 'absolute',
            top: '60px',
            left: '24px',
            right: '24px',
            background: '#fff',
            borderRadius: '16px',
            boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
            zIndex: 100,
            maxHeight: '300px',
            overflow: 'auto'
          }}
        >
          {cities.map(city => (
            <div
              key={city}
              onClick={() => handleCityChange(city)}
              style={{
                padding: '16px 20px',
                color: '#333',
                fontSize: '15px',
                cursor: 'pointer',
                borderBottom: '1px solid #f0f0f0',
                background: city === weather.city ? '#E8F5E9' : '#fff'
              }}
            >
              {city}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
