import { useState, useEffect, useRef } from 'react';

interface RecordingCardProps {
  data: Record<string, unknown>;
}

export function RecordingCard({ data: _data }: RecordingCardProps) {
  const [isRecording, setIsRecording] = useState(true);
  const [elapsed, setElapsed] = useState(0);
  const [transcriptLines, setTranscriptLines] = useState<{ speaker: string; text: string }[]>([]);
  const transcriptEndRef = useRef<HTMLDivElement>(null);

  const sampleTranscripts = [
    { speaker: '郑晓', text: '平安，我们先来看看你最近的数据。' },
    { speaker: '李平安', text: '好的，主管。我知道最近业绩不太好...' },
    { speaker: '郑晓', text: '我注意到你的日均外呼从45通降到了18通，你自己怎么看这个变化？' },
    { speaker: '李平安', text: '确实是的，最近有些客户比较难沟通，被拒绝多了就有点不想打了。' },
    { speaker: '郑晓', text: '我理解。其实出现这种情况很正常。我们来分析一下，看看怎么调整。' },
    { speaker: '李平安', text: '嗯，我觉得主要是异议处理这块不太有把握。' },
  ];

  useEffect(() => {
    if (!isRecording) return;
    const timer = setInterval(() => setElapsed((p) => p + 1), 1000);
    return () => clearInterval(timer);
  }, [isRecording]);

  useEffect(() => {
    if (!isRecording) return;
    sampleTranscripts.forEach((line, i) => {
      const timeout = setTimeout(() => {
        setTranscriptLines((prev) => [...prev, line]);
      }, (i + 1) * 3000);
      return () => clearTimeout(timeout);
    });
  }, []);

  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [transcriptLines]);

  const formatTime = (s: number) => {
    const min = Math.floor(s / 60);
    const sec = s % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-[#DC2626] to-[#EF4444] px-4 py-2.5">
        <h3 className="text-white font-semibold text-[15px]">🎙️ 面谈实时记录</h3>
      </div>

      <div className="p-3 space-y-3 max-h-[450px] overflow-y-auto">
        {/* Recording Status */}
        <div className="flex items-center justify-between px-3 py-2 bg-[#FEF2F2] rounded-[12px]">
          <div className="flex items-center gap-2">
            {isRecording && (
              <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
            )}
            <span className="text-[12px] font-medium text-[#DC2626]">
              {isRecording ? '录音中' : '录音已停止'}
            </span>
          </div>
          <span className="text-[13px] font-mono font-bold text-[#DC2626]">
            {formatTime(elapsed)}
          </span>
        </div>

        {/* Waveform Animation */}
        {isRecording && (
          <div className="flex items-center justify-center gap-0.5 h-8">
            {Array.from({ length: 24 }).map((_, i) => (
              <div
                key={i}
                className="w-1 bg-[#3B82F6] rounded-full"
                style={{
                  height: `${8 + Math.random() * 20}px`,
                  animation: `wave 0.5s ease-in-out ${i * 0.05}s infinite alternate`,
                  opacity: 0.4 + Math.random() * 0.6,
                }}
              />
            ))}
            <style>{`
              @keyframes wave {
                from { transform: scaleY(0.4); }
                to { transform: scaleY(1); }
              }
            `}</style>
          </div>
        )}

        {/* Live Transcript */}
        <div className="space-y-1">
          <p className="text-[11px] font-medium text-[#64748B]">📝 实时转写</p>
          <div className="border border-gray-100 rounded-[12px] p-2.5 max-h-[200px] overflow-y-auto bg-[#FAFAFA]">
            {transcriptLines.length === 0 && (
              <p className="text-[10px] text-[#999] italic">等待对话开始...</p>
            )}
            {transcriptLines.map((line, i) => (
              <div key={i} className="mb-1.5">
                <span
                  className="text-[10px] font-bold"
                  style={{ color: line.speaker === '郑晓' ? '#1D4ED8' : '#059669' }}
                >
                  {line.speaker}：
                </span>
                <span className="text-[10px] text-[#555]">{line.text}</span>
              </div>
            ))}
            <div ref={transcriptEndRef} />
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-3">
          <button
            onClick={() => setIsRecording(!isRecording)}
            className="px-4 py-1.5 rounded-full text-[11px] font-medium transition-all"
            style={{
              background: isRecording ? '#DC2626' : '#059669',
              color: '#fff',
            }}
          >
            {isRecording ? '⏸ 暂停' : '▶ 继续'}
          </button>
        </div>
      </div>
    </div>
  );
}
