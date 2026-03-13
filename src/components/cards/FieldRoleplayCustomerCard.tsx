interface FieldRoleplayCustomerCardProps {
  data: {
    customerName: string;
    customerContent: string;
    hint?: string;
  };
}

export default function FieldRoleplayCustomerCard({ data }: FieldRoleplayCustomerCardProps) {
  const { customerName, customerContent, hint } = data;
  const initial = customerName.charAt(0);

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
        background: 'linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)',
        padding: '8px 14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 14 }}>🎭</span>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>AI陪练模式</span>
        </div>
        <div style={{
          background: 'rgba(255,255,255,0.2)',
          borderRadius: 10,
          padding: '2px 8px',
          fontSize: 10,
          color: 'rgba(255,255,255,0.9)',
        }}>
          模拟客户 · {customerName}
        </div>
      </div>

      {/* Customer speech */}
      <div style={{ padding: '12px 14px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
          {/* Avatar */}
          <div style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #7C3AED, #4F46E5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: 700,
            fontSize: 15,
            flexShrink: 0,
          }}>{initial}</div>

          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: '#7C3AED', fontWeight: 600, marginBottom: 5 }}>
              {customerName}
            </div>
            <div style={{
              background: 'linear-gradient(135deg, #F5F3FF, #EDE9FE)',
              border: '1px solid #DDD6FE',
              borderRadius: '2px 12px 12px 12px',
              padding: '9px 12px',
              fontSize: 13,
              color: '#1E1B4B',
              lineHeight: 1.6,
            }}>
              {customerContent}
            </div>
          </div>
        </div>
      </div>

      {/* Hint */}
      {hint && (
        <>
          <div style={{ height: 1, background: '#F1F5F9', margin: '0 14px' }} />
          <div style={{
            padding: '7px 14px 9px',
            display: 'flex',
            alignItems: 'center',
            gap: 5,
          }}>
            <span style={{ fontSize: 12 }}>👇</span>
            <span style={{ fontSize: 11, color: '#7C3AED', fontWeight: 500 }}>{hint}</span>
          </div>
        </>
      )}
    </div>
  );
}
