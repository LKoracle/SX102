import { useState, useEffect, useRef } from 'react';

interface ProductPlansCardProps {
  data: Record<string, unknown>;
}

interface ProductPlan {
  tag: string;
  tagColor: string;
  name: string;
  subName?: string;
  metrics: Array<{ label: string; value: string }>;
  service?: string;
  highlights?: string[];
  recommended?: boolean;
}

export function ProductPlansCard({ data }: ProductPlansCardProps) {
  const plans = data.plans as ProductPlan[] | undefined;
  const needsSummary = (data.needsSummary as string) ?? '';
  const firstItemDelay = (data.firstItemDelay as number) ?? 600;
  const itemRevealDelay = (data.itemRevealDelay as number) ?? 1200;

  const defaultPlans: ProductPlan[] = [
    {
      tag: '保财富',
      tagColor: 'bg-amber-500',
      name: '平安添盈·臻享家医',
      subName: '终身寿险',
      metrics: [
        { label: '保额', value: '80万' },
        { label: '交费期', value: '3年' },
        { label: '首年保费', value: '10万' },
        { label: '总保费', value: '30万' },
      ],
      service: '臻享家医服务',
      highlights: ['预估客户60岁时财富保障可达80万', '享臻享家医服务，守护家人健康'],
      recommended: true,
    },
    {
      tag: '保养老',
      tagColor: 'bg-blue-500',
      name: '平安御享金瑞',
      subName: '年金险',
      metrics: [
        { label: '保额', value: '180万' },
        { label: '交费期', value: '5年' },
        { label: '首年保费', value: '5万' },
        { label: '总保费', value: '25万' },
      ],
      service: '居家养老服务',
      highlights: ['60岁起每月领取养老金', '搭配万能账户灵活增值'],
      recommended: false,
    },
  ];

  const displayPlans = plans ?? defaultPlans;

  const [visibleCount, setVisibleCount] = useState(0);
  const scrollAnchorRef = useRef<HTMLDivElement>(null);

  // Progressive plan reveal
  useEffect(() => {
    if (visibleCount >= displayPlans.length) return;

    const delay = visibleCount === 0 ? firstItemDelay : itemRevealDelay;
    const timer = window.setTimeout(() => {
      setVisibleCount((prev) => prev + 1);
    }, delay);
    return () => window.clearTimeout(timer);
  }, [visibleCount, displayPlans.length, firstItemDelay, itemRevealDelay]);

  // Auto-scroll when a new plan card appears
  useEffect(() => {
    if (visibleCount > 0 && scrollAnchorRef.current) {
      const t = window.setTimeout(() => {
        scrollAnchorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 150);
      return () => window.clearTimeout(t);
    }
  }, [visibleCount]);

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 px-4 py-2.5">
        <h3 className="text-white font-semibold text-[15px]">📋 智能方案推荐</h3>
      </div>

      <div className="p-3">
        {/* Needs summary */}
        {needsSummary && (
          <div className="bg-gray-50 rounded-lg px-3 py-2 mb-3">
            <p className="text-xs text-gray-600">{needsSummary}</p>
          </div>
        )}

        {/* Plans - progressive reveal */}
        <div className="space-y-3">
          {displayPlans.map((plan, index) => {
            if (index >= visibleCount) return null;
            return (
              <div
                key={index}
                className={`rounded-lg border overflow-hidden animate-step-item-reveal ${
                  plan.recommended
                    ? 'border-indigo-200 ring-1 ring-indigo-100'
                    : 'border-gray-200'
                }`}
              >
                {/* Plan header */}
                <div className={`px-3 py-2 flex items-center justify-between ${
                  plan.recommended ? 'bg-indigo-50' : 'bg-gray-50'
                }`}>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] text-white px-1.5 py-0.5 rounded ${plan.tagColor}`}>
                      {plan.tag}
                    </span>
                    <span className="text-[13px] font-semibold text-gray-800">{plan.name}</span>
                    {plan.subName && (
                      <span className="text-[11px] text-gray-400">{plan.subName}</span>
                    )}
                  </div>
                  {plan.recommended && (
                    <span className="text-[10px] bg-indigo-500 text-white px-2 py-0.5 rounded-full">
                      优先推荐
                    </span>
                  )}
                </div>

                {/* Metrics */}
                <div className="px-3 py-2">
                  <div className="grid grid-cols-4 gap-2">
                    {plan.metrics.map((metric, i) => (
                      <div key={i} className="text-center">
                        <p className="text-[10px] text-gray-400">{metric.label}</p>
                        <p className="text-[13px] font-semibold text-gray-800">{metric.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Service */}
                {plan.service && (
                  <div className="px-3 pb-1.5">
                    <span className="text-[11px] text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-full">
                      🎁 {plan.service}
                    </span>
                  </div>
                )}

                {/* Highlights */}
                {plan.highlights && plan.highlights.length > 0 && (
                  <div className="px-3 pb-2.5">
                    {plan.highlights.map((hl, i) => (
                      <p key={i} className="text-[11px] text-gray-500 leading-relaxed">
                        • {hl}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {/* Thinking dots while plans are being revealed */}
          {visibleCount > 0 && visibleCount < displayPlans.length && (
            <div className="flex items-center gap-1.5 px-2 py-1 animate-step-item-reveal">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <span className="text-[11px] text-indigo-400 ml-1">匹配中...</span>
            </div>
          )}

          {/* Scroll anchor */}
          <div ref={scrollAnchorRef} />
        </div>
      </div>
    </div>
  );
}
