import { customers } from '../../data/customers';

interface CustomerCardProps {
  data: Record<string, unknown>;
}

export function CustomerCard({ data }: CustomerCardProps) {
  const customer = customers.find((c) => c.id === data.customerId);
  if (!customer) return null;

  const priorityColors = {
    high: 'bg-red-100 text-red-700',
    medium: 'bg-yellow-100 text-yellow-700',
    low: 'bg-green-100 text-green-700',
  };

  const priorityLabels = { high: '高优先', medium: '中优先', low: '低优先' };

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-3">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white font-bold text-sm">
            {customer.avatar}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm">{customer.name}</span>
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${priorityColors[customer.priority]}`}>
                {priorityLabels[customer.priority]}
              </span>
            </div>
            <p className="text-xs text-text-secondary">
              {customer.age}岁 · {customer.occupation} · 年收入{customer.annualIncome}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-2">
          {customer.tags.map((tag) => (
            <span key={tag} className="text-xs bg-primary-50 text-primary px-2 py-0.5 rounded-full">
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
          <div className="mt-2 p-2 bg-yellow-50 rounded-lg text-xs text-yellow-800">
            💡 {customer.notes}
          </div>
        )}
      </div>
    </div>
  );
}
