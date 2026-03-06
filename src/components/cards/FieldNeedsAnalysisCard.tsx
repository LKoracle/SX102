interface FieldNeedsAnalysisCardProps {
  data: Record<string, unknown>;
}

interface NeedItem {
  label: string;
  detail: string;
}

interface NeedsData {
  customerName?: string;
  coreNeeds: NeedItem[];
  secondaryNeeds: NeedItem[];
  urgency: number;
  urgencyNote?: string;
}

const coreIcons = ['🏥', '🛡️', '💊', '❤️'];
const secondaryIcons = ['🎓', '💎', '📈', '🏦'];

export function FieldNeedsAnalysisCard({ data }: FieldNeedsAnalysisCardProps) {
  const d = (data as unknown as NeedsData) || {
    coreNeeds: [],
    secondaryNeeds: [],
    urgency: 4,
    urgencyNote: '',
  };

  const maxUrgency = 5;

  return (
    <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-[#DC2626] to-[#F43F5E] px-4 py-2.5">
        <h3 className="text-white font-semibold text-[15px]">📋 {d.customerName ? `${d.customerName}需求深度解析` : '需求深度解析'}</h3>
      </div>
      <div className="p-3 space-y-2.5 max-h-[450px] overflow-y-auto">
        {/* Core needs */}
        <div>
          <div className="flex items-center gap-1.5 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <span className="text-[11px] font-bold text-[#DC2626]">核心需求</span>
          </div>
          <div className="space-y-1">
            {d.coreNeeds.map((n, i) => (
              <div key={i} className="flex items-start gap-2 rounded-[10px] bg-red-50 px-2.5 py-2">
                <span className="text-[13px]">{coreIcons[i % coreIcons.length]}</span>
                <div className="flex-1">
                  <div className="text-[10px] font-semibold text-[#DC2626]">{n.label}</div>
                  <div className="text-[9px] text-[#666] mt-0.5">{n.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Secondary needs */}
        <div>
          <div className="flex items-center gap-1.5 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span className="text-[11px] font-bold text-[#D97706]">次要需求</span>
          </div>
          <div className="space-y-1">
            {d.secondaryNeeds.map((n, i) => (
              <div key={i} className="flex items-start gap-2 rounded-[10px] bg-amber-50 px-2.5 py-2">
                <span className="text-[13px]">{secondaryIcons[i % secondaryIcons.length]}</span>
                <div className="flex-1">
                  <div className="text-[10px] font-semibold text-[#D97706]">{n.label}</div>
                  <div className="text-[9px] text-[#666] mt-0.5">{n.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Urgency */}
        <div className="bg-gradient-to-r from-[#FEF2F2] to-[#FEE2E2] rounded-[14px] p-2.5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-semibold text-[#DC2626]">⚡ 紧迫程度</span>
            <div className="flex gap-0.5">
              {Array.from({ length: maxUrgency }).map((_, i) => (
                <span key={i} className="text-[12px]">{i < d.urgency ? '⭐' : '☆'}</span>
              ))}
            </div>
          </div>
          {d.urgencyNote && (
            <p className="text-[9px] text-[#DC2626] mt-1 leading-[1.5]">{d.urgencyNote}</p>
          )}
        </div>
      </div>
    </div>
  );
}
