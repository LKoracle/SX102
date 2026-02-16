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
  const totalCount = customers.length;
  const displayCount = 6;
  const displayCustomers = customers.slice(0, displayCount);

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      {/* 简洁的标题 */}
      <div className="px-4 py-3 border-b border-gray-100">
        <h3 className="text-gray-800 font-medium text-sm">本月经营客户（{totalCount}）</h3>
      </div>

      {/* 客户列表 */}
      <div className="p-3 space-y-2">
        {displayCustomers.map((customer, index) => {
          const tempColor = tempColorMap[customer.temperature] || tempColorMap['中温'];
          const valColor = valueColorMap[customer.value] || valueColorMap['中价值'];
          return (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg p-3 flex items-start gap-3 hover:border-gray-300 transition-colors"
            >
              {/* 头像 - 改为浅色背景 */}
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-medium text-sm flex-shrink-0">
                {customer.name.charAt(0)}
              </div>

              <div className="flex-1 min-w-0">
                {/* 客户名称和最后联系时间 */}
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-medium text-sm text-gray-800">{customer.name}</span>
                  <span className="text-xs text-gray-400">{customer.lastContact}联系</span>
                </div>

                {/* 标签 - 使用描边样式 */}
                <div className="flex items-center gap-1.5 mb-2 flex-wrap">
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${tempColor.text} border-current bg-white`}>
                    {customer.temperature}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${valColor.text} border-current bg-white`}>
                    {customer.value}
                  </span>
                  {customer.tags.map((tag, i) => (
                    <span key={i} className="text-xs px-2 py-0.5 rounded-full border border-gray-300 text-gray-600 bg-white">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* 建议行动和按钮 */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {customer.actionIcon} {customer.action}
                  </span>
                  <button className="text-xs text-blue-600 border border-blue-600 px-3 py-1 rounded-full hover:bg-blue-50 transition-colors">
                    去经营
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 更多客户按钮 */}
      {totalCount > displayCount && (
        <div className="px-3 pb-3">
          <button className="w-full py-2.5 text-sm text-gray-600 hover:text-gray-800 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-1">
            <span>更多客户</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      )}

      {/* AI总结 - 简化样式 */}
      {summary && (
        <div className="px-3 pb-3">
          <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
            <div className="flex items-start gap-2">
              <span className="text-sm">💡</span>
              <p className="text-xs text-gray-600 leading-relaxed">{summary}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
