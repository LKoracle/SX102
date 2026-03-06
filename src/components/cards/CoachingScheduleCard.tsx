interface ScheduleItem {
  date: string;
  member: string;
  topic: string;
}

interface CoachingScheduleCardProps {
  data: Record<string, unknown>;
}

export function CoachingScheduleCard({ data }: CoachingScheduleCardProps) {
  const schedule = (data.schedule as ScheduleItem[]) || [];

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
    return `${month}/${day} (周${weekDays[date.getDay()]})`;
  };

  // 按日期排序
  const sortedSchedule = [...schedule].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // 计算日期位置，支持时间线布局
  const getMemberInitial = (memberId: string) => {
    const firstChars: Record<string, string> = {
      't1': '李', 't2': '小', 't3': '小', 't4': '小',
      't5': '小', 't6': '小', 't7': '小',
    };
    return firstChars[memberId] || '?';
  };

  return (
    <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8] px-4 py-2.5">
        <h3 className="text-white font-semibold text-[15px]">📅 整月面谈日程表</h3>
      </div>

      <div className="p-3 space-y-3">
        {/* 日程列表 */}
        <div className="space-y-2">
          {sortedSchedule.length > 0 ? (
            sortedSchedule.map((item: ScheduleItem, index: number) => (
              <div key={index} className="relative">
                {/* 时间线竖线 */}
                {index < sortedSchedule.length - 1 && (
                  <div className="absolute left-[15px] top-[38px] h-8 w-0.5 bg-gradient-to-b from-[#3B82F6]/30 to-transparent"></div>
                )}

                {/* 日程项目 */}
                <div className="flex items-start gap-3 pb-2">
                  {/* 时间线圆点 */}
                  <div className="relative mt-1 z-10">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                      style={{
                        background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
                      }}
                    >
                      {getMemberInitial(item.member)}
                    </div>
                  </div>

                  {/* 日程内容 */}
                  <div className="flex-1 bg-gradient-to-r from-[#f8f9ff] to-[#f0f4ff] rounded-[12px] p-2.5">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-[13px] font-semibold text-[#333]">{formatDate(item.date)}</p>
                      <span className="px-2 py-0.5 rounded text-[10px] bg-[#DDD6FE] text-[#3B82F6] font-medium">
                        {item.topic}
                      </span>
                    </div>
                    <p className="text-[12px] text-[#666]">
                      与 <span className="font-semibold text-[#3B82F6]">
                        {['李明', '小林', '小周', '小吴', '小黄', '小杨', '新员'][
                          parseInt(item.member.replace('t', '')) - 1
                        ]}
                      </span> 进行 {item.topic} 面谈 (预期30分钟)
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-400 py-4">暂无日程安排</div>
          )}
        </div>

        {/* 统计汇总 */}
        {sortedSchedule.length > 0 && (
          <div className="bg-gradient-to-r from-[#f0f9ff] to-[#f8f4ff] rounded-[14px] p-2.5 space-y-1.5">
            <p className="text-[12px] font-medium text-[#3B82F6]">📊 本月日程统计</p>
            <div className="grid grid-cols-3 gap-2 text-[11px]">
              <div>
                <p className="text-[#666]">面谈场次</p>
                <p className="font-bold text-[14px] text-[#3B82F6]">{sortedSchedule.length}</p>
              </div>
              <div>
                <p className="text-[#666]">总耗时</p>
                <p className="font-bold text-[14px] text-[#3B82F6]">{sortedSchedule.length * 30}分钟</p>
              </div>
              <div>
                <p className="text-[#666]">参与人数</p>
                <p className="font-bold text-[14px] text-[#3B82F6]">{new Set(sortedSchedule.map((s) => s.member)).size}</p>
              </div>
            </div>
          </div>
        )}

        {/* 贴心提示 */}
        <div className="bg-gradient-to-r from-[#FEF3C7] to-[#FECACA] rounded-[12px] p-2.5 flex items-start gap-2">
          <span className="text-[16px] leading-none mt-0.5">💡</span>
          <div className="text-[11px] text-[#92400E] space-y-0.5">
            <p>• 建议在每个面谈前15分钟进行准备</p>
            <p>• 面谈后及时记录反馈和行动项</p>
          </div>
        </div>
      </div>
    </div>
  );
}
