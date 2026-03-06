import { useState } from 'react';

interface CaseSearchCardProps {
  data: Record<string, unknown>;
}

interface TagOption {
  label: string;
  value: string;
  selected: boolean;
}

interface TagGroup {
  name: string;
  icon: string;
  options: TagOption[];
}

export function CaseSearchCard({ data: _data }: CaseSearchCardProps) {
  const [matching, setMatching] = useState(false);

  const intent = '快速成长型1年期代理人';

  const tagGroups: TagGroup[] = [
    { name: '年龄', icon: '🎂', options: [
      { label: '20-30', value: '20-30', selected: false },
      { label: '30-40', value: '30-40', selected: true },
      { label: '40-50', value: '40-50', selected: false },
    ]},
    { name: '性别', icon: '👤', options: [
      { label: '男', value: 'M', selected: false },
      { label: '女', value: 'F', selected: true },
    ]},
    { name: '年限', icon: '📅', options: [
      { label: '0-1年', value: '0-1', selected: false },
      { label: '1-2年', value: '1-2', selected: true },
      { label: '2-5年', value: '2-5', selected: false },
    ]},
    { name: '月业绩增长', icon: '📈', options: [
      { label: '3%以上', value: '3+', selected: false },
      { label: '5%以上', value: '5+', selected: true },
      { label: '10%以上', value: '10+', selected: false },
    ]},
    { name: '佣金', icon: '💰', options: [
      { label: '5千-1万', value: '5k-1w', selected: false },
      { label: '1万-2万', value: '1w-2w', selected: true },
      { label: '2万以上', value: '2w+', selected: false },
    ]},
    { name: '地区', icon: '📍', options: [
      { label: '华东', value: 'east', selected: false },
      { label: '华南', value: 'south', selected: true },
      { label: '华北', value: 'north', selected: false },
      { label: '华西', value: 'west', selected: false },
    ]},
  ];

  return (
    <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-[#059669] to-[#047857] px-4 py-2.5">
        <h3 className="text-white font-semibold text-[15px]">🔍 典范案例挖掘</h3>
      </div>

      <div className="p-3 space-y-3 max-h-[500px] overflow-y-auto">
        {/* Intent input */}
        <div className="space-y-1.5">
          <p className="text-[11px] font-medium text-[#666] px-1">案例需求意图</p>
          <div className="bg-[#F0FDF4] rounded-[14px] p-3 border-2 border-[#059669]/30">
            <div className="flex items-center gap-2">
              <span className="text-lg">🎯</span>
              <p className="text-[13px] font-bold text-[#059669]">{intent}</p>
            </div>
          </div>
        </div>

        {/* Tag filters */}
        <div className="space-y-2">
          <p className="text-[11px] font-medium text-[#666] px-1">筛选标签</p>
          {tagGroups.map((group) => (
            <div key={group.name} className="flex items-start gap-2">
              <span className="text-[11px] text-[#999] mt-1 w-16 shrink-0 flex items-center gap-1">
                <span className="text-xs">{group.icon}</span>{group.name}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {group.options.map((opt) => (
                  <span
                    key={opt.value}
                    className="px-2.5 py-1 rounded-full text-[10px] font-medium border transition-all cursor-default"
                    style={{
                      background: opt.selected ? '#059669' : 'white',
                      color: opt.selected ? 'white' : '#666',
                      borderColor: opt.selected ? '#059669' : '#E5E7EB',
                    }}
                  >
                    {opt.label}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Selected summary */}
        <div className="bg-[#F0FDF4] rounded-[12px] p-2.5">
          <p className="text-[10px] text-[#059669]">
            🏷️ 已选：30-40岁 · 女 · 1-2年 · 月增长5%+ · 佣金1-2万 · 华南地区
          </p>
        </div>

        {/* Match button */}
        {!matching ? (
          <button
            onClick={() => setMatching(true)}
            className="w-full py-3 rounded-[14px] text-white font-semibold text-[14px] transition-all active:scale-[0.98]"
            style={{ background: 'linear-gradient(135deg, #059669, #047857)' }}
          >
            🔍 开始匹配
          </button>
        ) : (
          <div className="bg-[#F0FDF4] rounded-[14px] p-3 flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-[#059669] border-t-transparent rounded-full animate-spin" />
            <span className="text-[12px] text-[#059669] font-medium">正在从数据库中挖掘匹配案例...</span>
          </div>
        )}
      </div>
    </div>
  );
}
