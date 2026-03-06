interface FieldCustomerProfileCardProps {
  data: Record<string, unknown>;
}

interface ProfileData {
  customerName: string;
  avatar?: string;
  profileItems: Array<{ dimension: string; icon: string; value: string }>;
}

export function FieldCustomerProfileCard({ data }: FieldCustomerProfileCardProps) {
  const d = (data as unknown as ProfileData) || {
    customerName: '王哥',
    avatar: '👤',
    profileItems: [],
  };

  return (
    <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-[#7C3AED] to-[#9333EA] px-4 py-2.5">
        <h3 className="text-white font-semibold text-[15px]">👤 客户画像</h3>
      </div>
      <div className="p-3 space-y-2.5 max-h-[450px] overflow-y-auto">
        {/* Customer header */}
        <div className="flex items-center gap-2.5 pb-2 border-b border-gray-100">
          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-[20px] border-2 border-purple-200">{d.avatar || '👤'}</div>
          <div>
            <div className="text-[13px] font-bold text-[#333]">{d.customerName}</div>
            <div className="text-[9px] text-[#999]">AI画像分析 · 基于朋友圈公开动态</div>
          </div>
        </div>

        {/* Profile items */}
        <div className="space-y-1">
          {d.profileItems.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-2 rounded-[10px] px-2.5 py-2"
              style={{
                background: i % 2 === 0 ? '#FAF5FF' : '#F5F3FF',
              }}
            >
              <span className="text-[13px] w-5 text-center">{item.icon}</span>
              <span className="text-[10px] font-semibold text-[#7C3AED] min-w-[52px]">{item.dimension}</span>
              <span className="text-[10px] text-[#333] flex-1">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
