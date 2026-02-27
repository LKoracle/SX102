import { teamMembers } from '../../data/team';

interface TopicItem {
  id: string;
  label: string;
  desc?: string;
}

interface CoachingGuidanceCardProps {
  data: Record<string, unknown>;
}

export function CoachingGuidanceCard({ data }: CoachingGuidanceCardProps) {
  // 判断是哪种显示模式
  const displayMode = Object.keys(data)[0]; // 优先取第一个关键字作为模式

  // 模式1: 面谈主题选择器
  if (data.topics !== undefined) {
    const topics = (data.topics as TopicItem[]) || [];
    return (
      <div className="bg-white rounded-[20px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-[#EC4899] to-[#F59E0B] px-4 py-2.5">
          <h3 className="text-white font-semibold text-[15px]">🎯 请选择面谈主题</h3>
        </div>

        <div className="p-3 space-y-2">
          {topics.map((topic: TopicItem) => (
            <div
              key={topic.id}
              className="border border-gray-200 rounded-[14px] p-2.5 cursor-pointer hover:border-[#EC4899]/50 hover:bg-gradient-to-r hover:from-[#FDF2F8] hover:to-transparent transition-all"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[16px]">{topic.label.split(' ')[0]}</span>
                <p className="text-[13px] font-semibold text-[#333]">{topic.label.split(' ').slice(1).join(' ')}</p>
              </div>
              <p className="text-[11px] text-[#999] ml-6">{topic.desc}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 模式2: 收入分析
  if (data.currentIncome !== undefined) {
    const memberId = data.memberId as string;
    const currentIncome = data.currentIncome as number;
    const targetIncome = data.targetIncome as number;
    const gap = data.gap as number;
    const sources = (data.sources as any[]) || [];
    const improvements = (data.improvements as string[]) || [];

    const gapRate = ((gap / targetIncome) * 100).toFixed(1);

    return (
      <div className="bg-white rounded-[20px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-[#0891B2] to-[#0EA5E9] px-4 py-2.5">
          <h3 className="text-white font-semibold text-[15px]">📊 收入分析详情</h3>
        </div>

        <div className="p-3 space-y-3">
          {/* 收入概览 */}
          <div className="bg-gradient-to-r from-[#E0F7FA] to-[#E0F2FE] rounded-[14px] p-3">
            <div className="grid grid-cols-3 gap-2 mb-3">
              <div className="bg-white/70 rounded-[10px] p-2 text-center">
                <p className="text-[10px] text-[#666] mb-1">已实现</p>
                <p className="text-[14px] font-bold text-[#0891B2]">¥{(currentIncome / 10000).toFixed(1)}万</p>
              </div>
              <div className="bg-white/70 rounded-[10px] p-2 text-center">
                <p className="text-[10px] text-[#666] mb-1">目标</p>
                <p className="text-[14px] font-bold text-[#0EA5E9]">¥{(targetIncome / 10000).toFixed(1)}万</p>
              </div>
              <div className="bg-white/70 rounded-[10px] p-2 text-center">
                <p className="text-[10px] text-[#666] mb-1">缺口</p>
                <p className="text-[14px] font-bold text-[#DC2626]">¥{(gap / 10000).toFixed(1)}万</p>
              </div>
            </div>

            {/* 进度条 */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-medium text-[#0c4a6e]">本月进度</span>
                <span className="text-[12px] font-bold text-[#DC2626]">{100 - parseInt(gapRate)}%</span>
              </div>
              <div className="h-2.5 bg-white/50 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${Math.max(100 - parseInt(gapRate), 2)}%`,
                    background: 'linear-gradient(90deg, #0891B2, #0EA5E9)',
                  }}
                />
              </div>
            </div>
          </div>

          {/* 收入来源分析 */}
          {sources.length > 0 && (
            <div className="space-y-2">
              <p className="text-[12px] font-medium text-[#333]">💰 收入来源分析</p>
              {sources.map((source: any, i: number) => {
                const sourceGap = source.gap;
                const sourcePercentage = ((source.current / source.gap) * 100).toFixed(0);
                return (
                  <div key={i} className="border border-gray-100 rounded-[10px] p-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[12px] font-medium text-[#333]">{source.source}</span>
                      <span className="text-[11px] text-[#666]">
                        {sourcePercentage}% <span className="text-[10px]">({source.current}/{sourceGap})</span>
                      </span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${Math.min(parseInt(sourcePercentage), 100)}%`,
                          background: 'linear-gradient(90deg, #0891B288, #0EA5E9)',
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* 改善建议 */}
          {improvements.length > 0 && (
            <div className="bg-gradient-to-r from-[#FEF3C7] to-[#FECACA] rounded-[12px] p-2.5">
              <p className="text-[12px] font-medium text-[#92400E] mb-1.5">🎯 改善建议</p>
              <ul className="space-y-1">
                {improvements.map((imp: string, i: number) => (
                  <li key={i} className="text-[11px] text-[#92400E] flex items-start gap-1.5">
                    <span className="flex-shrink-0">→</span>
                    <span>{imp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  }

  // 模式3: 达成路径
  if (data.strategies !== undefined) {
    const goal = data.goal as string;
    const strategies = (data.strategies as any[]) || [];
    const timeline = data.estimatedTimeline as string;

    return (
      <div className="bg-white rounded-[20px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-[#1D4ED8] to-[#2563EB] px-4 py-2.5">
          <h3 className="text-white font-semibold text-[15px]">🚀 达成路径</h3>
        </div>

        <div className="p-3 space-y-3">
          {/* 目标 */}
          <div className="bg-gradient-to-r from-[#DBE9FF] to-[#DBEAFE] rounded-[14px] p-2.5 border-l-4 border-[#2563EB]">
            <p className="text-[12px] font-medium text-[#1D4ED8] mb-0.5">目标</p>
            <p className="text-[13px] font-bold text-[#1D4ED8]">{goal}</p>
            <p className="text-[11px] text-[#1E40AF] mt-1">预计周期：{timeline}</p>
          </div>

          {/* 行动步骤 */}
          <div className="space-y-2">
            <p className="text-[12px] font-medium text-[#333]">📍 行动步骤</p>
            {strategies.map((strategy: any, i: number) => (
              <div key={i} className="relative pl-6">
                {/* 在规模的基础上，数字编号替代圆点 */}
                <div
                  className="absolute left-0 top-1 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold"
                  style={{ background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)' }}
                >
                  {strategy.step}
                </div>
                {i < strategies.length - 1 && (
                  <div className="absolute left-[9px] top-5 h-6 w-0.5 bg-gradient-to-b from-[#2563EB]/30 to-transparent"></div>
                )}

                <div className="bg-white border border-[#DBEAFE] rounded-[10px] p-2">
                  <p className="text-[12px] font-semibold text-[#333] mb-1">{strategy.action}</p>
                  <p className="text-[11px] text-[#666]">目标：{strategy.target}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 执行要点 */}
          <div className="bg-gradient-to-r from-[#F0FDFF] to-[#F0F4FF] rounded-[12px] p-2.5">
            <p className="text-[11px] text-[#0369A1] font-medium">💡 执行关键：将大目标分解成周目标，每周进行一次跟进评估</p>
          </div>
        </div>
      </div>
    );
  }

  // 默认返回
  return <div className="text-center text-gray-400 py-4">内容加载中...</div>;
}
