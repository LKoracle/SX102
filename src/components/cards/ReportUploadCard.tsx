import { useState } from 'react';

interface ReportUploadCardProps {
  data: Record<string, unknown>;
}

export function ReportUploadCard({ data: _data }: ReportUploadCardProps) {
  const [authorized, setAuthorized] = useState(false);
  const [uploads, setUploads] = useState<string[]>([]);

  const sources = [
    { id: 'image', icon: '🖼️', label: '图片', desc: '上传截图/图表', color: '#3B82F6' },
    { id: 'ppt', icon: '📊', label: 'PPT', desc: '上传演示文稿', color: '#7C3AED' },
    { id: 'email', icon: '📧', label: '邮件', desc: '导入邮件数据', color: '#059669' },
  ];

  const toggleUpload = (id: string) => {
    setUploads((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-[#3B82F6] to-[#6366F1] px-4 py-2.5">
        <h3 className="text-white font-semibold text-[15px]">📋 报告素材上传</h3>
      </div>

      <div className="p-3 space-y-3 max-h-[450px] overflow-y-auto">
        {/* Upload sources */}
        <div className="space-y-2">
          <p className="text-[11px] font-medium text-[#666] px-1">选择素材来源</p>
          {sources.map((s) => (
            <button
              key={s.id}
              onClick={() => toggleUpload(s.id)}
              className="w-full flex items-center gap-3 p-3 rounded-[14px] border-2 transition-all text-left"
              style={{
                borderColor: uploads.includes(s.id) ? s.color : '#F3F4F6',
                background: uploads.includes(s.id) ? `${s.color}08` : '#FAFAFA',
              }}
            >
              <span className="text-xl">{s.icon}</span>
              <div className="flex-1">
                <p className="text-[13px] font-medium text-[#333]">{s.label}</p>
                <p className="text-[10px] text-[#999]">{s.desc}</p>
              </div>
              <div
                className="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all"
                style={{
                  borderColor: uploads.includes(s.id) ? s.color : '#D1D5DB',
                  background: uploads.includes(s.id) ? s.color : 'transparent',
                }}
              >
                {uploads.includes(s.id) && (
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Data authorization */}
        <div className="border-t border-gray-100 pt-3">
          <p className="text-[11px] font-medium text-[#666] px-1 mb-2">数据授权</p>
          <button
            onClick={() => setAuthorized(!authorized)}
            className="w-full flex items-center gap-3 p-3 rounded-[14px] border-2 transition-all text-left"
            style={{
              borderColor: authorized ? '#DC2626' : '#F3F4F6',
              background: authorized ? '#FEF2F2' : '#FAFAFA',
            }}
          >
            <span className="text-xl">🔐</span>
            <div className="flex-1">
              <p className="text-[13px] font-medium text-[#333]">寿险业务系统</p>
              <p className="text-[10px] text-[#999]">授权读取NBEV、增员率、3转、13留等关键指标</p>
            </div>
            <span
              className="px-2 py-0.5 rounded-full text-[10px] font-medium"
              style={{
                background: authorized ? '#DCFCE7' : '#F3F4F6',
                color: authorized ? '#059669' : '#999',
              }}
            >
              {authorized ? '已授权' : '未授权'}
            </span>
          </button>
        </div>

        {/* Report config */}
        <div className="border-t border-gray-100 pt-3 space-y-2">
          <p className="text-[11px] font-medium text-[#666] px-1">汇报设置</p>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-[#F8FAFC] rounded-[12px] p-2.5">
              <p className="text-[10px] text-[#999] mb-1">汇报对象</p>
              <p className="text-[12px] font-medium text-[#333]">🏢 分公司总经理</p>
            </div>
            <div className="bg-[#F8FAFC] rounded-[12px] p-2.5">
              <p className="text-[10px] text-[#999] mb-1">风格偏好</p>
              <p className="text-[12px] font-medium text-[#333]">📈 数据驱动型</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#EFF6FF] to-[#DBEAFE] rounded-[12px] p-2.5">
          <p className="text-[10px] text-[#1D4ED8]">💡 上传素材或授权数据后，AI将自动挖掘关联分析并生成报告</p>
        </div>
      </div>
    </div>
  );
}
