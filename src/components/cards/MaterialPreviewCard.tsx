import { useState } from 'react';

interface MaterialPreviewCardProps {
  data: Record<string, unknown>;
}

interface MaterialItem {
  id: string;
  icon: string;
  title: string;
  desc: string;
  preview: string;
  compliance: boolean;
}

export function MaterialPreviewCard({ data: _data }: MaterialPreviewCardProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  const materials: MaterialItem[] = [
    {
      id: 'poster',
      icon: '🖼️',
      title: '活动海报',
      desc: '深圳亲子自然研学 · 主视觉海报',
      preview: '🌿 春日亲子研学季\n与孩子一起走进自然课堂\n探索生命的奇妙旅程\n\n📅 2025年3月15日 周六\n📍 深圳梧桐山自然教育基地\n👨‍👩‍👧 限30组家庭 · 名额有限\n\n平安「全家保」全程守护\n一张保单 · 呵护全家出行安全',
      compliance: true,
    },
    {
      id: 'invitation',
      icon: '💌',
      title: '客户邀请函',
      desc: '个性化客户邀请函 · 温馨风格',
      preview: '亲爱的客户：\n\n春暖花开，万物复苏。我们诚邀您和家人参加「深圳亲子自然研学」活动，在大自然中增进亲子关系，共同探索生命的美好。\n\n活动亮点：\n🌱 自然生态探索课堂\n🦋 昆虫标本制作体验\n🎨 自然笔记创作\n🏕️ 家庭野餐互动\n\n期待与您全家相聚！',
      compliance: true,
    },
    {
      id: 'script',
      icon: '🎤',
      title: '代理人宣导话术',
      desc: '代理人活动推广话术指南',
      preview: '【开场】\n"王姐您好，最近天气特别好，有个特别适合咱们带孩子参加的活动想跟您分享..."\n\n【价值传递】\n"这次活动不光是玩，孩子们能在专业老师带领下认识大自然，做标本，写自然笔记，特别有意义。"\n\n【产品衔接】\n"对了，全程活动都有平安「全家保」保障覆盖，一家三口的出行安全都能放心。"\n\n【促成】\n"名额就30组家庭，特别抢手，我帮您预留一个位置？"',
      compliance: true,
    },
    {
      id: 'courseware',
      icon: '📑',
      title: '完整课件',
      desc: '活动宣讲PPT · 12页',
      preview: '📄 共12页课件内容\n\nP1: 封面 - 春日研学·与自然同行\nP2: 活动背景与理念\nP3: 课程安排与时间线\nP4-P6: 活动亮点展示\nP7: 师资团队介绍\nP8: 往期活动精彩回顾\nP9: 平安「全家保」产品介绍\nP10: 保障范围与理赔流程\nP11: 报名方式与优惠\nP12: 联系方式与二维码',
      compliance: true,
    },
    {
      id: 'moments',
      icon: '📱',
      title: '朋友圈文案',
      desc: '3条差异化朋友圈文案',
      preview: '【文案一 · 预热版】\n🌿 周末不宅家，带娃去探索！\n深圳梧桐山亲子研学，和孩子一起做自然笔记、制作昆虫标本🦋\n平安全家保全程守护，出行无忧✨\n限30组家庭，手慢无！评论区留言报名👇\n\n【文案二 · 情感版】\n最好的教育，是陪孩子走进大自然🌳\n这个春天，给全家一次特别的周末记忆💚\n\n【文案三 · 转化版】\n📢 福利来啦！免费亲子研学名额开抢\n✅ 自然探索课堂 ✅ 亲子互动游戏\n✅ 平安全家保超值体验\n⬇️ 扫码即可报名',
      compliance: true,
    },
  ];

  return (
    <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-[#7C3AED] to-[#9333EA] px-4 py-2.5 flex items-center justify-between">
        <h3 className="text-white font-semibold text-[15px]">✨ 素材生成完成</h3>
        <span className="px-2 py-0.5 bg-white/20 rounded-full text-[10px] text-white">
          ✅ 合规校验通过
        </span>
      </div>

      <div className="p-3 space-y-2 max-h-[500px] overflow-y-auto">
        {materials.map((m) => (
          <div key={m.id} className="rounded-[14px] border border-[#EDE9FE] overflow-hidden">
            <button
              onClick={() => setExpanded(expanded === m.id ? null : m.id)}
              className="w-full flex items-center gap-3 p-3 text-left transition-all hover:bg-[#FAFAFF]"
            >
              <span className="text-lg">{m.icon}</span>
              <div className="flex-1">
                <p className="text-[12px] font-semibold text-[#333]">{m.title}</p>
                <p className="text-[10px] text-[#999]">{m.desc}</p>
              </div>
              <div className="flex items-center gap-1.5">
                {m.compliance && (
                  <span className="px-1.5 py-0.5 bg-[#DCFCE7] text-[#059669] rounded text-[8px]">合规</span>
                )}
                <svg
                  className={`w-4 h-4 text-[#999] transition-transform ${expanded === m.id ? 'rotate-180' : ''}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>
            {expanded === m.id && (
              <div className="px-3 pb-3 animate-fade-in-up">
                <div className="bg-[#F8FAFC] rounded-[10px] p-3 border border-[#E2E8F0]">
                  <pre className="text-[10px] text-[#334155] whitespace-pre-wrap font-sans leading-relaxed">
                    {m.preview}
                  </pre>
                </div>
              </div>
            )}
          </div>
        ))}

        <div className="bg-gradient-to-r from-[#F5F3FF] to-[#EDE9FE] rounded-[12px] p-2.5">
          <p className="text-[10px] text-[#7C3AED]">💡 所有素材已通过合规审核，点击「跨平台分发」进行多平台智能适配</p>
        </div>
      </div>
    </div>
  );
}
