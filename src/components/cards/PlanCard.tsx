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
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-secondary to-secondary-light px-4 py-2.5">
        <h3 className="text-white font-semibold text-sm flex items-center gap-2">
          📋 {title}
        </h3>
      </div>
      <div className="p-3 space-y-3">
        {items.map((item, index) => (
          <div key={index}>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold">
                {index + 1}
              </span>
              <span className="text-sm font-medium">{item.week}</span>
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
