import { useState, useEffect } from 'react';
import { Bell, ChevronRight, Info, Trash2, Check } from 'lucide-react';
import { ReminderList } from '@/components/ReminderList';
import type { Reminder } from '@/types';
import { getStoredData, updateReminder, setSelectedCity, getSelectedCity } from '@/utils/storage';
import { cities } from '@/data/weather';

export function ProfilePage() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [notifications, setNotifications] = useState(true);
  const [showCitySelector, setShowCitySelector] = useState(false);
  const [selectedCity, setCity] = useState(getSelectedCity());
  const [activeSection, setActiveSection] = useState<'main' | 'reminders' | 'about'>('main');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const data = getStoredData();
    setReminders(data.reminders);
  };

  const handleCompleteReminder = (id: string) => {
    updateReminder(id, { status: 'completed' });
    loadData();
  };

  const handleDismissReminder = (id: string) => {
    updateReminder(id, { status: 'skipped' });
    loadData();
  };

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    setCity(city);
    setShowCitySelector(false);
  };

  const clearAllData = () => {
    if (confirm('确定要清除所有数据吗？此操作不可恢复。')) {
      localStorage.removeItem('plant-care-assistant-data');
      window.location.reload();
    }
  };

  if (activeSection === 'reminders') {
    return (
      <div style={{ padding: '16px', paddingBottom: '100px' }}>
        <button
          onClick={() => setActiveSection('main')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            marginBottom: '20px',
            padding: '8px 12px',
            borderRadius: '10px',
            border: 'none',
            background: '#f5f5f5',
            fontSize: '14px',
            color: '#666',
            cursor: 'pointer'
          }}
        >
          <ChevronRight size={16} style={{ transform: 'rotate(180deg)' }} />
          返回
        </button>

        <h1 style={{ margin: '0 0 20px 0', fontSize: '24px', fontWeight: 700, color: '#333' }}>
          提醒管理
        </h1>

        <ReminderList
          reminders={reminders}
          onComplete={handleCompleteReminder}
          onDismiss={handleDismissReminder}
        />
      </div>
    );
  }

  if (activeSection === 'about') {
    return (
      <div style={{ padding: '16px', paddingBottom: '100px' }}>
        <button
          onClick={() => setActiveSection('main')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            marginBottom: '20px',
            padding: '8px 12px',
            borderRadius: '10px',
            border: 'none',
            background: '#f5f5f5',
            fontSize: '14px',
            color: '#666',
            cursor: 'pointer'
          }}
        >
          <ChevronRight size={16} style={{ transform: 'rotate(180deg)' }} />
          返回
        </button>

        <div style={{ textAlign: 'center', padding: '40px 20px' }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, #4CAF50 0%, #81C784 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            fontSize: '40px'
          }}>
            🌱
          </div>
          <h1 style={{ margin: '0 0 8px 0', fontSize: '22px', fontWeight: 700 }}>
            养花助手
          </h1>
          <p style={{ margin: '0 0 24px 0', fontSize: '14px', color: '#888' }}>
            版本 1.0.0
          </p>

          <div style={{
            padding: '20px',
            background: '#f9f9f9',
            borderRadius: '16px',
            textAlign: 'left'
          }}>
            <p style={{ margin: '0 0 16px 0', fontSize: '14px', color: '#555', lineHeight: 1.7 }}>
              养花助手是一款智能植物养护应用，通过整合植物养护知识库与实时天气数据，为您提供个性化的植物养护建议和自动化提醒服务。
            </p>
            <p style={{ margin: 0, fontSize: '14px', color: '#555', lineHeight: 1.7 }}>
              我们的目标是让每一位植物爱好者都能轻松养好花，享受绿色生活带来的美好。
            </p>
          </div>

          <div style={{ marginTop: '24px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px',
              background: '#fff',
              borderRadius: '12px',
              marginBottom: '12px'
            }}>
              <span style={{ fontSize: '15px' }}>功能特点</span>
              <span style={{ fontSize: '13px', color: '#888' }}>50+ 种植物知识</span>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px',
              background: '#fff',
              borderRadius: '12px',
              marginBottom: '12px'
            }}>
              <span style={{ fontSize: '15px' }}>天气集成</span>
              <span style={{ fontSize: '13px', color: '#888' }}>智能提醒</span>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px',
              background: '#fff',
              borderRadius: '12px'
            }}>
              <span style={{ fontSize: '15px' }}>开发者</span>
              <span style={{ fontSize: '13px', color: '#888' }}>Plant Care Team</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '16px', paddingBottom: '100px' }}>
      {/* 头部 */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ margin: '0 0 4px 0', fontSize: '24px', fontWeight: 700, color: '#333' }}>
          我的
        </h1>
        <p style={{ margin: 0, fontSize: '14px', color: '#888' }}>
          管理您的偏好设置
        </p>
      </div>

      {/* 用户头像区域 */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        padding: '20px',
        background: 'linear-gradient(135deg, #4CAF50 0%, #81C784 100%)',
        borderRadius: '16px',
        marginBottom: '24px',
        color: '#fff'
      }}>
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '32px',
          background: 'rgba(255,255,255,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '32px'
        }}>
          🌿
        </div>
        <div>
          <div style={{ fontSize: '18px', fontWeight: 600 }}>植物爱好者</div>
          <div style={{ fontSize: '13px', opacity: 0.9, marginTop: '4px' }}>
            已养护 {reminders.filter(r => r.status === 'completed').length} 天
          </div>
        </div>
      </div>

      {/* 设置列表 */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{
          margin: '0 0 12px 0',
          fontSize: '14px',
          fontWeight: 600,
          color: '#888',
          paddingLeft: '8px'
        }}>
          通用设置
        </h2>

        {/* 城市选择 */}
        <div style={{
          background: '#fff',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
        }}>
          <div
            onClick={() => setShowCitySelector(!showCitySelector)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px',
              cursor: 'pointer'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: '#E3F2FD',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#2196F3'
              }}>
                📍
              </div>
              <span style={{ fontSize: '15px' }}>所在城市</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#888' }}>
              <span style={{ fontSize: '14px' }}>{selectedCity}</span>
              <ChevronRight size={18} />
            </div>
          </div>

          {showCitySelector && (
            <div style={{
              maxHeight: '200px',
              overflow: 'auto',
              borderTop: '1px solid #f0f0f0'
            }}>
              {cities.map(city => (
                <div
                  key={city}
                  onClick={() => handleCityChange(city)}
                  style={{
                    padding: '14px 16px 14px 64px',
                    fontSize: '15px',
                    cursor: 'pointer',
                    background: city === selectedCity ? '#E8F5E9' : '#fff',
                    color: city === selectedCity ? '#4CAF50' : '#333',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  {city}
                  {city === selectedCity && <Check size={18} color="#4CAF50" />}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 提醒通知 */}
        <div style={{
          background: '#fff',
          borderRadius: '12px',
          marginTop: '12px',
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: '#FFF3E0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FF9800'
            }}>
              <Bell size={18} />
            </div>
            <span style={{ fontSize: '15px' }}>提醒通知</span>
          </div>
          <button
            onClick={() => setNotifications(!notifications)}
            style={{
              width: '48px',
              height: '28px',
              borderRadius: '14px',
              border: 'none',
              background: notifications ? '#4CAF50' : '#ccc',
              position: 'relative',
              cursor: 'pointer',
              transition: 'background 0.3s'
            }}
          >
            <div style={{
              width: '24px',
              height: '24px',
              borderRadius: '12px',
              background: '#fff',
              position: 'absolute',
              top: '2px',
              left: notifications ? '22px' : '2px',
              transition: 'left 0.3s',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }} />
          </button>
        </div>
      </div>

      {/* 功能入口 */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{
          margin: '0 0 12px 0',
          fontSize: '14px',
          fontWeight: 600,
          color: '#888',
          paddingLeft: '8px'
        }}>
          功能
        </h2>

        <div style={{
          background: '#fff',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
        }}>
          <div
            onClick={() => setActiveSection('reminders')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px',
              cursor: 'pointer',
              borderBottom: '1px solid #f5f5f5'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: '#E8F5E9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#4CAF50'
              }}>
                <Bell size={18} />
              </div>
              <div>
                <div style={{ fontSize: '15px' }}>提醒管理</div>
                <div style={{ fontSize: '12px', color: '#888', marginTop: '2px' }}>
                  {reminders.filter(r => r.status === 'pending').length} 个待办
                </div>
              </div>
            </div>
            <ChevronRight size={18} color="#ccc" />
          </div>

          <div
            onClick={() => setActiveSection('about')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px',
              cursor: 'pointer'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: '#F3E5F5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#9C27B0'
              }}>
                <Info size={18} />
              </div>
              <span style={{ fontSize: '15px' }}>关于我们</span>
            </div>
            <ChevronRight size={18} color="#ccc" />
          </div>
        </div>
      </div>

      {/* 数据管理 */}
      <div>
        <h2 style={{
          margin: '0 0 12px 0',
          fontSize: '14px',
          fontWeight: 600,
          color: '#888',
          paddingLeft: '8px'
        }}>
          数据
        </h2>

        <button
          onClick={clearAllData}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '16px',
            background: '#fff',
            borderRadius: '12px',
            border: 'none',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            cursor: 'pointer',
            color: '#FF5722'
          }}
        >
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: '#FBE9E7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Trash2 size={18} />
          </div>
          <span style={{ fontSize: '15px' }}>清除所有数据</span>
        </button>
      </div>
    </div>
  );
}
