import { useState } from 'react';

interface FieldMaterialsCardProps {
  data: Record<string, unknown>;
}

interface MaterialItem {
  icon: string;
  title: string;
  description: string;
  fileType?: string;
  detailContent?: string;
  imageUrl?: string;
}

interface MaterialsData {
  materials: MaterialItem[];
  summary?: string;
}

function MaterialItemCard({ m, index }: { m: MaterialItem; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-[12px] border border-teal-100 overflow-hidden">
      <div
        className="flex items-start gap-2.5 bg-teal-50 px-2.5 py-2.5 cursor-pointer hover:bg-teal-100/60 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="w-8 h-8 rounded-[8px] bg-teal-100 flex items-center justify-center flex-shrink-0">
          <span className="text-[16px]">{m.icon}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-semibold text-[#0D9488]">{m.title}</span>
            {m.fileType && (
              <span className="px-1.5 py-0.5 rounded text-[7px] font-medium text-teal-600 bg-teal-100 border border-teal-200">
                {m.fileType}
              </span>
            )}
          </div>
          <div className="text-[9px] text-[#666] mt-0.5 leading-[1.5]">{m.description}</div>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0 mt-0.5">
          <div className="w-5 h-5 rounded-full bg-teal-200 flex items-center justify-center">
            <span className="text-[9px] font-bold text-teal-700">{index + 1}</span>
          </div>
          <span className="text-[10px] text-teal-500 transition-transform" style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
        </div>
      </div>

      {expanded && m.detailContent && (
        <div className="px-3 py-2.5 bg-white border-t border-teal-100">
          {m.imageUrl && (
            <div className="mb-2 rounded-[8px] overflow-hidden border border-gray-100">
              <img src={m.imageUrl} alt={m.title} className="w-full h-[120px] object-cover" loading="lazy" />
            </div>
          )}
          <div className="text-[9.5px] text-[#333] leading-[1.7] whitespace-pre-wrap">{m.detailContent}</div>
        </div>
      )}
    </div>
  );
}

export function FieldMaterialsCard({ data }: FieldMaterialsCardProps) {
  const d = (data as unknown as MaterialsData) || {
    materials: [],
    summary: '',
  };

  return (
    <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-[#0D9488] to-[#06B6D4] px-4 py-2.5">
        <h3 className="text-white font-semibold text-[15px]">📁 讲解素材生成</h3>
      </div>
      <div className="p-3 space-y-2.5 max-h-[450px] overflow-y-auto">
        {/* Summary */}
        {d.summary && (
          <div className="text-[10px] text-[#666] bg-gray-50 rounded-[10px] px-2.5 py-2 flex items-center gap-1.5">
            <span className="text-[11px]">💡</span>
            {d.summary}
            <span className="text-[8px] text-teal-500 ml-auto">点击展开查看</span>
          </div>
        )}

        {/* Material items */}
        <div className="space-y-1.5">
          {d.materials.map((m, i) => (
            <MaterialItemCard key={i} m={m} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
