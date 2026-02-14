import { teamMembers } from '../../data/team';

interface MemberCardProps {
  data: Record<string, unknown>;
}

export function MemberCard({ data }: MemberCardProps) {
  const member = teamMembers.find((m) => m.id === data.memberId);
  if (!member) return null;

  const achieveRate = Math.round((member.monthlyAchieved / member.monthlyTarget) * 100);

  return (
    <div className="bg-white rounded-xl border border-purple-200 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-purple-500 to-violet-400 px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm">
            {member.avatar}
          </div>
          <div className="text-white">
            <p className="font-semibold text-sm">{member.name}</p>
            <p className="text-xs text-white/80">{member.level}</p>
          </div>
        </div>
      </div>
      <div className="p-3">
        <div className="grid grid-cols-2 gap-2 mb-2">
          <div className="bg-gray-50 rounded-lg p-2 text-center">
            <p className="text-xs text-text-secondary">月度达成</p>
            <p className="text-lg font-bold text-purple-500">{achieveRate}%</p>
            <p className="text-xs text-text-secondary">
              {(member.monthlyAchieved / 10000).toFixed(1)}万/{(member.monthlyTarget / 10000).toFixed(0)}万
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-2 text-center">
            <p className="text-xs text-text-secondary">周拜访量</p>
            <p className="text-lg font-bold text-purple-500">
              {member.weeklyVisits}<span className="text-xs text-text-secondary">/{member.weeklyTarget}</span>
            </p>
            <p className="text-xs text-text-secondary">
              完成率 {Math.round((member.weeklyVisits / member.weeklyTarget) * 100)}%
            </p>
          </div>
        </div>

        {member.issues && member.issues.length > 0 && (
          <div className="bg-purple-50 rounded-lg p-2">
            <p className="text-xs font-medium text-purple-700 mb-1">⚠️ 问题诊断：</p>
            {member.issues.map((issue, i) => (
              <p key={i} className="text-xs text-purple-600 ml-2">• {issue}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
