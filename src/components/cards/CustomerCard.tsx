import { customers } from '../../data/customers';

interface CustomerCardProps {
  data: Record<string, unknown>;
}

export function CustomerCard({ data }: CustomerCardProps) {
  const customer = customers.find((c) => c.id === data.customerId);
  if (!customer) return null;

  const priorityColors = {
    high: 'bg-purple-100 text-purple-700',
    medium: 'bg-indigo-100 text-indigo-700',
    low: 'bg-blue-100 text-blue-700',
  };

  const priorityLabels = { high: '高优先', medium: '中优先', low: '低优先' };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-[20px] border border-gray-200/50 shadow-sm shadow-gray-200/40 overflow-hidden">
      <div className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-base shadow-sm shadow-blue-200/30">
            {customer.avatar}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[15px] text-gray-900">{customer.name}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${priorityColors[customer.priority]}`}>
                {priorityLabels[customer.priority]}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              {customer.age}岁 · {customer.occupation} · 年收入{customer.annualIncome}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-2">
          {customer.tags.map((tag) => (
            <span key={tag} className="text-xs bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        {!!data.detailed && (
          <>
            <div className="space-y-1.5 text-xs text-text-secondary border-t border-gray-100 pt-2 mt-2">
              <p>👤 家庭：{customer.familyStatus}</p>
              <p>📍 地址：{customer.address}</p>
              <p>📅 上次联系：{customer.lastContact}</p>
              {customer.existingPolicies.length > 0 && (
                <div>
                  <p className="font-medium text-text mb-1">📋 已有保单：</p>
                  {customer.existingPolicies.map((p, i) => (
                    <p key={i} className="ml-4">
                      · {p.name}（{p.type}）- {p.coverage}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {customer.notes && (
          <div className="mt-2 p-2.5 bg-blue-50/50 rounded-xl text-xs text-blue-700">
            💡 {customer.notes}
          </div>
        )}
      </div>
    </div>
  );
}
