import { useState, useEffect } from 'react';

interface AICallCardProps {
  data: Record<string, unknown>;
}

export function AICallCard({ data }: AICallCardProps) {
  const agentName = (data.agentName as string) || '李平安';
  const [callState, setCallState] = useState<'ringing' | 'connected' | 'ended'>('ringing');
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setCallState('connected'), 2500);
    return () => clearTimeout(timer1);
  }, []);

  useEffect(() => {
    if (callState !== 'connected') return;
    const timer = setInterval(() => setElapsed((p) => p + 1), 1000);
    return () => clearInterval(timer);
  }, [callState]);

  const formatTime = (s: number) => {
    const min = Math.floor(s / 60);
    const sec = s % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const scripts = [
    '平安你好，我是郑晓。最近看到你这两个月的业绩数据，想找个时间和你聊聊。',
    '主要是想帮你一起分析一下原因，看看怎么调整能让业绩回升。',
    '你看明天下午3点方便吗？我们面对面谈一谈。',
  ];

  return (
    <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8] px-4 py-2.5">
        <h3 className="text-white font-semibold text-[15px]">📞 AI主管外呼</h3>
      </div>

      <div className="p-4 space-y-3 max-h-[450px] overflow-y-auto">
        {/* Call Status */}
        <div className="flex flex-col items-center py-3">
          <div className="relative mb-3">
            <div
              className="w-16 h-16 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#1D4ED8] flex items-center justify-center text-white text-[20px] font-bold"
            >
              {agentName.charAt(0)}
            </div>
            {callState === 'ringing' && (
              <>
                <div className="absolute inset-0 rounded-full border-2 border-[#3B82F6] animate-ping opacity-30" />
                <div className="absolute -inset-2 rounded-full border border-[#3B82F6] animate-pulse opacity-20" />
              </>
            )}
            {callState === 'connected' && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
            )}
          </div>

          <p className="text-[14px] font-bold text-[#1E3A8A]">{agentName}</p>
          <p className="text-[11px] text-[#64748B] mt-0.5">
            {callState === 'ringing' && '正在呼叫...'}
            {callState === 'connected' && `通话中 ${formatTime(elapsed)}`}
            {callState === 'ended' && '通话已结束'}
          </p>

          {callState === 'ringing' && (
            <div className="flex items-center gap-1 mt-2">
              <span className="w-1.5 h-1.5 bg-[#3B82F6] rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
              <span className="w-1.5 h-1.5 bg-[#3B82F6] rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
              <span className="w-1.5 h-1.5 bg-[#3B82F6] rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
            </div>
          )}
        </div>

        {/* Call Script Preview */}
        {callState === 'connected' && (
          <div className="space-y-1.5">
            <p className="text-[11px] font-medium text-[#64748B]">📝 参考话术</p>
            {scripts.map((s, i) => (
              <div key={i} className="bg-[#F8FAFC] rounded-[10px] p-2 border border-gray-100">
                <p className="text-[10px] text-[#475569] leading-relaxed">{s}</p>
              </div>
            ))}
          </div>
        )}

        {/* End Call Button */}
        {callState !== 'ended' && (
          <div className="flex justify-center pt-2">
            <button
              onClick={() => setCallState('ended')}
              className="px-6 py-2 bg-red-500 text-white rounded-full text-[12px] font-medium hover:bg-red-600 transition-colors"
            >
              📞 结束通话
            </button>
          </div>
        )}

        {callState === 'ended' && (
          <div className="bg-gradient-to-r from-[#DCFCE7] to-[#F0FDF4] rounded-[12px] p-2.5 text-center">
            <p className="text-[11px] text-[#059669] font-medium">✅ 已完成外呼提醒，已约定明天下午3点面谈</p>
          </div>
        )}
      </div>
    </div>
  );
}
