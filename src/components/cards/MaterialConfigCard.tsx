import { useState, useEffect } from 'react';

interface MaterialConfigCardProps {
  data: Record<string, unknown>;
}

export function MaterialConfigCard({ data: _data }: MaterialConfigCardProps) {
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!generating) return;
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(timer); return 100; }
        return p + 4;
      });
    }, 120);
    return () => clearInterval(timer);
  }, [generating]);

  return (
    <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-[#7C3AED] to-[#9333EA] px-4 py-2.5">
        <h3 className="text-white font-semibold text-[15px]">🎨 营销素材配置</h3>
      </div>

      <div className="p-3 space-y-3 max-h-[450px] overflow-y-auto">
        {/* Activity goal */}
        <div className="space-y-1.5">
          <p className="text-[11px] font-medium text-[#666] px-1">活动目标</p>
          <div className="bg-[#F8FAFC] rounded-[14px] p-3 border border-[#EDE9FE]">
            <div className="flex items-center gap-2">
              <span className="text-lg">🏕️</span>
              <div>
                <p className="text-[13px] font-bold text-[#333]">深圳亲子自然研学</p>
                <p className="text-[10px] text-[#999]">户外亲子活动 · 自然教育体验</p>
              </div>
            </div>
          </div>
        </div>

        {/* Audience */}
        <div className="space-y-1.5">
          <p className="text-[11px] font-medium text-[#666] px-1">人群画像</p>
          <div className="bg-[#F8FAFC] rounded-[14px] p-3 border border-[#EDE9FE]">
            <div className="flex items-center gap-2">
              <span className="text-lg">👨‍👩‍👧</span>
              <div>
                <p className="text-[13px] font-bold text-[#333]">三口之家</p>
                <p className="text-[10px] text-[#999]">有学龄儿童的家庭客户群</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {['25-45岁父母', '有1-2个孩子', '关注教育', '注重家庭保障'].map((tag) => (
                <span key={tag} className="px-2 py-0.5 bg-[#EDE9FE] text-[#7C3AED] rounded-full text-[9px]">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Product */}
        <div className="space-y-1.5">
          <p className="text-[11px] font-medium text-[#666] px-1">主推产品</p>
          <div className="bg-[#F8FAFC] rounded-[14px] p-3 border border-[#EDE9FE]">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 bg-gradient-to-br from-[#DC2626] to-[#B91C1C] rounded-lg flex items-center justify-center text-white text-[10px] font-bold">平安</span>
              <div>
                <p className="text-[13px] font-bold text-[#333]">平安「全家保」保险产品</p>
                <p className="text-[10px] text-[#999]">一张保单 · 守护全家</p>
              </div>
            </div>
          </div>
        </div>

        {/* Generate button */}
        {!generating ? (
          <button
            onClick={() => setGenerating(true)}
            className="w-full py-3 rounded-[14px] text-white font-semibold text-[14px] transition-all active:scale-[0.98]"
            style={{ background: 'linear-gradient(135deg, #7C3AED, #9333EA)' }}
          >
            ✨ 一键生成全套素材
          </button>
        ) : (
          <div className="bg-[#F5F3FF] rounded-[14px] p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-[#7C3AED]">
                {progress < 100 ? '🤖 AI正在生成...' : '✅ 生成完成！'}
              </span>
              <span className="text-[11px] font-bold text-[#7C3AED]">{Math.min(progress, 100)}%</span>
            </div>
            <div className="h-2 bg-[#EDE9FE] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${Math.min(progress, 100)}%`,
                  background: 'linear-gradient(90deg, #7C3AED, #9333EA)',
                }}
              />
            </div>
            <div className="space-y-1">
              {[
                { label: '活动海报', done: progress > 20 },
                { label: '客户邀请函', done: progress > 40 },
                { label: '代理人宣导话术', done: progress > 55 },
                { label: '完整课件', done: progress > 70 },
                { label: '朋友圈文案', done: progress > 85 },
                { label: '合规校验', done: progress >= 100 },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <span className="text-[11px]">{item.done ? '✅' : '⏳'}</span>
                  <span className={`text-[10px] ${item.done ? 'text-[#059669]' : 'text-[#999]'}`}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-gradient-to-r from-[#F5F3FF] to-[#EDE9FE] rounded-[12px] p-2.5">
          <p className="text-[10px] text-[#7C3AED]">💡 基于多模态大模型与行业专属知识库，自动理解业务意图生成全套素材</p>
        </div>
      </div>
    </div>
  );
}
