import { useState, useEffect } from 'react';

interface CaseInterviewCardProps {
  data: Record<string, unknown>;
}

export function CaseInterviewCard({ data: _data }: CaseInterviewCardProps) {
  const [phase, setPhase] = useState<'interviewing' | 'recording' | 'done'>('interviewing');
  const [timer, setTimer] = useState(0);
  const [transcriptLines, setTranscriptLines] = useState(0);

  const transcripts = [
    { speaker: 'AI', text: '曲潇你好，感谢你接受这次访谈。你入职仅一年就成为团队业绩增速最快的人，能分享一下你的心得吗？' },
    { speaker: '曲潇', text: '其实入职前两个月我没急着冲单，而是把通讯录按家庭阶段分层——新手爸妈、三明治家庭、小微老板等，先做"保单整理+家庭风险清单"切入。' },
    { speaker: 'AI', text: '你提到第3个月遇到了一个关键转折点？' },
    { speaker: '曲潇', text: '对，同学父亲住院那件事。我主动协助报案、核对等待期与免赔、一次性列了材料清单，用"进度条式同步"跟进每一步。结案后对方在家族群发了长文感谢。' },
    { speaker: 'AI', text: '后来你是怎么把服务标准化的？' },
    { speaker: '曲潇', text: '投保后30天确认归档，90天回访补齐缺口，10个月做年度保单年检。每次输出一页纸结论：保持、调整还是补齐，附上理由和下一步清单。' },
  ];

  useEffect(() => {
    if (phase !== 'interviewing') return;
    const t = setInterval(() => setTimer((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'interviewing') return;
    const delays = [0, 3000, 6000, 9000, 12000, 15000];
    const timers = delays.map((d, i) =>
      setTimeout(() => setTranscriptLines(i + 1), d)
    );
    const doneTimer = setTimeout(() => setPhase('recording'), 18000);
    return () => { timers.forEach(clearTimeout); clearTimeout(doneTimer); };
  }, [phase]);

  const formatTime = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  return (
    <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-[#0284C7] to-[#0369A1] px-4 py-2.5 flex items-center justify-between">
        <h3 className="text-white font-semibold text-[15px]">🤖 AI数字人访谈</h3>
        <div className="flex items-center gap-1.5">
          {phase === 'interviewing' && (
            <span className="flex items-center gap-1 px-2 py-0.5 bg-white/20 rounded-full">
              <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />
              <span className="text-[10px] text-white">{formatTime(timer)}</span>
            </span>
          )}
          {phase !== 'interviewing' && (
            <span className="px-2 py-0.5 bg-white/20 rounded-full text-[10px] text-white">
              访谈完成
            </span>
          )}
        </div>
      </div>

      <div className="p-3 space-y-3 max-h-[520px] overflow-y-auto">
        {/* Interview visual */}
        <div className="flex items-center justify-center gap-6 py-4">
          {/* AI Digital Person */}
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-16 h-16 bg-gradient-to-br from-[#0284C7] to-[#0369A1] rounded-full flex items-center justify-center text-white text-2xl shadow-lg">
              🤖
            </div>
            <span className="text-[10px] font-medium text-[#0284C7]">AI数字人</span>
          </div>

          {/* Connection animation */}
          <div className="flex items-center gap-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 bg-[#0284C7] rounded-full"
                style={{
                  animation: phase === 'interviewing' ? `pulse 1.5s ease-in-out ${i * 0.3}s infinite` : 'none',
                  opacity: phase === 'interviewing' ? undefined : 0.3,
                }}
              />
            ))}
          </div>

          {/* Interviewee (dashed outline) */}
          <div className="flex flex-col items-center gap-1.5">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{
                border: '2px dashed #059669',
                background: phase === 'interviewing' ? '#F0FDF4' : '#DCFCE7',
              }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#059669] to-[#047857] rounded-full flex items-center justify-center text-white text-[16px] font-bold">
                曲
              </div>
            </div>
            <span className="text-[10px] font-medium text-[#059669]">曲潇</span>
          </div>
        </div>

        {/* Waveform animation */}
        {phase === 'interviewing' && (
          <div className="flex items-center justify-center gap-[2px] h-[24px]">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="w-[3px] bg-[#0284C7] rounded-full"
                style={{
                  animation: `waveform 0.8s ease-in-out ${i * 0.05}s infinite alternate`,
                  height: `${8 + Math.random() * 16}px`,
                  opacity: 0.6,
                }}
              />
            ))}
          </div>
        )}

        {/* Live transcript */}
        <div className="space-y-1.5">
          <p className="text-[11px] font-medium text-[#666] px-1">📝 实时记录</p>
          <div className="bg-[#F8FAFC] rounded-[14px] p-3 border border-[#E0F2FE] space-y-2 max-h-[200px] overflow-y-auto">
            {transcripts.slice(0, transcriptLines).map((t, i) => (
              <div key={i} className="flex gap-2">
                <span
                  className="px-1.5 py-0.5 rounded text-[8px] font-bold shrink-0 h-fit mt-0.5"
                  style={{
                    background: t.speaker === 'AI' ? '#DBEAFE' : '#DCFCE7',
                    color: t.speaker === 'AI' ? '#1D4ED8' : '#059669',
                  }}
                >
                  {t.speaker}
                </span>
                <p className="text-[10px] text-[#475569] leading-relaxed">{t.text}</p>
              </div>
            ))}
            {phase === 'interviewing' && transcriptLines < transcripts.length && (
              <div className="flex items-center gap-1 text-[10px] text-[#999]">
                <div className="w-2 h-2 border border-[#999] border-t-transparent rounded-full animate-spin" />
                正在识别...
              </div>
            )}
          </div>
        </div>

        <style>{`
          @keyframes waveform {
            from { height: 4px; }
            to { height: 20px; }
          }
        `}</style>
      </div>
    </div>
  );
}
