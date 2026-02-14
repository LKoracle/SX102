interface PlanCardProps {
  data: Record<string, unknown>;
}

interface PlanItem {
  week: string;
  tasks: string[];
}

export function PlanCard({ data }: PlanCardProps) {
  const title = data.title as string;
  const items = data.items as PlanItem[];

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-[20px] border border-gray-200/50 shadow-sm shadow-gray-200/40 overflow-hidden">
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 px-4 py-3">
        <h3 className="text-white font-semibold text-[15px] flex items-center gap-2">
          📋 {title}
        </h3>
      </div>
      <div className="p-4 space-y-3">
        {items.map((item, index) => (
          <div key={index}>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 text-white text-xs flex items-center justify-center font-bold shadow-sm shadow-blue-200/30">
                {index + 1}
              </span>
              <span className="text-[14px] font-semibold text-gray-900">{item.week}</span>
            </div>
            <ul className="ml-8 space-y-1">
              {item.tasks.map((task, i) => (
                <li key={i} className="text-xs text-text-secondary flex items-start gap-1.5">
                  <span className="text-primary mt-0.5">•</span>
                  <span>{task}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
