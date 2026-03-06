interface VisitStrategyCardProps {
  data: Record<string, unknown>;
}

interface StrategySection {
  title: string;
  icon: string;
  items: string[];
}

export function VisitStrategyCard({ data }: VisitStrategyCardProps) {
  const customerName = data.customerName as string;
  const sections = data.sections as StrategySection[];

  const sectionColors = [
    { bg: 'bg-blue-50', title: 'text-blue-600', dot: 'bg-blue-400' },
    { bg: 'bg-purple-50', title: 'text-purple-600', dot: 'bg-purple-400' },
    { bg: 'bg-indigo-50', title: 'text-indigo-600', dot: 'bg-indigo-400' },
    { bg: 'bg-amber-50', title: 'text-amber-600', dot: 'bg-amber-400' },
    { bg: 'bg-green-50', title: 'text-green-600', dot: 'bg-green-400' },
  ];

  return (
    <div className="bg-white rounded-[24px] border border-blue-200 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-2.5">
        <h3 className="text-white font-semibold text-[15px]">📋 {customerName}沟通策略</h3>
      </div>
      <div className="p-3 space-y-2">
        {sections.map((section, i) => {
          const color = sectionColors[i % sectionColors.length];
          return (
            <div key={i} className={`${color.bg} rounded-lg p-2.5`}>
              <p className={`text-[13px] font-medium ${color.title} mb-1.5`}>
                {section.icon} {section.title}
              </p>
              <ul className="space-y-1">
                {section.items.map((item, j) => (
                  <li key={j} className="text-[13px] text-gray-700 flex items-start gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${color.dot} mt-1.5 flex-shrink-0`} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
