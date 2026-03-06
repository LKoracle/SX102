interface FieldSalesScriptCardProps {
  data: Record<string, unknown>;
}

interface ScriptData {
  scriptText: string;
  designPoints?: string[];
  tone?: string;
}

export function FieldSalesScriptCard({ data }: FieldSalesScriptCardProps) {
  const d = (data as unknown as ScriptData) || { scriptText: '', designPoints: [] };

  return (
    <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-[#059669] to-[#34D399] px-4 py-2.5">
        <h3 className="text-white font-semibold text-[15px]">🎯 精准话术推荐</h3>
      </div>
      <div className="p-3 space-y-2.5 max-h-[450px] overflow-y-auto">
        {d.tone && (
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-[#999]">语气风格：</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-[10px] font-medium text-[#059669] border border-emerald-200">
              {d.tone}
            </span>
          </div>
        )}

        <div className="bg-emerald-50 rounded-[14px] p-3 border-l-[3px] border-[#10B981]">
          <p className="text-[11px] text-[#333] leading-[1.7] whitespace-pre-wrap">{d.scriptText}</p>
        </div>

        {d.designPoints && d.designPoints.length > 0 && (
          <div className="bg-gradient-to-r from-[#ECFDF5] to-[#D1FAE5] rounded-[14px] p-2.5">
            <div className="text-[10px] font-semibold text-[#059669] mb-1.5">💡 话术设计要点</div>
            {d.designPoints.map((p, i) => (
              <div key={i} className="flex items-start gap-1.5 mb-1">
                <span className="w-3.5 h-3.5 rounded-full bg-green-200 text-[8px] text-green-700 flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                <span className="text-[9px] text-[#059669] leading-[1.5]">{p}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
