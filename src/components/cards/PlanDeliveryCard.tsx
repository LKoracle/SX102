import { useState } from 'react';

interface WeekPlan {
  week: string;
  tasks: string[];
}

interface PlanDeliveryCardProps {
  data: Record<string, unknown>;
}

export function PlanDeliveryCard({ data }: PlanDeliveryCardProps) {
  const agentName = (data.agentName as string) || '李平安';
  const planTitle = (data.planTitle as string) || '30天业绩改善计划';

  const weekPlans = (data.weekPlans as WeekPlan[]) || [
    {
      week: '第1周',
      tasks: [
        '恢复日均外呼至30通以上',
        '参加异议处理基础培训',
        '每日提交外呼记录和心得',
      ],
    },
    {
      week: '第2周',
      tasks: [
        '完成3次异议处理话术演练',
        '开始重点客户定向拜访（5户）',
        '与导师进行1次场景模拟',
      ],
    },
    {
      week: '第3周',
      tasks: [
        '日均外呼提升至35通',
        '完成8次客户面访',
        '参加高级异议处理培训',
      ],
    },
    {
      week: '第4周',
      tasks: [
        '客户转化率目标20%',
        '本月业绩目标FYC达成率60%',
        '提交月度复盘报告',
      ],
    },
  ];

  const [delivered, setDelivered] = useState(false);

  const weekColors = ['#3B82F6', '#2563EB', '#7C3AED', '#059669'];

  return (
    <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-[#1D4ED8] to-[#3B82F6] px-4 py-2.5">
        <h3 className="text-white font-semibold text-[15px]">📅 行动计划下发</h3>
      </div>

      <div className="p-3 space-y-2.5 max-h-[450px] overflow-y-auto">
        {/* Plan Header */}
        <div className="bg-gradient-to-r from-[#EFF6FF] to-[#DBEAFE] rounded-[12px] p-2.5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[12px] font-bold text-[#1E3A8A]">{planTitle}</p>
              <p className="text-[10px] text-[#3B82F6] mt-0.5">对象: {agentName}</p>
            </div>
            {delivered && (
              <span className="px-2 py-0.5 bg-[#059669] text-white rounded text-[9px] font-medium">
                已下发
              </span>
            )}
          </div>
        </div>

        {/* Week Plans */}
        <div className="space-y-1.5">
          {weekPlans.map((wp, i) => (
            <div
              key={i}
              className="rounded-[10px] border p-2.5"
              style={{ borderColor: `${weekColors[i]}20` }}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span
                  className="px-2 py-0.5 rounded text-[10px] font-bold text-white"
                  style={{ background: weekColors[i] }}
                >
                  {wp.week}
                </span>
              </div>
              <div className="space-y-1 ml-1">
                {wp.tasks.map((task, j) => (
                  <div key={j} className="flex items-start gap-1.5">
                    <span className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ background: weekColors[i] }} />
                    <span className="text-[10px] text-[#555]">{task}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Delivery Button */}
        {!delivered ? (
          <div className="flex justify-center pt-1">
            <button
              onClick={() => setDelivered(true)}
              className="px-6 py-2 rounded-full text-[12px] font-medium text-white transition-all shimmer-on-hover"
              style={{ background: 'linear-gradient(135deg, #3B82F6, #1D4ED8)' }}
            >
              ✅ 确认下发计划给{agentName}
            </button>
          </div>
        ) : (
          <div className="bg-gradient-to-r from-[#DCFCE7] to-[#F0FDF4] rounded-[12px] p-2.5 text-center">
            <p className="text-[11px] text-[#059669] font-medium">
              ✅ 计划已成功下发给{agentName}
            </p>
            <p className="text-[10px] text-[#047857] mt-0.5">
              系统将自动追踪执行进度并在检查节点提醒您
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
