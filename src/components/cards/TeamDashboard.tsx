import { teamMembers } from '../../data/team';

export function TeamDashboard() {
  const statusColors = {
    excellent: 'border-blue-400 bg-blue-50',
    good: 'border-indigo-400 bg-indigo-50',
    'needs-attention': 'border-purple-400 bg-purple-50',
  };

  const statusLabels = {
    excellent: '🌟 优秀',
    good: '👍 良好',
    'needs-attention': '⚠️ 需关注',
  };

  return (
    <div className="bg-white rounded-[20px] border border-gray-100 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-secondary to-secondary-light px-4 py-2.5">
        <h3 className="text-white font-semibold text-[15px]">👥 团队成员业绩看板</h3>
      </div>
      <div className="p-2 space-y-2">
        {teamMembers.map((member) => {
          const achieveRate = Math.round((member.monthlyAchieved / member.monthlyTarget) * 100);
          const visitRate = Math.round((member.weeklyVisits / member.weeklyTarget) * 100);

          return (
            <div
              key={member.id}
              className={`border-l-3 rounded-lg p-2.5 ${statusColors[member.status]}`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-[13px] font-medium">
                    {member.avatar}
                  </div>
                  <div>
                    <span className="text-[15px] font-medium">{member.name}</span>
                    <span className="text-[13px] text-text-secondary ml-1">({member.level})</span>
                  </div>
                </div>
                <span className="text-[13px]">{statusLabels[member.status]}</span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-[13px] text-text-secondary">目标达成</p>
                  <p className={`text-[15px] font-bold ${achieveRate >= 80 ? 'text-blue-600' : 'text-purple-500'}`}>
                    {achieveRate}%
                  </p>
                </div>
                <div>
                  <p className="text-[13px] text-text-secondary">周拜访量</p>
                  <p className={`text-[15px] font-bold ${visitRate >= 80 ? 'text-blue-600' : 'text-purple-500'}`}>
                    {member.weeklyVisits}/{member.weeklyTarget}
                  </p>
                </div>
                <div>
                  <p className="text-[13px] text-text-secondary">转化率</p>
                  <p className="text-[15px] font-bold text-secondary">
                    {Math.round(member.conversionRate * 100)}%
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
