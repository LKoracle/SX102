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
    <div className="bg-white rounded-[18px] border border-gray-100/80 shadow-lg shadow-gray-200/70 overflow-hidden">
      <div className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary via-primary-dark to-secondary flex items-center justify-center text-white font-bold text-sm shadow-md shadow-primary/20">
            {customer.avatar}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[15px]">{customer.name}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${priorityColors[customer.priority]}`}>
                {priorityLabels[customer.priority]}
              </span>
            </div>
            <p className="text-xs text-text-secondary mt-0.5">
              {customer.age}岁 · {customer.occupation} · 年收入{customer.annualIncome}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-2">
          {customer.tags.map((tag) => (
            <span key={tag} className="text-xs bg-primary-50 text-primary px-2.5 py-1 rounded-full font-medium">
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
          <div className="mt-2 p-2.5 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl text-xs text-indigo-700 font-medium">
            💡 {customer.notes}
          </div>
        )}
      </div>
    </div>
  );
}
