import { useState, useEffect } from 'react';
import { Plus, Search, X, Trash2 } from 'lucide-react';
import { PlantCard } from '@/components/PlantCard';
import { plants, categories, getPlantsByCategory, searchPlants } from '@/data/plants';
import type { Plant, UserPlant } from '@/types';
import { getStoredData, addUserPlant, updateUserPlant, removeUserPlant, generateId } from '@/utils/storage';

export function GardenPage() {
  const [userPlants, setUserPlants] = useState<UserPlant[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [plantNickname, setPlantNickname] = useState('');
  const [plantLocation, setPlantLocation] = useState('室内');

  useEffect(() => {
    loadUserPlants();
  }, []);

  const loadUserPlants = () => {
    const data = getStoredData();
    setUserPlants(data.userPlants);
  };

  const handleAddPlant = () => {
    if (!selectedPlant) return;

    const newUserPlant: UserPlant = {
      id: generateId(),
      plantId: selectedPlant.id,
      nickname: plantNickname || selectedPlant.name,
      location: plantLocation,
      acquiredDate: new Date().toISOString(),
      wateringInterval: selectedPlant.careGuide.wateringFrequency,
      lastWatered: null,
      lastFertilized: null,
      status: 'healthy',
      notes: '',
      plant: selectedPlant
    };

    addUserPlant(newUserPlant);
    loadUserPlants();
    setShowAddModal(false);
    setSelectedPlant(null);
    setPlantNickname('');
    setPlantLocation('室内');
  };

  const handleWaterPlant = (plantId: string) => {
    updateUserPlant(plantId, { lastWatered: new Date().toISOString() });
    loadUserPlants();
  };

  const handleDeletePlant = (plantId: string) => {
    if (confirm('确定要删除这株植物吗？')) {
      removeUserPlant(plantId);
      loadUserPlants();
    }
  };

  const filteredPlants = searchQuery
    ? searchPlants(searchQuery)
    : selectedCategory
    ? getPlantsByCategory(selectedCategory)
    : plants;

  return (
    <div style={{ padding: '16px', paddingBottom: '100px' }}>
      {/* 头部 */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '20px'
      }}>
        <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 700, color: '#333' }}>
          我的花园
        </h1>
        <button
          onClick={() => setShowAddModal(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '10px 16px',
            borderRadius: '12px',
            border: 'none',
            background: '#4CAF50',
            color: '#fff',
            fontSize: '14px',
            fontWeight: 500,
            cursor: 'pointer'
          }}
        >
          <Plus size={18} />
          添加植物
        </button>
      </div>

      {/* 统计卡片 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '12px',
        marginBottom: '24px'
      }}>
        <div style={{
          padding: '16px',
          background: '#E8F5E9',
          borderRadius: '12px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', fontWeight: 700, color: '#4CAF50' }}>
            {userPlants.length}
          </div>
          <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
            我的植物
          </div>
        </div>
        <div style={{
          padding: '16px',
          background: '#FFF3E0',
          borderRadius: '12px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', fontWeight: 700, color: '#FF9800' }}>
            {userPlants.filter(p => {
              if (!p.lastWatered) return true;
              const daysSince = Math.floor((Date.now() - new Date(p.lastWatered).getTime()) / (1000 * 60 * 60 * 24));
              return daysSince >= p.wateringInterval;
            }).length}
          </div>
          <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
            待浇水
          </div>
        </div>
        <div style={{
          padding: '16px',
          background: '#E3F2FD',
          borderRadius: '12px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', fontWeight: 700, color: '#2196F3' }}>
            {userPlants.filter(p => p.status === 'healthy').length}
          </div>
          <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
            健康状态
          </div>
        </div>
      </div>

      {/* 植物列表 */}
      {userPlants.length === 0 ? (
        <div style={{
          padding: '60px 20px',
          textAlign: 'center',
          background: '#f9f9f9',
          borderRadius: '16px'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🌱</div>
          <div style={{ fontSize: '16px', color: '#333', fontWeight: 500 }}>
            还没有添加植物
          </div>
          <div style={{ fontSize: '14px', color: '#888', marginTop: '8px', marginBottom: '20px' }}>
            点击右上角添加您的第一株植物
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            style={{
              padding: '12px 24px',
              borderRadius: '12px',
              border: 'none',
              background: '#4CAF50',
              color: '#fff',
              fontSize: '14px',
              fontWeight: 500,
              cursor: 'pointer'
            }}
          >
            立即添加
          </button>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '12px'
        }}>
          {userPlants.map(plant => (
            <div key={plant.id} style={{ position: 'relative' }}>
              <PlantCard
                userPlant={plant}
                onWater={() => handleWaterPlant(plant.id)}
              />
              <button
                onClick={() => handleDeletePlant(plant.id)}
                style={{
                  position: 'absolute',
                  top: '8px',
                  left: '8px',
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  border: 'none',
                  background: 'rgba(255,255,255,0.9)',
                  color: '#FF5722',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* 添加植物弹窗 */}
      {showAddModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '500px',
            maxHeight: '90vh',
            background: '#fff',
            borderRadius: '24px 24px 0 0',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {/* 弹窗头部 */}
            <div style={{
              padding: '20px',
              borderBottom: '1px solid #f0f0f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>
                {selectedPlant ? '确认添加' : '添加植物'}
              </h2>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setSelectedPlant(null);
                  setSearchQuery('');
                  setSelectedCategory(null);
                }}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  border: 'none',
                  background: '#f5f5f5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* 弹窗内容 */}
            <div style={{ flex: 1, overflow: 'auto', padding: '20px' }}>
              {selectedPlant ? (
                <div>
                  <div style={{
                    display: 'flex',
                    gap: '16px',
                    marginBottom: '24px'
                  }}>
                    <img
                      src={selectedPlant.imageUrl}
                      alt={selectedPlant.name}
                      style={{
                        width: '100px',
                        height: '100px',
                        borderRadius: '12px',
                        objectFit: 'cover'
                      }}
                    />
                    <div>
                      <h3 style={{ margin: '0 0 4px 0', fontSize: '18px' }}>
                        {selectedPlant.name}
                      </h3>
                      <p style={{ margin: '0 0 8px 0', fontSize: '13px', color: '#888' }}>
                        {selectedPlant.alias}
                      </p>
                      <span style={{
                        padding: '4px 10px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        background: '#E8F5E9',
                        color: '#4CAF50'
                      }}>
                        {selectedPlant.categoryName}
                      </span>
                    </div>
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '14px', color: '#666', marginBottom: '8px' }}>
                      植物昵称（可选）
                    </label>
                    <input
                      type="text"
                      value={plantNickname}
                      onChange={(e) => setPlantNickname(e.target.value)}
                      placeholder={`给这株${selectedPlant.name}起个名字`}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        border: '1px solid #e0e0e0',
                        fontSize: '15px',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', fontSize: '14px', color: '#666', marginBottom: '8px' }}>
                      摆放位置
                    </label>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {['室内', '阳台', '客厅', '卧室', '办公室', '庭院'].map(loc => (
                        <button
                          key={loc}
                          onClick={() => setPlantLocation(loc)}
                          style={{
                            padding: '10px 20px',
                            borderRadius: '20px',
                            border: '1px solid',
                            borderColor: plantLocation === loc ? '#4CAF50' : '#e0e0e0',
                            background: plantLocation === loc ? '#E8F5E9' : '#fff',
                            color: plantLocation === loc ? '#4CAF50' : '#666',
                            fontSize: '14px',
                            cursor: 'pointer'
                          }}
                        >
                          {loc}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div style={{
                    padding: '16px',
                    background: '#f9f9f9',
                    borderRadius: '12px',
                    marginBottom: '24px'
                  }}>
                    <div style={{ fontSize: '14px', fontWeight: 500, marginBottom: '12px' }}>
                      养护信息
                    </div>
                    <div style={{ fontSize: '13px', color: '#666', lineHeight: 1.8 }}>
                      <div>💧 浇水周期：每{selectedPlant.careGuide.wateringFrequency}天</div>
                      <div>☀️ 光照：{selectedPlant.careGuide.light}</div>
                      <div>🌡️ 温度：{selectedPlant.careGuide.temperature}</div>
                    </div>
                  </div>

                  <button
                    onClick={handleAddPlant}
                    style={{
                      width: '100%',
                      padding: '14px',
                      borderRadius: '12px',
                      border: 'none',
                      background: '#4CAF50',
                      color: '#fff',
                      fontSize: '16px',
                      fontWeight: 500,
                      cursor: 'pointer'
                    }}
                  >
                    确认添加
                  </button>
                </div>
              ) : (
                <div>
                  {/* 搜索框 */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '12px 16px',
                    background: '#f5f5f5',
                    borderRadius: '12px',
                    marginBottom: '16px'
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
                    {searchQuery && (
                      <button onClick={() => setSearchQuery('')}>
                        <X size={18} color="#999" />
                      </button>
                    )}
                  </div>

                  {/* 分类筛选 */}
                  {!searchQuery && (
                    <div style={{
                      display: 'flex',
                      gap: '8px',
                      overflowX: 'auto',
                      paddingBottom: '8px',
                      marginBottom: '16px'
                    }}>
                      <button
                        onClick={() => setSelectedCategory(null)}
                        style={{
                          padding: '8px 16px',
                          borderRadius: '20px',
                          border: '1px solid',
                          borderColor: selectedCategory === null ? '#4CAF50' : '#e0e0e0',
                          background: selectedCategory === null ? '#E8F5E9' : '#fff',
                          color: selectedCategory === null ? '#4CAF50' : '#666',
                          fontSize: '13px',
                          whiteSpace: 'nowrap',
                          cursor: 'pointer'
                        }}
                      >
                        全部
                      </button>
                      {categories.map(cat => (
                        <button
                          key={cat.id}
                          onClick={() => setSelectedCategory(cat.id)}
                          style={{
                            padding: '8px 16px',
                            borderRadius: '20px',
                            border: '1px solid',
                            borderColor: selectedCategory === cat.id ? '#4CAF50' : '#e0e0e0',
                            background: selectedCategory === cat.id ? '#E8F5E9' : '#fff',
                            color: selectedCategory === cat.id ? '#4CAF50' : '#666',
                            fontSize: '13px',
                            whiteSpace: 'nowrap',
                            cursor: 'pointer'
                          }}
                        >
                          {cat.name}
                        </button>
                      ))}
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
                          padding: '12px',
                          background: '#f9f9f9',
                          borderRadius: '12px',
                          cursor: 'pointer',
                          textAlign: 'center'
                        }}
                      >
                        <img
                          src={plant.imageUrl}
                          alt={plant.name}
                          style={{
                            width: '100%',
                            height: '100px',
                            borderRadius: '8px',
                            objectFit: 'cover',
                            marginBottom: '8px'
                          }}
                        />
                        <div style={{ fontSize: '14px', fontWeight: 500 }}>
                          {plant.name}
                        </div>
                        <div style={{ fontSize: '12px', color: '#888', marginTop: '2px' }}>
                          {plant.categoryName}
                        </div>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'center',
                          gap: '2px',
                          marginTop: '4px'
                        }}>
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span
                              key={i}
                              style={{
                                fontSize: '10px',
                                color: i < plant.difficulty ? '#FFC107' : '#ddd'
                              }}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
