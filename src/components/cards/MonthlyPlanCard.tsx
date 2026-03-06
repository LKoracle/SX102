interface PlanItem {
  label: string;
  icon: string;
  target: number;
  completed: number;
  unit: string;
  color: string;
}

interface MonthlyPlanCardProps {
  data: Record<string, unknown>;
}

export function MonthlyPlanCard({ data }: MonthlyPlanCardProps) {
  const plans = (data.plans as PlanItem[]) || [];
  const upgradeTarget = data.upgradeTarget as string | undefined;

  return (
    <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8] px-4 py-2.5">
        <h3 className="text-white font-semibold text-[15px]">📊 本月经营计划总览</h3>
      </div>
      <div className="p-3 space-y-3">
        {plans.map((plan, i) => {
          const rate = plan.target > 0 ? Math.round((plan.completed / plan.target) * 100) : 0;
          return (
            <div key={i}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[13px] font-medium text-[#333] flex items-center gap-1.5">
                  <span>{plan.icon}</span>
                  {plan.label}
                </span>
                <span className="text-[13px] text-[#666]">
                  <span className="font-bold" style={{ color: plan.color }}>{plan.completed}</span>
                  <span className="mx-0.5">/</span>
                  <span>{plan.target}{plan.unit}</span>
                </span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${Math.max(rate, 2)}%`,
                    background: `linear-gradient(90deg, ${plan.color}88, ${plan.color})`,
                  }}
                />
              </div>
            </div>
          );
        })}

        {upgradeTarget && (
          <div className="bg-gradient-to-r from-[#f8f0ff] to-[#f0f4ff] rounded-xl p-2.5 flex items-start gap-2">
            <span className="text-[16px] leading-none mt-0.5">🎯</span>
            <div>
              <p className="text-[13px] font-medium text-[#1D4ED8]">客户升温目标</p>
              <p className="text-[12px] text-[#666] mt-0.5">{upgradeTarget}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
