interface ObjectionHandlingCardProps {
  data: Record<string, unknown>;
}

interface Objection {
  concern: string;
  response: string;
  caseRef?: string;
}

export function ObjectionHandlingCard({ data }: ObjectionHandlingCardProps) {
  const customerName = data.customerName as string;
  const objections = data.objections as Objection[];

  return (
    <div className="bg-white rounded-[20px] border border-amber-200 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-amber-500 to-orange-400 px-4 py-2.5">
        <h3 className="text-white font-semibold text-[15px]">💡 异议处理建议 - {customerName}</h3>
      </div>
      <div className="p-3 space-y-3">
        {objections.map((obj, i) => (
          <div key={i} className="space-y-2">
            {/* Concern */}
            <div className="bg-red-50 rounded-lg p-2.5">
              <p className="text-[13px] font-medium text-red-600 mb-1">⚠️ 常见疑虑</p>
              <p className="text-[13px] text-gray-700">{obj.concern}</p>
            </div>
            {/* Response script */}
            <div className="bg-green-50 rounded-lg p-2.5">
              <p className="text-[13px] font-medium text-green-600 mb-1">💬 应对话术</p>
              <p className="text-[13px] text-gray-700 leading-[1.6]">{obj.response}</p>
            </div>
            {/* Case reference */}
            {obj.caseRef && (
              <div className="bg-blue-50 rounded-lg p-2.5">
                <p className="text-[13px] font-medium text-blue-600 mb-1">📖 案例参考</p>
                <p className="text-[13px] text-gray-700">{obj.caseRef}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
