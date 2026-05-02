import { Droplets, Calendar, MapPin, ChevronRight } from 'lucide-react';
import type { UserPlant } from '@/types';
import { formatDate, getWateringStatus } from '@/utils/storage';

interface PlantCardProps {
  userPlant: UserPlant;
  onClick?: () => void;
  onWater?: () => void;
  compact?: boolean;
}

export function PlantCard({ userPlant, onClick, onWater, compact = false }: PlantCardProps) {
  const { status, daysLeft } = getWateringStatus(userPlant);

  const statusConfig = {
    urgent: { color: '#FF5722', bg: '#FFF3E0', text: '需浇水' },
    soon: { color: '#FFC107', bg: '#FFF8E1', text: `${daysLeft}天后` },
    ok: { color: '#4CAF50', bg: '#E8F5E9', text: `${daysLeft}天后` }
  };

  const config = statusConfig[status];

  if (compact) {
    return (
      <div
        onClick={onClick}
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '12px',
          background: '#fff',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          cursor: 'pointer',
          marginBottom: '8px'
        }}
      >
        <img
          src={userPlant.plant.imageUrl}
          alt={userPlant.plant.name}
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '8px',
            objectFit: 'cover',
            marginRight: '12px'
          }}
        />
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600, fontSize: '15px', color: '#333' }}>
            {userPlant.nickname || userPlant.plant.name}
          </div>
          <div style={{ fontSize: '12px', color: '#888', marginTop: '2px' }}>
            {userPlant.plant.name}
          </div>
          <div style={{ fontSize: '12px', color: '#666', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Droplets size={12} />
            上次浇水: {formatDate(userPlant.lastWatered)}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: '8px'
          }}
        >
          <span
            style={{
              padding: '4px 10px',
              borderRadius: '12px',
              fontSize: '12px',
              fontWeight: 500,
              background: config.bg,
              color: config.color
            }}
          >
            {config.text}
          </span>
          {status === 'urgent' && onWater && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onWater();
              }}
              style={{
                padding: '6px 14px',
                borderRadius: '16px',
                border: 'none',
                background: '#4CAF50',
                color: '#fff',
                fontSize: '12px',
                fontWeight: 500,
                cursor: 'pointer'
              }}
            >
              浇水
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      style={{
        background: '#fff',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.12)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)';
      }}
    >
      <div style={{ position: 'relative' }}>
        <img
          src={userPlant.plant.imageUrl}
          alt={userPlant.plant.name}
          style={{
            width: '100%',
            height: '160px',
            objectFit: 'cover'
          }}
        />
        <span
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            padding: '4px 10px',
            borderRadius: '12px',
            fontSize: '11px',
            fontWeight: 500,
            background: config.bg,
            color: config.color
          }}
        >
          {config.text}
        </span>
      </div>
      <div style={{ padding: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 600, color: '#333' }}>
            {userPlant.nickname || userPlant.plant.name}
          </h3>
          <ChevronRight size={18} color="#999" />
        </div>
        <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#888' }}>
          {userPlant.plant.name}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '12px', fontSize: '12px', color: '#666' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <MapPin size={12} />
            {userPlant.location || '室内'}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Calendar size={12} />
            {formatDate(userPlant.acquiredDate)}添加
          </span>
        </div>
        {status === 'urgent' && onWater && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onWater();
            }}
            style={{
              width: '100%',
              marginTop: '12px',
              padding: '10px',
              borderRadius: '10px',
              border: 'none',
              background: '#4CAF50',
              color: '#fff',
              fontSize: '14px',
              fontWeight: 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <Droplets size={16} />
            标记已浇水
          </button>
        )}
      </div>
    </div>
  );
}
