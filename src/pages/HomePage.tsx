import { useState, useEffect } from 'react';
import { Plus, ChevronRight, Droplets } from 'lucide-react';
import { WeatherCard } from '@/components/WeatherCard';
import { PlantCard } from '@/components/PlantCard';
import { ReminderList } from '@/components/ReminderList';
import type { UserPlant, Reminder } from '@/types';
import { getStoredData, updateUserPlant, generateId, addReminder } from '@/utils/storage';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const [userPlants, setUserPlants] = useState<UserPlant[]>([]);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const data = getStoredData();
    setUserPlants(data.userPlants);
    setReminders(data.reminders);
    setLoading(false);
  };

  const handleWaterPlant = (plantId: string) => {
    const now = new Date().toISOString();
    updateUserPlant(plantId, { lastWatered: now });

    // 添加浇水提醒
    const plant = userPlants.find(p => p.id === plantId);
    if (plant) {
      const reminder: Reminder = {
        id: generateId(),
        userPlantId: plantId,
        type: 'water',
        title: `给${plant.nickname || plant.plant.name}浇水`,
        message: '到了浇水的时间了，记得适量浇水哦',
        scheduledTime: new Date(Date.now() + plant.wateringInterval * 24 * 60 * 60 * 1000).toISOString(),
        status: 'pending',
        createdAt: now
      };
      addReminder(reminder);
    }

    loadData();
  };

  const handleCompleteReminder = (reminderId: string) => {
    const { updateReminder } = require('@/utils/storage');
    updateReminder(reminderId, { status: 'completed' });
    loadData();
  };

  const urgentPlants = userPlants.filter(p => {
    if (!p.lastWatered) return true;
    const lastWatered = new Date(p.lastWatered);
    const nextWatering = new Date(lastWatered);
    nextWatering.setDate(lastWatered.getDate() + p.wateringInterval);
    return new Date() >= nextWatering;
  });

  const todayTasks = reminders.filter(r => {
    const scheduled = new Date(r.scheduledTime);
    const today = new Date();
    return r.status === 'pending' &&
           scheduled.toDateString() === today.toDateString();
  });

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', color: '#999' }}>
        加载中...
      </div>
    );
  }

  return (
    <div style={{ padding: '16px', paddingBottom: '100px' }}>
      {/* 头部 */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '20px'
      }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 700, color: '#333' }}>
            养花助手
          </h1>
          <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#888' }}>
            让养花变得简单
          </p>
        </div>
        <button
          onClick={() => onNavigate('garden')}
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            border: 'none',
            background: '#4CAF50',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <Plus size={24} />
        </button>
      </div>

      {/* 天气卡片 */}
      <div style={{ marginBottom: '24px' }}>
        <WeatherCard compact />
      </div>

      {/* 今日任务 */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '16px'
        }}>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: '#333' }}>
            今日任务
            {todayTasks.length > 0 && (
              <span style={{
                marginLeft: '8px',
                padding: '2px 8px',
                background: '#FF5722',
                color: '#fff',
                borderRadius: '10px',
                fontSize: '12px'
              }}>
                {todayTasks.length}
              </span>
            )}
          </h2>
          <button
            onClick={() => onNavigate('profile')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '14px',
              color: '#4CAF50',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer'
            }}
          >
            查看全部
            <ChevronRight size={16} />
          </button>
        </div>

        {userPlants.length === 0 ? (
          <div
            onClick={() => onNavigate('garden')}
            style={{
              padding: '40px 20px',
              textAlign: 'center',
              background: '#f9f9f9',
              borderRadius: '16px',
              cursor: 'pointer',
              border: '2px dashed #ddd'
            }}
          >
            <Droplets size={48} style={{ color: '#4CAF50', marginBottom: '12px' }} />
            <div style={{ fontSize: '16px', color: '#333', fontWeight: 500 }}>
              还没有添加植物
            </div>
            <div style={{ fontSize: '14px', color: '#888', marginTop: '4px' }}>
              点击添加您的第一株植物
            </div>
          </div>
        ) : urgentPlants.length > 0 ? (
          <div>
            {urgentPlants.slice(0, 3).map(plant => (
              <PlantCard
                key={plant.id}
                userPlant={plant}
                onClick={() => onNavigate('garden')}
                onWater={() => handleWaterPlant(plant.id)}
                compact
              />
            ))}
          </div>
        ) : (
          <ReminderList
            reminders={reminders}
            onComplete={handleCompleteReminder}
            compact
          />
        )}
      </div>

      {/* 我的花园预览 */}
      {userPlants.length > 0 && (
        <div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px'
          }}>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: '#333' }}>
              我的花园
            </h2>
            <button
              onClick={() => onNavigate('garden')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '14px',
                color: '#4CAF50',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer'
              }}
            >
              查看全部
              <ChevronRight size={16} />
            </button>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '12px'
          }}>
            {userPlants.slice(0, 4).map(plant => (
              <PlantCard
                key={plant.id}
                userPlant={plant}
                onClick={() => onNavigate('garden')}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
