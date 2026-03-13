interface FieldInteractionHeatCardProps {
  data: {
    total: number;
    hot: number;
    watching: number;
    cold: number;
  };
}

export default function FieldInteractionHeatCard({ data }: FieldInteractionHeatCardProps) {
  const { total, hot, watching, cold } = data;
  const hotPct = Math.round((hot / total) * 100);
  const watchPct = Math.round((watching / total) * 100);
  const coldPct = 100 - hotPct - watchPct;

  return (
    <div style={{
      background: '#fff',
      borderRadius: 14,
      border: '1px solid #E8EFFE',
      overflow: 'hidden',
      boxShadow: '0 2px 10px rgba(59,94,219,0.07)',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '9px 14px 5px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 15 }}>🌡️</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#1E293B' }}>近半年互动温度分析</span>
        </div>
        <span style={{ fontSize: 11, color: '#94A3B8' }}>共 {total} 位客户</span>
      </div>

      {/* Progress bar */}
      <div style={{ padding: '0 14px 4px' }}>
        <div style={{ display: 'flex', height: 8, borderRadius: 5, overflow: 'hidden', gap: 2 }}>
          <div style={{ width: `${hotPct}%`, background: 'linear-gradient(90deg, #F97316, #EF4444)', borderRadius: '5px 0 0 5px' }} />
          <div style={{ width: `${watchPct}%`, background: '#CBD5E1' }} />
          <div style={{ width: `${coldPct}%`, background: 'linear-gradient(90deg, #60A5FA, #3B82F6)', borderRadius: '0 5px 5px 0' }} />
        </div>
      </div>

      {/* Labels */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '2px 14px 8px' }}>
        <span style={{ fontSize: 11, color: '#F97316', fontWeight: 600 }}>🔥 热/温 {hot}位</span>
        <span style={{ fontSize: 11, color: '#94A3B8' }}>观望 {watching}位</span>
        <span style={{ fontSize: 11, color: '#3B82F6', fontWeight: 600 }}>❄️ 低温 {cold}位</span>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: '#F1F5F9', margin: '0 14px' }} />

      {/* Cards row */}
      <div style={{ display: 'flex', gap: 8, padding: '9px 10px 10px' }}>
        {/* Hot card */}
        <div style={{
          flex: 1, borderRadius: 10,
          background: 'linear-gradient(135deg, #FFF7ED, #FEF3C7)',
          padding: '8px 9px',
          border: '1px solid #FDE68A',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 5 }}>
            <div style={{
              width: 26, height: 26, borderRadius: '50%',
              background: 'linear-gradient(135deg, #F97316, #EF4444)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontWeight: 800, fontSize: 13, flexShrink: 0,
            }}>{hot}</div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#92400E' }}>中高温客户</div>
              <div style={{ fontSize: 11, color: '#B45309' }}>转化率 ~10%</div>
            </div>
          </div>
          <div style={{
            fontSize: 11, color: '#78350F', lineHeight: 1.4,
            background: 'rgba(255,255,255,0.6)', borderRadius: 7, padding: '5px 7px',
          }}>
            🎯 建议尽快邀约拜访，直接进行产品推荐
          </div>
        </div>

        {/* Cold card */}
        <div style={{
          flex: 1, borderRadius: 10,
          background: 'linear-gradient(135deg, #EFF6FF, #DBEAFE)',
          padding: '8px 9px',
          border: '1px solid #BFDBFE',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 5 }}>
            <div style={{
              width: 26, height: 26, borderRadius: '50%',
              background: 'linear-gradient(135deg, #60A5FA, #3B82F6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontWeight: 800, fontSize: 13, flexShrink: 0,
            }}>{cold}</div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#1E40AF' }}>低温客户</div>
              <div style={{ fontSize: 11, color: '#2563EB' }}>长期未联系</div>
            </div>
          </div>
          <div style={{
            fontSize: 11, color: '#1D4ED8', lineHeight: 1.4,
            background: 'rgba(255,255,255,0.6)', borderRadius: 7, padding: '5px 7px',
          }}>
            💬 加强线上互动频次，提升客户关系
          </div>
        </div>
      </div>
    </div>
  );
}
