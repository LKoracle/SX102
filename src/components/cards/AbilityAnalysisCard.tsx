interface AbilityAnalysisCardProps {
  data: Record<string, unknown>;
}

interface MetricItem {
  label: string;
  value: string;
  status: 'good' | 'warning' | 'danger';
}

interface SkillItem {
  label: string;
  level: 'strong' | 'weak';
}

export function AbilityAnalysisCard({ data }: AbilityAnalysisCardProps) {
  const memberName = data.memberName as string;
  const metrics = data.metrics as MetricItem[];
  const skills = data.skills as SkillItem[];

  const statusColor = {
    good: { text: 'text-green-600', bg: 'bg-green-50', icon: '✅' },
    warning: { text: 'text-amber-600', bg: 'bg-amber-50', icon: '⚠️' },
    danger: { text: 'text-red-600', bg: 'bg-red-50', icon: '❗' },
  };

  return (
    <div className="bg-white rounded-[20px] border border-purple-200 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-purple-500 to-violet-400 px-4 py-2.5">
        <h3 className="text-white font-semibold text-[15px]">📊 {memberName} - 画像与能力分析</h3>
      </div>
      <div className="p-3 space-y-3">
        {/* Metrics */}
        <div>
          <p className="text-[13px] font-medium text-gray-600 mb-2">目标完成情况</p>
          <div className="grid grid-cols-3 gap-2">
            {metrics.map((m, i) => {
              const s = statusColor[m.status];
              return (
                <div key={i} className={`${s.bg} rounded-lg p-2 text-center`}>
                  <p className="text-[12px] text-gray-500">{m.label}</p>
                  <p className={`text-lg font-bold ${s.text}`}>{m.value}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Skills */}
        <div>
          <p className="text-[13px] font-medium text-gray-600 mb-2">沟通表现分析</p>
          <div className="space-y-1.5">
            {skills.map((skill, i) => (
              <div
                key={i}
                className={`flex items-center justify-between rounded-lg px-3 py-1.5 ${
                  skill.level === 'strong' ? 'bg-green-50' : 'bg-red-50'
                }`}
              >
                <span className="text-[13px] text-gray-700">{skill.label}</span>
                <span
                  className={`text-[12px] font-medium px-2 py-0.5 rounded-full ${
                    skill.level === 'strong'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {skill.level === 'strong' ? '较好' : '短板'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
