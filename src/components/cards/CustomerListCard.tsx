interface CustomerListCardProps {
  data: Record<string, unknown>;
}

interface CustomerListItem {
  name: string;
  temperature: '高温' | '中温' | '低温';
  value: '高价值' | '中价值' | '低价值';
  action: string;
  actionIcon: string;
  tags: string[];
  lastContact: string;
}

const tempColorMap: Record<string, { bg: string; text: string }> = {
  '高温': { bg: 'bg-red-50', text: 'text-red-600' },
  '中温': { bg: 'bg-orange-50', text: 'text-orange-600' },
  '低温': { bg: 'bg-blue-50', text: 'text-blue-600' },
};

const valueColorMap: Record<string, { bg: string; text: string }> = {
  '高价值': { bg: 'bg-purple-50', text: 'text-purple-600' },
  '中价值': { bg: 'bg-indigo-50', text: 'text-indigo-600' },
  '低价值': { bg: 'bg-gray-50', text: 'text-gray-500' },
};

export function CustomerListCard({ data }: CustomerListCardProps) {
  const customers = data.customers as CustomerListItem[];
  const summary = data.summary as string | undefined;

  return (
    <div className="bg-white rounded-[20px] border border-gray-100 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-[#667eea] to-[#764ba2] px-4 py-2.5 flex items-center justify-between">
        <h3 className="text-white font-semibold text-[15px]">📋 本月客户经营清单</h3>
        <span className="text-white/80 text-[12px]">共{customers.length}位客户</span>
      </div>
      <div className="p-2 space-y-2">
        {customers.map((customer, index) => {
          const tempColor = tempColorMap[customer.temperature] || tempColorMap['中温'];
          const valColor = valueColorMap[customer.value] || valueColorMap['中价值'];
          return (
            <div
              key={index}
              className="border border-gray-100 rounded-xl p-3 flex items-start gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center text-white font-bold text-[15px] flex-shrink-0">
                {customer.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-[15px] text-[#333]">{customer.name}</span>
                  <span className="text-[12px] text-[#999]">{customer.lastContact}联系</span>
                </div>
                <div className="flex items-center gap-1.5 mb-2 flex-wrap">
                  <span className={`text-[11px] px-1.5 py-0.5 rounded-full ${tempColor.bg} ${tempColor.text}`}>
                    {customer.temperature}
                  </span>
                  <span className={`text-[11px] px-1.5 py-0.5 rounded-full ${valColor.bg} ${valColor.text}`}>
                    {customer.value}
                  </span>
                  {customer.tags.map((tag, i) => (
                    <span key={i} className="text-[11px] px-1.5 py-0.5 rounded-full bg-gray-50 text-gray-500">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[13px] text-[#667eea] font-medium">
                    {customer.actionIcon} 建议：{customer.action}
                  </span>
                  <button className="text-[12px] text-white bg-gradient-to-r from-[#667eea] to-[#764ba2] px-3 py-1 rounded-full">
                    去经营
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {summary && (
        <div className="px-3 pb-3">
          <div className="bg-gradient-to-r from-[#f8f0ff] to-[#f0f4ff] rounded-xl p-2.5 flex items-start gap-2">
            <span className="text-[16px] leading-none mt-0.5">💡</span>
            <p className="text-[12px] text-[#666]">{summary}</p>
          </div>
        </div>
      )}
    </div>
  );
}
