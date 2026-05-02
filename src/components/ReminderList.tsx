import { Bell, Droplets, AlertTriangle, Check, X } from 'lucide-react';
import type { Reminder } from '@/types';

interface ReminderListProps {
  reminders: Reminder[];
  onComplete?: (id: string) => void;
  onDismiss?: (id: string) => void;
  compact?: boolean;
}

const typeConfig = {
  water: { icon: Droplets, color: '#2196F3', bg: '#E3F2FD', label: '浇水' },
  fertilize: { icon: Droplets, color: '#8BC34A', bg: '#F1F8E9', label: '施肥' },
  warning: { icon: AlertTriangle, color: '#FF5722', bg: '#FBE9E7', label: '提醒' }
};

export function ReminderList({ reminders, onComplete, onDismiss, compact = false }: ReminderListProps) {
  const pendingReminders = reminders.filter(r => r.status === 'pending');

  if (pendingReminders.length === 0) {
    return (
      <div style={{
        padding: compact ? '16px' : '32px',
        textAlign: 'center',
        color: '#999',
        background: '#f9f9f9',
        borderRadius: '12px'
      }}>
        <Bell size={compact ? 24 : 32} style={{ marginBottom: '8px', opacity: 0.5 }} />
        <div style={{ fontSize: compact ? '13px' : '14px' }}>暂无待办提醒</div>
      </div>
    );
  }

  if (compact) {
    return (
      <div>
        {pendingReminders.slice(0, 3).map(reminder => {
          const config = typeConfig[reminder.type];
          const Icon = config.icon;

          return (
            <div
              key={reminder.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px',
                background: '#fff',
                borderRadius: '12px',
                marginBottom: '8px',
                boxShadow: '0 1px 4px rgba(0,0,0,0.04)'
              }}
            >
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: config.bg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: config.color
              }}>
                <Icon size={20} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '14px', fontWeight: 500, color: '#333' }}>
                  {reminder.title}
                </div>
                <div style={{ fontSize: '12px', color: '#888', marginTop: '2px' }}>
                  {reminder.message}
                </div>
              </div>
              {onComplete && (
                <button
                  onClick={() => onComplete(reminder.id)}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    border: 'none',
                    background: '#4CAF50',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <Check size={18} />
                </button>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div>
      {pendingReminders.map(reminder => {
        const config = typeConfig[reminder.type];
        const Icon = config.icon;

        return (
          <div
            key={reminder.id}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '16px',
              padding: '16px',
              background: '#fff',
              borderRadius: '16px',
              marginBottom: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
            }}
          >
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: config.bg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: config.color,
              flexShrink: 0
            }}>
              <Icon size={24} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{
                  padding: '2px 8px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: 500,
                  background: config.bg,
                  color: config.color
                }}>
                  {config.label}
                </span>
                <span style={{ fontSize: '12px', color: '#999' }}>
                  {new Date(reminder.scheduledTime).toLocaleDateString('zh-CN')}
                </span>
              </div>
              <div style={{ fontSize: '16px', fontWeight: 600, color: '#333', marginTop: '6px' }}>
                {reminder.title}
              </div>
              <div style={{ fontSize: '14px', color: '#666', marginTop: '4px', lineHeight: 1.5 }}>
                {reminder.message}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              {onComplete && (
                <button
                  onClick={() => onComplete(reminder.id)}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    border: 'none',
                    background: '#4CAF50',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <Check size={20} />
                </button>
              )}
              {onDismiss && (
                <button
                  onClick={() => onDismiss(reminder.id)}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    border: 'none',
                    background: '#f5f5f5',
                    color: '#999',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <X size={20} />
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
