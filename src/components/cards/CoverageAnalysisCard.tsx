interface CoverageAnalysisCardProps {
  data: Record<string, unknown>;
}

interface CoverageItem {
  name: string;
  existing: string;
  gap: string;
  status: 'adequate' | 'gap' | 'missing';
  priority?: boolean;
}

interface CoverageCategory {
  category: string;
  icon: string;
  items: CoverageItem[];
}

const statusConfig = {
  adequate: { label: '保障充足', color: 'text-green-600', bg: 'bg-green-50', barColor: 'bg-green-400' },
  gap: { label: '', color: 'text-orange-600', bg: 'bg-orange-50', barColor: 'bg-orange-400' },
  missing: { label: '缺失', color: 'text-red-500', bg: 'bg-red-50', barColor: 'bg-red-300' },
};

export function CoverageAnalysisCard({ data }: CoverageAnalysisCardProps) {
  const customerName = (data.customerName as string) ?? '李平安';
  const categories = data.categories as CoverageCategory[] | undefined;

  const defaultCategories: CoverageCategory[] = [
    {
      category: '健康保障',
      icon: '🏥',
      items: [
        { name: '疾病保障', existing: '已有50万', gap: '缺50万', status: 'gap', priority: true },
        { name: '医疗保障', existing: '已有1类', gap: '缺2类', status: 'gap' },
        { name: '伤残保障', existing: '已有300万', gap: '保障充足', status: 'adequate' },
        { name: '护理保障', existing: '缺失', gap: '缺100万', status: 'missing' },
        { name: '身故保障', existing: '缺失', gap: '缺100万', status: 'missing' },
      ],
    },
    {
      category: '财富保障',
      icon: '💰',
      items: [
        { name: '财富管理', existing: '已有20万', gap: '缺150万', status: 'gap', priority: true },
      ],
    },
    {
      category: '养老保障',
      icon: '🏡',
      items: [
        { name: '养老储备', existing: '已有30万', gap: '缺180万', status: 'gap', priority: true },
      ],
    },
    {
      category: '传承保障',
      icon: '🤝',
      items: [
        { name: '传承储备', existing: '已有50万', gap: '缺100万', status: 'gap' },
      ],
    },
  ];

  const displayCategories = categories ?? defaultCategories;

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-500 px-4 py-2.5">
        <h3 className="text-white font-semibold text-[15px]">🔍 {customerName}保障缺口分析</h3>
      </div>

      <div className="p-3">
        {/* Comparison tabs */}
        <div className="flex gap-2 mb-3">
          <button className="text-[11px] px-2.5 py-1 rounded-full bg-blue-500 text-white">
            与前20%客群均值比
          </button>
          <button className="text-[11px] px-2.5 py-1 rounded-full bg-gray-100 text-gray-500">
            与前50%客群均值比
          </button>
        </div>

        {/* Categories */}
        <div className="space-y-3">
          {displayCategories.map((cat, catIndex) => (
            <div key={catIndex}>
              {/* Category header */}
              <div className="flex items-center gap-1.5 mb-1.5">
                <span className="text-sm">{cat.icon}</span>
                <span className="text-xs font-semibold text-gray-700">{cat.category}</span>
              </div>

              {/* Items */}
              <div className="space-y-1.5 pl-1">
                {cat.items.map((item, itemIndex) => {
                  const config = statusConfig[item.status];
                  return (
                    <div key={itemIndex} className={`flex items-center gap-2 rounded-lg px-2.5 py-1.5 ${config.bg}`}>
                      {/* Name */}
                      <span className="text-[11px] text-gray-600 w-14 flex-shrink-0">{item.name}</span>

                      {/* Progress bar */}
                      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${config.barColor}`}
                          style={{
                            width: item.status === 'adequate' ? '100%' : item.status === 'gap' ? '40%' : '0%',
                          }}
                        />
                      </div>

                      {/* Existing info */}
                      <span className="text-[11px] text-gray-500 w-16 text-right flex-shrink-0">
                        {item.existing}
                      </span>

                      {/* Gap / status */}
                      <span className={`text-[11px] font-medium w-16 text-right flex-shrink-0 ${config.color}`}>
                        {item.status === 'adequate' ? '✅ 充足' : item.gap}
                      </span>

                      {/* Priority tag */}
                      {item.priority && (
                        <span className="text-[10px] bg-red-500 text-white px-1.5 py-0.5 rounded flex-shrink-0">
                          建议优先
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Data source note */}
        <div className="mt-3 pt-2 border-t border-gray-100">
          <p className="text-[10px] text-gray-400">
            📊 数据来源：公司内部保单 + 中银保信同业保障数据（已获客户授权）
          </p>
        </div>
      </div>
    </div>
  );
}
