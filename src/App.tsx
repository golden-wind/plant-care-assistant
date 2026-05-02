import { useState, useEffect } from 'react';
import { BottomNav } from '@/components/BottomNav';
import { HomePage } from '@/pages/HomePage';
import { GardenPage } from '@/pages/GardenPage';
import { KnowledgePage } from '@/pages/KnowledgePage';
import { ProfilePage } from '@/pages/ProfilePage';
import { isFirstVisit, markAsVisited, getStoredData, addReminder, generateId } from '@/utils/storage';
import { getWeatherData } from '@/data/weather';
import type { Reminder } from '@/types';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    // 检查是否首次访问
    if (isFirstVisit()) {
      setShowWelcome(true);
      markAsVisited();
    }

    // 初始化提醒
    initializeReminders();
  }, []);

  const initializeReminders = async () => {
    const data = getStoredData();

    // 检查天气预警并生成提醒
    try {
      const weather = await getWeatherData(data.selectedCity);

      // 如果有预警，添加到提醒
      weather.alerts.forEach(alert => {
        const existingAlert = data.reminders.find(r =>
          r.type === 'warning' &&
          r.message.includes(alert.title) &&
          r.status === 'pending'
        );

        if (!existingAlert) {
          const reminder: Reminder = {
            id: generateId(),
            userPlantId: '',
            type: 'warning',
            title: alert.title,
            message: alert.content,
            scheduledTime: new Date().toISOString(),
            status: 'pending',
            createdAt: new Date().toISOString()
          };
          addReminder(reminder);
        }
      });
    } catch (error) {
      console.error('Failed to initialize reminders:', error);
    }
  };

  const renderPage = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage onNavigate={setActiveTab} />;
      case 'garden':
        return <GardenPage />;
      case 'knowledge':
        return <KnowledgePage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <HomePage onNavigate={setActiveTab} />;
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f8f9fa',
      paddingBottom: '80px'
    }}>
      {/* 欢迎弹窗 */}
      {showWelcome && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          zIndex: 2000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            maxWidth: '360px',
            width: '100%',
            background: '#fff',
            borderRadius: '24px',
            padding: '32px',
            textAlign: 'center'
          }}>
            <div style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #4CAF50 0%, #81C784 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
              fontSize: '50px'
            }}>
              🌱
            </div>
            <h2 style={{
              margin: '0 0 12px 0',
              fontSize: '24px',
              fontWeight: 700,
              color: '#333'
            }}>
              欢迎使用养花助手
            </h2>
            <p style={{
              margin: '0 0 24px 0',
              fontSize: '15px',
              color: '#666',
              lineHeight: 1.6
            }}>
              智能养花助手将帮助您：<br />
              🌿 管理您的植物<br />
              🌤️ 根据天气提醒养护<br />
              📚 获取专业养护知识
            </p>
            <button
              onClick={() => setShowWelcome(false)}
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: '12px',
                border: 'none',
                background: '#4CAF50',
                color: '#fff',
                fontSize: '16px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              开始使用
            </button>
          </div>
        </div>
      )}

      {/* 页面内容 */}
      <main>
        {renderPage()}
      </main>

      {/* 底部导航 */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

export default App;
