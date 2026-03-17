import { useState } from 'react';

interface InvitationData {
  recipientName?: string;
  eventName?: string;
  eventDate?: string;
  eventLocation?: string;
  eventTheme?: string;
  personalNote?: string;
  inviteCopy?: string;
  senderName?: string;
}

interface FieldInvitationCardProps {
  data: Record<string, unknown>;
}

export function FieldInvitationCard({ data }: FieldInvitationCardProps) {
  const d = (data as unknown as InvitationData) || {};
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (sent) return;
    setSent(true);
    window.dispatchEvent(new CustomEvent('invitation-send-wechat', {
      detail: {
        contactName: d.recipientName || '陈先生',
        inviteCopy: d.inviteCopy || '',
        eventName: d.eventName || '财富管理讲座活动',
        eventDate: d.eventDate || '4月15日（周六）14:00',
        eventLocation: d.eventLocation || '深圳平安金融中心18楼 精英厅',
      },
    }));
  };

  return (
    <div className="rounded-[20px] overflow-hidden shadow-sm border border-gray-100">
      {/* Top label */}
      <div className="px-4 py-2 flex items-center gap-2" style={{ background: 'linear-gradient(135deg, #1D4ED8, #7C3AED)' }}>
        <span className="text-white text-[13px] font-bold">✉️ 专属活动邀请函</span>
        <span className="ml-auto px-2 py-0.5 rounded-full text-[8px] font-bold text-[#1D4ED8]" style={{ background: '#FCD34D' }}>
          AI定制
        </span>
      </div>

      {/* Invitation card body */}
      <div
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(160deg, #FEF9EE 0%, #FFF7E6 50%, #FFF 100%)',
          border: '1px solid #F59E0B30',
        }}
      >
        {/* Decorative circles */}
        <div
          className="absolute top-[-30px] right-[-30px] w-[100px] h-[100px] rounded-full opacity-10"
          style={{ background: '#F59E0B' }}
        />
        <div
          className="absolute bottom-[-20px] left-[-20px] w-[70px] h-[70px] rounded-full opacity-10"
          style={{ background: '#7C3AED' }}
        />

        <div className="relative px-4 pt-4 pb-3">
          {/* Title */}
          <div className="text-center mb-3">
            <div
              className="inline-block px-3 py-1 rounded-full text-[10px] font-bold mb-2"
              style={{ background: 'linear-gradient(135deg, #F59E0B, #D97706)', color: '#fff' }}
            >
              诚邀您参加
            </div>
            <div className="text-[16px] font-black text-[#1a1a1a]">{d.eventName || '财富管理讲座活动'}</div>
            {d.eventTheme && <div className="text-[10px] text-[#666] mt-1">{d.eventTheme}</div>}
          </div>

          {/* Recipient */}
          <div className="text-center text-[13px] mb-3">
            <span className="text-[#666]">尊敬的 </span>
            <span className="font-bold text-[#1D4ED8]">{d.recipientName || '陈先生'}</span>
            <span className="text-[#666]"> 您好</span>
          </div>

          {/* Event details */}
          <div className="space-y-2 mb-3">
            <div className="flex items-center gap-2 bg-white/70 rounded-[10px] px-3 py-1.5">
              <span className="text-[14px]">📅</span>
              <div>
                <div className="text-[9px] text-[#999]">活动时间</div>
                <div className="text-[12px] font-semibold text-[#1a1a1a]">{d.eventDate || '4月15日（周六）14:00'}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white/70 rounded-[10px] px-3 py-1.5">
              <span className="text-[14px]">📍</span>
              <div>
                <div className="text-[9px] text-[#999]">活动地点</div>
                <div className="text-[12px] font-semibold text-[#1a1a1a]">{d.eventLocation || '深圳平安金融中心18楼 精英厅'}</div>
              </div>
            </div>
          </div>

          {/* Personal note */}
          {d.personalNote && (
            <div
              className="rounded-[10px] px-3 py-2 mb-3 text-[10px] text-[#555] leading-[1.6] italic"
              style={{ background: 'rgba(59,130,246,0.06)', borderLeft: '2px solid #3B82F6' }}
            >
              {d.personalNote}
            </div>
          )}

          {/* Sender */}
          <div className="text-right text-[10px] text-[#888] mt-2">
            — {d.senderName || '王芳'} 诚邀
          </div>
        </div>
      </div>

      {/* Invite copy section */}
      {d.inviteCopy && (
        <div className="px-3 py-2.5 bg-white border-t border-gray-100">
          <div className="text-[9px] text-[#999] font-medium mb-1.5">📋 邀约文案（可直接发送）</div>
          <div
            className="text-[10px] text-[#333] leading-[1.6] px-2 py-1.5 rounded-[10px]"
            style={{ background: '#F8FAFF', border: '1px dashed #BFDBFE' }}
          >
            {d.inviteCopy}
          </div>
        </div>
      )}

      {/* Tags */}
      <div className="px-3 py-2 bg-white flex flex-wrap gap-1">
        {['个性化定制', '结合兴趣偏好', '专属活动邀约'].map((tag, i) => (
          <span
            key={i}
            className="px-2 py-0.5 rounded-full text-[8px] font-medium"
            style={{ background: '#EFF6FF', color: '#1D4ED8' }}
          >
            ✓ {tag}
          </span>
        ))}
      </div>

      {/* Send button */}
      <div className="px-3 pb-3 pt-1 bg-white">
        <button
          onClick={handleSend}
          disabled={sent}
          style={{
            width: '100%',
            padding: '10px 0',
            borderRadius: 12,
            border: 'none',
            fontSize: 14,
            fontWeight: 700,
            cursor: sent ? 'default' : 'pointer',
            background: sent
              ? '#E2E8F0'
              : 'linear-gradient(135deg, #1D4ED8, #7C3AED)',
            color: sent ? '#94A3B8' : '#fff',
            transition: 'all 0.2s',
            letterSpacing: '0.05em',
          }}
        >
          {sent ? '✅ 已发送' : '一键发送至微信'}
        </button>
      </div>
    </div>
  );
}
