interface LearningPlanCardProps {
  data: Record<string, unknown>;
}

interface LearningItem {
  type: string;
  title: string;
}

const typeStyle: Record<string, { bg: string; text: string }> = {
  课程: { bg: 'bg-blue-500', text: 'text-white' },
  演练: { bg: 'bg-purple-500', text: 'text-white' },
  工具: { bg: 'bg-green-500', text: 'text-white' },
};

export function LearningPlanCard({ data }: LearningPlanCardProps) {
  const title = data.title as string;
  const items = data.items as LearningItem[];
  const tip = data.tip as string | undefined;

  return (
    <div className="bg-white rounded-[20px] border border-blue-200 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-500 px-4 py-2.5">
        <h3 className="text-white font-semibold text-[15px]">📚 {title}</h3>
      </div>
      <div className="p-3 space-y-2">
        {items.map((item, i) => {
          const style = typeStyle[item.type] ?? { bg: 'bg-gray-400', text: 'text-white' };
          return (
            <div key={i} className="flex items-start gap-2 bg-gray-50 rounded-lg px-3 py-2.5">
              <span
                className={`text-[12px] font-medium ${style.bg} ${style.text} rounded px-1.5 py-0.5 flex-shrink-0 mt-0.5`}
              >
                {item.type}
              </span>
              <span className="text-[13px] text-gray-700 leading-[1.5]">{item.title}</span>
            </div>
          );
        })}
        {tip && (
          <div className="bg-indigo-50 rounded-lg px-3 py-2 text-[12px] text-indigo-700">
            💡 {tip}
          </div>
        )}
      </div>
    </div>
  );
}
