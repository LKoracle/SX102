import { useState } from 'react';

interface CaseVideoCardProps {
  data: Record<string, unknown>;
}

interface CoverOption {
  id: string;
  gradient: string;
  icon: string;
  accent: string;
  subtitle: string;
}

export function CaseVideoCard({ data: _data }: CaseVideoCardProps) {
  const [activeCover, setActiveCover] = useState(0);
  const [activeTitle, setActiveTitle] = useState(0);

  const covers: CoverOption[] = [
    { id: 'professional', gradient: 'linear-gradient(135deg, #0F172A 0%, #1E3A5F 50%, #0284C7 100%)', icon: '💼', accent: '#38BDF8', subtitle: '专业商务风' },
    { id: 'warm', gradient: 'linear-gradient(135deg, #FDE68A 0%, #F59E0B 50%, #D97706 100%)', icon: '🌟', accent: '#92400E', subtitle: '温暖励志风' },
    { id: 'modern', gradient: 'linear-gradient(135deg, #7C3AED 0%, #4F46E5 50%, #3B82F6 100%)', icon: '🚀', accent: '#C4B5FD', subtitle: '现代科技风' },
  ];

  const titles = [
    '一年期业绩高增长｜专业服务型保险代理人',
    '从客服转行保险，她如何用服务思维实现业绩逆袭？',
    '曲潇：把每次服务做成复利的保险新星',
  ];

  const cover = covers[activeCover];

  return (
    <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-[#0284C7] to-[#0369A1] px-4 py-2.5 flex items-center justify-between">
        <h3 className="text-white font-semibold text-[15px]">🎬 宣导视频生成</h3>
        <span className="px-2 py-0.5 bg-white/20 rounded-full text-[10px] text-white">
          ✅ 已生成
        </span>
      </div>

      <div className="p-3 space-y-3 max-h-[520px] overflow-y-auto">
        {/* Video cover preview */}
        <div
          className="rounded-[16px] overflow-hidden relative"
          style={{ background: cover.gradient, aspectRatio: '16/9' }}
        >
          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
              <svg className="w-6 h-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>

          {/* Cover content */}
          <div className="absolute inset-0 p-4 flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <span className="px-2 py-0.5 bg-white/20 backdrop-blur-sm rounded-full text-[9px] text-white border border-white/20">
                典范案例
              </span>
              <span className="text-2xl">{cover.icon}</span>
            </div>

            <div className="space-y-1.5">
              {/* Avatar */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-[12px] font-bold border border-white/30">
                  曲
                </div>
                <div>
                  <p className="text-white text-[12px] font-bold">曲潇</p>
                  <p className="text-white/70 text-[9px]">资深代理人 · 华南地区</p>
                </div>
              </div>

              {/* Title on cover */}
              <p className="text-white text-[13px] font-bold leading-snug drop-shadow-md">
                {titles[activeTitle]}
              </p>

              {/* Duration */}
              <div className="flex items-center gap-3">
                <span className="text-white/60 text-[9px]">03:28</span>
                <div className="flex-1 h-0.5 bg-white/20 rounded-full">
                  <div className="w-0 h-full bg-white rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Switch cover style */}
        <div className="space-y-1.5">
          <p className="text-[11px] font-medium text-[#666] px-1">🎨 切换封面风格</p>
          <div className="flex gap-2">
            {covers.map((c, i) => (
              <button
                key={c.id}
                onClick={() => setActiveCover(i)}
                className="flex-1 rounded-[10px] overflow-hidden border-2 transition-all"
                style={{
                  borderColor: activeCover === i ? '#0284C7' : '#E5E7EB',
                }}
              >
                <div className="h-10" style={{ background: c.gradient }} />
                <div className="px-1.5 py-1 bg-white">
                  <p className="text-[9px] text-center text-[#666]">{c.subtitle}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Switch title */}
        <div className="space-y-1.5">
          <p className="text-[11px] font-medium text-[#666] px-1">📝 切换视频标题</p>
          <div className="space-y-1.5">
            {titles.map((t, i) => (
              <button
                key={i}
                onClick={() => setActiveTitle(i)}
                className="w-full text-left px-3 py-2 rounded-[10px] border-2 transition-all text-[11px]"
                style={{
                  borderColor: activeTitle === i ? '#0284C7' : '#F3F4F6',
                  background: activeTitle === i ? '#F0F9FF' : '#FAFAFA',
                  color: activeTitle === i ? '#0284C7' : '#666',
                  fontWeight: activeTitle === i ? 600 : 400,
                }}
              >
                {i === activeTitle && <span className="mr-1">✓</span>}
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Video info */}
        <div className="bg-gradient-to-r from-[#F0F9FF] to-[#E0F2FE] rounded-[12px] p-2.5 space-y-1">
          <p className="text-[10px] font-medium text-[#0284C7]">🎬 视频信息</p>
          <div className="flex gap-3">
            <span className="text-[9px] text-[#0369A1]">时长: 3分28秒</span>
            <span className="text-[9px] text-[#0369A1]">分辨率: 1080p</span>
            <span className="text-[9px] text-[#0369A1]">格式: MP4</span>
          </div>
        </div>
      </div>
    </div>
  );
}
