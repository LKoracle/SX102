import { useState } from 'react';

interface MaterialDistributeCardProps {
  data: Record<string, unknown>;
}

export function MaterialDistributeCard({ data: _data }: MaterialDistributeCardProps) {
  const [activeTab, setActiveTab] = useState<'wechat' | 'xiaohongshu'>('wechat');
  const [pushed, setPushed] = useState(false);

  const platforms = [
    { id: 'wechat' as const, icon: '💬', label: '微信', color: '#07C160' },
    { id: 'xiaohongshu' as const, icon: '📕', label: '小红书', color: '#FF2442' },
  ];

  const content = {
    wechat: {
      style: '私域信任表达',
      title: '🌿 周末亲子好去处 | 深圳梧桐山自然研学',
      body: '亲爱的家长朋友：\n\n春暖花开的季节，带孩子来一场说走就走的自然探索吧！\n\n我们精心筹备了这次亲子研学活动，在专业自然导师陪伴下，孩子们将亲手制作昆虫标本、记录自然笔记，在玩中学、学中乐。\n\n👨‍👩‍👧 适合3-12岁孩子的家庭\n📍 深圳梧桐山自然教育基地\n🛡️ 平安「全家保」全程守护\n\n名额有限，长按识别二维码报名 ⬇️',
      features: ['竖版海报 · 9:16比例', '暖色调 · 信任感', '长按识别二维码', '分享友好设计'],
    },
    xiaohongshu: {
      style: '标题吸引力 + 话题标签',
      title: '🔥 深圳遛娃天花板！梧桐山亲子研学太绝了‼️',
      body: '姐妹们！这个周末的亲子活动也太棒了吧‼️\n\n带娃去了深圳梧桐山的自然研学活动\n直接被种草了！！！\n\n✅ 娃亲手做了昆虫标本超有成就感\n✅ 自然笔记课太治愈了\n✅ 还有家庭野餐环节超出片📷\n✅ 全程有平安「全家保」保障 安心！\n\n30组家庭限额 手慢无哦~\n\n#深圳遛娃 #亲子研学 #梧桐山 #周末去哪儿 #自然教育 #深圳亲子活动 #平安全家保',
      features: ['方形封面 · 1:1比例', '高饱和色彩 · 吸引力', '话题标签优化', '标题党风格'],
    },
  };

  const active = content[activeTab];

  return (
    <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-[#7C3AED] to-[#9333EA] px-4 py-2.5">
        <h3 className="text-white font-semibold text-[15px]">🚀 跨平台智能分发</h3>
      </div>

      <div className="p-3 space-y-3 max-h-[520px] overflow-y-auto">
        {/* Platform tabs */}
        <div className="flex gap-2">
          {platforms.map((p) => (
            <button
              key={p.id}
              onClick={() => setActiveTab(p.id)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-[12px] border-2 transition-all"
              style={{
                borderColor: activeTab === p.id ? p.color : '#F3F4F6',
                background: activeTab === p.id ? `${p.color}10` : '#FAFAFA',
              }}
            >
              <span className="text-lg">{p.icon}</span>
              <span className="text-[12px] font-semibold" style={{ color: activeTab === p.id ? p.color : '#999' }}>
                {p.label}版
              </span>
            </button>
          ))}
        </div>

        {/* Style badge */}
        <div className="flex items-center gap-2 px-1">
          <span
            className="px-2.5 py-1 rounded-full text-[10px] font-medium text-white"
            style={{ background: activeTab === 'wechat' ? '#07C160' : '#FF2442' }}
          >
            {active.style}
          </span>
          <span className="text-[10px] text-[#999]">AI已自动适配平台规则</span>
        </div>

        {/* Preview */}
        <div
          className="rounded-[14px] border-2 overflow-hidden"
          style={{ borderColor: activeTab === 'wechat' ? '#07C16030' : '#FF244230' }}
        >
          {/* Simulated phone header */}
          <div
            className="px-3 py-2 flex items-center gap-2"
            style={{ background: activeTab === 'wechat' ? '#07C16015' : '#FF244215' }}
          >
            <span className="text-sm">{activeTab === 'wechat' ? '💬' : '📕'}</span>
            <span className="text-[11px] font-semibold text-[#333]">
              {activeTab === 'wechat' ? '微信公众号/朋友圈' : '小红书笔记'}
            </span>
          </div>

          <div className="p-3 space-y-2">
            <p className="text-[13px] font-bold text-[#1E293B] leading-snug">{active.title}</p>
            <pre className="text-[10px] text-[#475569] whitespace-pre-wrap font-sans leading-relaxed">
              {active.body}
            </pre>
          </div>

          {/* Image placeholder */}
          <div className="mx-3 mb-3 bg-gradient-to-br from-[#DBEAFE] to-[#E0E7FF] rounded-[10px] p-4 flex flex-col items-center gap-1">
            <span className="text-2xl">🖼️</span>
            <span className="text-[9px] text-[#6366F1]">
              {activeTab === 'wechat' ? '竖版海报 · 9:16' : '方形封面 · 1:1'}
            </span>
          </div>
        </div>

        {/* Feature tags */}
        <div className="flex flex-wrap gap-1.5 px-1">
          {active.features.map((f) => (
            <span key={f} className="px-2 py-0.5 bg-[#F1F5F9] text-[#64748B] rounded-full text-[9px]">
              ✓ {f}
            </span>
          ))}
        </div>

        {/* Push button */}
        {!pushed ? (
          <button
            onClick={() => setPushed(true)}
            className="w-full py-3 rounded-[14px] text-white font-semibold text-[14px] transition-all active:scale-[0.98]"
            style={{ background: 'linear-gradient(135deg, #7C3AED, #9333EA)' }}
          >
            📤 一键推送至代理人端
          </button>
        ) : (
          <div className="bg-[#DCFCE7] rounded-[14px] p-3 flex items-center justify-center gap-2">
            <span className="text-lg">✅</span>
            <span className="text-[13px] font-semibold text-[#059669]">已推送至128位代理人</span>
          </div>
        )}
      </div>
    </div>
  );
}
