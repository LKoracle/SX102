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
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden w-full">
      <div className="p-4 flex flex-col gap-3">

        {/* 顶部个人信息 */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center text-blue-600 font-medium text-[15px]">
            {customer.avatar}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[15px] text-gray-800">{customer.name}</span>
              <span className={`text-[11px] px-1.5 py-0.5 rounded-full ${priorityColors[customer.priority]}`}>
                {priorityLabels[customer.priority]}
              </span>
            </div>
            <p className="text-[13px] text-gray-500 mt-0.5">
              {customer.age}岁 · {customer.occupation}
            </p>
          </div>
        </div>

        {/* 标签区域 */}
        <div className="flex flex-wrap gap-1.5">
          {customer.tags.map((tag) => (
            <span key={tag} className="text-[12px] bg-gray-50 text-gray-500 px-2 py-0.5 rounded border border-gray-100">
              {tag}
            </span>
          ))}
        </div>

        {/* 💡 黄色备注栏 */}
        {customer.notes && (
          <div className="bg-[#FFF9E7] rounded-lg p-3 border-l-4 border-orange-300">
            <div className="flex gap-1.5 items-start">
              <span className="text-[13px] flex-shrink-0">💡</span>
              <p className="text-[13px] text-orange-800 leading-relaxed break-words">
                {customer.notes}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
