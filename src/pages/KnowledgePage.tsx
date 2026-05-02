import { useState } from 'react';
import { Search, ChevronRight, Sun, Droplets, Thermometer, Wind, AlertCircle } from 'lucide-react';
import { plants, categories, searchPlants, getRecommendedPlants } from '@/data/plants';
import type { Plant } from '@/types';

export function KnowledgePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);

  const filteredPlants = searchQuery
    ? searchPlants(searchQuery)
    : selectedCategory
    ? plants.filter(p => p.category === selectedCategory)
    : getRecommendedPlants();

  const difficultyStars = (level: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <span key={i} style={{ color: i < level ? '#FFC107' : '#ddd', fontSize: '12px' }}>
        ★
      </span>
    ));
  };

  if (selectedPlant) {
    return (
      <div style={{ padding: '16px', paddingBottom: '100px' }}>
        {/* 返回按钮 */}
        <button
          onClick={() => setSelectedPlant(null)}
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
          返回列表
        </button>

        {/* 植物图片 */}
        <div style={{
          width: '100%',
          height: '240px',
          borderRadius: '16px',
          overflow: 'hidden',
          marginBottom: '20px'
        }}>
          <img
            src={selectedPlant.imageUrl}
            alt={selectedPlant.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </div>

        {/* 基本信息 */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <h1 style={{ margin: 0, fontSize: '26px', fontWeight: 700, color: '#333' }}>
              {selectedPlant.name}
            </h1>
            <span style={{
              padding: '4px 12px',
              borderRadius: '12px',
              fontSize: '12px',
              background: '#E8F5E9',
              color: '#4CAF50'
            }}>
              {selectedPlant.categoryName}
            </span>
          </div>
          <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#888' }}>
            别名：{selectedPlant.alias}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '13px', color: '#666' }}>养护难度：</span>
            {difficultyStars(selectedPlant.difficulty)}
          </div>
        </div>

        {/* 简介 */}
        <div style={{
          padding: '16px',
          background: '#f9f9f9',
          borderRadius: '12px',
          marginBottom: '24px'
        }}>
          <p style={{ margin: 0, fontSize: '14px', color: '#555', lineHeight: 1.7 }}>
            {selectedPlant.description}
          </p>
        </div>

        {/* 养护指南 */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: 600 }}>
            养护指南
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              padding: '16px',
              background: '#FFF8E1',
              borderRadius: '12px'
            }}>
              <Sun size={20} color="#FFC107" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <div style={{ fontSize: '14px', fontWeight: 500, marginBottom: '4px' }}>光照</div>
                <div style={{ fontSize: '13px', color: '#666' }}>{selectedPlant.careGuide.light}</div>
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              padding: '16px',
              background: '#E3F2FD',
              borderRadius: '12px'
            }}>
              <Droplets size={20} color="#2196F3" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <div style={{ fontSize: '14px', fontWeight: 500, marginBottom: '4px' }}>浇水</div>
                <div style={{ fontSize: '13px', color: '#666' }}>
                  每{selectedPlant.careGuide.wateringFrequency}天浇一次，{selectedPlant.careGuide.wateringAmount}
                </div>
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              padding: '16px',
              background: '#FCE4EC',
              borderRadius: '12px'
            }}>
              <Thermometer size={20} color="#E91E63" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <div style={{ fontSize: '14px', fontWeight: 500, marginBottom: '4px' }}>温度</div>
                <div style={{ fontSize: '13px', color: '#666' }}>{selectedPlant.careGuide.temperature}</div>
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              padding: '16px',
              background: '#E8F5E9',
              borderRadius: '12px'
            }}>
              <Wind size={20} color="#4CAF50" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <div style={{ fontSize: '14px', fontWeight: 500, marginBottom: '4px' }}>湿度</div>
                <div style={{ fontSize: '13px', color: '#666' }}>{selectedPlant.careGuide.humidity}</div>
              </div>
            </div>
          </div>
        </div>

        {/* 施肥信息 */}
        <div style={{
          padding: '16px',
          background: '#F3E5F5',
          borderRadius: '12px',
          marginBottom: '24px'
        }}>
          <div style={{ fontSize: '14px', fontWeight: 500, marginBottom: '8px', color: '#7B1FA2' }}>
            施肥建议
          </div>
          <div style={{ fontSize: '13px', color: '#666', lineHeight: 1.6 }}>
            每{selectedPlant.careGuide.fertilizingFrequency}天施一次肥，推荐使用{selectedPlant.careGuide.fertilizingType}。
            土壤要求：{selectedPlant.careGuide.soilType}
          </div>
        </div>

        {/* 常见问题 */}
        {selectedPlant.commonIssues.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: 600 }}>
              常见问题
            </h2>
            {selectedPlant.commonIssues.map((issue, index) => (
              <div
                key={index}
                style={{
                  padding: '16px',
                  background: '#fff',
                  borderRadius: '12px',
                  marginBottom: '12px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '8px'
                }}>
                  <AlertCircle size={16} color="#FF5722" />
                  <span style={{ fontSize: '14px', fontWeight: 500 }}>{issue.symptom}</span>
                </div>
                <div style={{ fontSize: '13px', color: '#666', marginBottom: '4px' }}>
                  <span style={{ color: '#999' }}>原因：</span>{issue.cause}
                </div>
                <div style={{ fontSize: '13px', color: '#4CAF50' }}>
                  <span style={{ color: '#999' }}>解决：</span>{issue.solution}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 养护小贴士 */}
        {selectedPlant.tips.length > 0 && (
          <div>
            <h2 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: 600 }}>
              养护小贴士
            </h2>
            <div style={{
              padding: '16px',
              background: '#E0F7FA',
              borderRadius: '12px'
            }}>
              {selectedPlant.tips.map((tip, index) => (
                <div
                  key={index}
                  style={{
                    fontSize: '14px',
                    color: '#006064',
                    lineHeight: 1.6,
                    marginBottom: index < selectedPlant.tips.length - 1 ? '8px' : 0
                  }}
                >
                  💡 {tip}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ padding: '16px', paddingBottom: '100px' }}>
      {/* 头部 */}
      <div style={{ marginBottom: '20px' }}>
        <h1 style={{ margin: '0 0 4px 0', fontSize: '24px', fontWeight: 700, color: '#333' }}>
          植物知识库
        </h1>
        <p style={{ margin: 0, fontSize: '14px', color: '#888' }}>
          收录常见家庭绿植养护知识
        </p>
      </div>

      {/* 搜索框 */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '12px 16px',
        background: '#f5f5f5',
        borderRadius: '12px',
        marginBottom: '20px'
      }}>
        <Search size={20} color="#999" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="搜索植物名称"
          style={{
            flex: 1,
            border: 'none',
            background: 'transparent',
            fontSize: '15px',
            outline: 'none'
          }}
        />
      </div>

      {/* 分类标签 */}
      {!searchQuery && (
        <div style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '8px',
          marginBottom: '20px'
        }}>
          <button
            onClick={() => setSelectedCategory(null)}
            style={{
              padding: '10px 18px',
              borderRadius: '20px',
              border: '1px solid',
              borderColor: selectedCategory === null ? '#4CAF50' : '#e0e0e0',
              background: selectedCategory === null ? '#E8F5E9' : '#fff',
              color: selectedCategory === null ? '#4CAF50' : '#666',
              fontSize: '14px',
              whiteSpace: 'nowrap',
              cursor: 'pointer'
            }}
          >
            推荐
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              style={{
                padding: '10px 18px',
                borderRadius: '20px',
                border: '1px solid',
                borderColor: selectedCategory === cat.id ? '#4CAF50' : '#e0e0e0',
                background: selectedCategory === cat.id ? '#E8F5E9' : '#fff',
                color: selectedCategory === cat.id ? '#4CAF50' : '#666',
                fontSize: '14px',
                whiteSpace: 'nowrap',
                cursor: 'pointer'
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>
      )}

      {/* 分类介绍 */}
      {!searchQuery && selectedCategory && (
        <div style={{
          padding: '16px',
          background: '#E8F5E9',
          borderRadius: '12px',
          marginBottom: '20px'
        }}>
          <div style={{ fontSize: '15px', fontWeight: 500, color: '#2E7D32', marginBottom: '4px' }}>
            {categories.find(c => c.id === selectedCategory)?.name}
          </div>
          <div style={{ fontSize: '13px', color: '#558B2F' }}>
            {categories.find(c => c.id === selectedCategory)?.description}
          </div>
        </div>
      )}

      {/* 植物列表 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '12px'
      }}>
        {filteredPlants.map(plant => (
          <div
            key={plant.id}
            onClick={() => setSelectedPlant(plant)}
            style={{
              background: '#fff',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              cursor: 'pointer'
            }}
          >
            <div style={{ position: 'relative' }}>
              <img
                src={plant.imageUrl}
                alt={plant.name}
                style={{
                  width: '100%',
                  height: '140px',
                  objectFit: 'cover'
                }}
              />
              <span style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                padding: '3px 8px',
                borderRadius: '10px',
                fontSize: '11px',
                background: 'rgba(255,255,255,0.9)',
                color: '#4CAF50'
              }}>
                {plant.categoryName}
              </span>
            </div>
            <div style={{ padding: '12px' }}>
              <h3 style={{
                margin: '0 0 4px 0',
                fontSize: '15px',
                fontWeight: 600,
                color: '#333'
              }}>
                {plant.name}
              </h3>
              <p style={{
                margin: '0 0 8px 0',
                fontSize: '12px',
                color: '#888',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}>
                {plant.alias}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                {difficultyStars(plant.difficulty)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPlants.length === 0 && (
        <div style={{
          padding: '60px 20px',
          textAlign: 'center',
          color: '#999'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
          <div style={{ fontSize: '15px' }}>未找到相关植物</div>
          <div style={{ fontSize: '13px', marginTop: '8px' }}>请尝试其他关键词</div>
        </div>
      )}
    </div>
  );
}
