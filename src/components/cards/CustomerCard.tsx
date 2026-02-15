import { customers } from '../../data/customers';

interface CustomerCardProps {
  data: Record<string, unknown>;
}

const priorityColors = {
  high: 'bg-purple-100 text-purple-700',
  medium: 'bg-indigo-100 text-indigo-700',
  low: 'bg-blue-100 text-blue-700',
};

const priorityLabels = { high: '高优先', medium: '中优先', low: '低优先' };

export function CustomerCard({ data }: CustomerCardProps) {
  const customer = customers.find((c) => c.id === data.customerId);
  if (!customer) return null;

  return (
    // 第一层：负责卡片的外形
    <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden w-full">

      {/* 第二层：缩小内边距 */}
      <div className="p-3 flex flex-col gap-2">

        {/* 顶部个人信息：缩小头像和间距 */}
        <div className="flex items-start gap-2">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center text-blue-600 font-bold text-xs">
            {customer.avatar}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-xs text-gray-800">{customer.name}</span>
              <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${priorityColors[customer.priority]}`}>
                {priorityLabels[customer.priority]}
              </span>
            </div>
            <p className="text-[11px] text-gray-500 mt-0.5">
              {customer.age}岁 · {customer.occupation}
            </p>
          </div>
        </div>

        {/* 标签区域：缩小标签 */}
        <div className="flex flex-wrap gap-1">
          {customer.tags.map((tag) => (
            <span key={tag} className="text-[10px] bg-gray-50 text-gray-500 px-1.5 py-0.5 rounded border border-gray-100">
              {tag}
            </span>
          ))}
        </div>

        {/* 💡 重点：黄色备注栏缩小 */}
        {customer.notes && (
          <div className="bg-[#FFF9E7] rounded-md p-2 border-l-3 border-orange-300">
            <div className="flex gap-1 items-start">
              <span className="text-[11px] flex-shrink-0">💡</span>
              <p className="text-[11px] text-orange-800 leading-relaxed break-words">
                {customer.notes}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
