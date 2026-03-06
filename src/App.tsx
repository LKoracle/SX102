import { useEffect, useRef, useCallback, useState } from 'react';
import { Header } from './components/Header';
import { MessageBubble } from './components/MessageBubble';
import { InputBar } from './components/InputBar';
import { QuickReplies } from './components/QuickReplies';
import { TypingIndicator } from './components/TypingIndicator';
import { OverviewPage } from './components/OverviewPage';
import { useChat } from './hooks/useChat';
import { useSpeech } from './hooks/useSpeech';
const backofficeModules = [
  {
    id: 'backoffice-progress-tracking',
    name: '进度自动追踪',
    timing: '进度追踪',
    icon: '📊',
    color: '#3B82F6',
    narration: '郑晓您好，本月代理人业绩追踪已自动更新，让我们来看看各位代理人的进度。',
    category: 'backoffice',
  },
  {
    id: 'backoffice-problem-diagnosis',
    name: '问题预警诊断',
    timing: '问题预警',
    icon: '🔍',
    color: '#DC2626',
    narration: '系统正在为您从多个数据源自动抓取代理人经营数据，进行问题预警诊断。',
    category: 'backoffice',
  },
  {
    id: 'backoffice-meeting-strategy',
    name: '面谈策略指引',
    timing: '面谈策略',
    icon: '💡',
    color: '#7C3AED',
    narration: '根据代理人的问题诊断结果，系统已为您生成面谈策略指引。',
    category: 'backoffice',
  },
  {
    id: 'backoffice-meeting-assist',
    name: '面谈全程辅助',
    timing: '面谈辅助',
    icon: '🎙️',
    color: '#059669',
    narration: '面谈全程辅助已准备就绪，系统将为您实时录音、转写并生成面谈总结。',
    category: 'backoffice',
  },
  {
    id: 'backoffice-report-generation',
    name: '报告一键制作',
    timing: '智能报告',
    icon: '📋',
    color: '#6366F1',
    narration: '报告一键制作功能已就绪，请上传素材或授权数据，AI将自动生成专业报告。',
    category: 'backoffice',
  },
  {
    id: 'backoffice-material-generation',
    name: '营销素材生成',
    timing: '营销素材',
    icon: '🎨',
    color: '#9333EA',
    narration: '营销素材生成功能已就绪，30秒内为您生成全套营销素材并支持跨平台分发。',
    category: 'backoffice',
  },
  {
    id: 'backoffice-case-mining',
    name: '典范案例挖掘',
    timing: '案例挖掘',
    icon: '🏆',
    color: '#047857',
    narration: '典范案例挖掘功能已就绪，系统将根据您设定的标签自动匹配最佳案例。',
    category: 'backoffice',
  },
  {
    id: 'backoffice-case-summary',
    name: '案例智能归纳',
    timing: '案例归纳',
    icon: '🎬',
    color: '#0369A1',
    narration: 'AI数字人访谈功能已就绪，将自动归纳典范事迹并生成宣导视频。',
    category: 'backoffice',
  },
];

const modulesMeta = backofficeModules;

function App() {
  const chat = useChat();
  const speech = useSpeech();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
   const lastTranscriptRef = useRef<string>('');
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [autoSpeak, setAutoSpeak] = useState(true);
  const [showOverview, setShowOverview] = useState(false);  // manual change
  const [transition, setTransition] = useState<{ icon: string; label: string } | null>(null);

  useEffect(() => {
    chat.initChat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Register speak callbacks so useChat triggers speech synchronously with messages
  useEffect(() => {
    const noop = () => {};
    chat.registerSpeak(
      autoSpeak ? speech.speak : noop,
      autoSpeak ? speech.enqueueSpeak : noop
    );
  }, [autoSpeak, speech.speak, speech.enqueueSpeak, chat.registerSpeak]);

  // Auto scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chat.messages, chat.isTyping, chat.quickReplies]);

  // Handle voice transcript submission（防止同一段识别结果重复发送）
  useEffect(() => {
    if (speech.isListening) return;
    if (!speech.transcript) return;
    const text = speech.transcript.trim();
    if (!text) return;
    if (text === lastTranscriptRef.current) return;

    lastTranscriptRef.current = text;
    chat.handleUserMessage(text);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [speech.isListening, speech.transcript]);

  const startModuleWithNarration = useCallback(
    (moduleId: string) => {
      const mod = modulesMeta.find((m) => m.id === moduleId);
      if (!mod) return;

      setActiveModule(moduleId);

      if (autoSpeak && mod.narration) {
        setTransition({ icon: mod.icon, label: mod.name });
        speech.narrate(mod.narration, () => {
          setTransition(null);
          chat.resetAndStartScenario(moduleId);
        });
      } else {
        chat.resetAndStartScenario(moduleId);
      }
    },
    [chat, speech, autoSpeak]
  );

  const handleStartDemo = useCallback(() => {
    setShowOverview(false);
    startModuleWithNarration(backofficeModules[0].id);
  }, [startModuleWithNarration]);

  const handleModuleClick = useCallback(
    (moduleId: string) => {
      startModuleWithNarration(moduleId);
    },
    [startModuleWithNarration]
  );

  const handleQuickReply = useCallback(
    (reply: { label: string; value: string }) => {
      const mod = backofficeModules.find((m) => m.id === reply.value);
      if (mod) {
        chat.addMessage({ role: 'user', type: 'text', content: reply.label });
        chat.startScenario(mod.id);
        setActiveModule(mod.id);
      } else {
        chat.handleQuickReply(reply);
      }
    },
    [chat]
  );

  const handleSpeak = useCallback(
    (text: string) => {
      if (speech.isSpeaking) {
        speech.stopSpeaking();
      } else {
        speech.speak(text);
      }
    },
    [speech]
  );

  if (showOverview) {
    return (
      <OverviewPage
        onStart={handleStartDemo}
        narrate={autoSpeak ? speech.narrate : () => {}}
      />
    );
  }

  return (
    <div className="h-full flex items-center justify-center py-5 noise-overlay" style={{ background: 'linear-gradient(180deg, #EBF5FF 0%, #E0F2FE 50%, #DBEAFE 100%)' }}>
      {/* Left Sidebar Navigation */}
      <div className="sidebar">
        <div className="sidebar-header">
          <div>
            <h2 className="sidebar-title">万能营销</h2>
            <span style={{ fontSize: '11px', color: '#D4AF37', letterSpacing: '0.15em', fontWeight: 600 }}>PRO</span>
          </div>
        </div>

        <div className="sidebar-label">内勤场景</div>

        <nav className="sidebar-nav">
          {backofficeModules.map((mod) => (
            <button
              key={mod.id}
              className={`sidebar-item ${activeModule === mod.id ? 'sidebar-item-active' : ''}`}
              onClick={() => handleModuleClick(mod.id)}
            >
              <span
                className="sidebar-icon"
                style={{
                  background: activeModule === mod.id ? mod.color : undefined,
                }}
              >
                {mod.icon}
              </span>
              <div className="sidebar-item-text">
                <span className="sidebar-item-name">{mod.name}</span>
                <span className="sidebar-item-timing">{mod.timing}</span>
              </div>
              {activeModule === mod.id && (
                <span className="sidebar-active-dot" style={{ background: mod.color }} />
              )}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <p>智能辅导系统</p>
          <p>点击场景开始演示</p>
        </div>
      </div>

      {/* Phone Mockup - Centered */}
      <div className="phone-frame">
        <div className="phone-notch" />
        <div className="phone-screen">
          {transition ? (
            <div className="scene-transition">
              <div className="scene-transition-icon">{transition.icon}</div>
              <div className="scene-transition-label">{transition.label}</div>
            </div>
          ) : (
            <>
              <Header
                isSpeaking={speech.isSpeaking}
                onStopSpeaking={speech.stopSpeaking}
                autoSpeak={autoSpeak}
                onToggleAutoSpeak={() => {
                  setAutoSpeak((v) => {
                    if (v) speech.stopSpeaking();
                    return !v;
                  });
                }}
              />

              {/* Chat messages area */}
              <div
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto pt-4 pb-28"
                style={{ WebkitOverflowScrolling: 'touch' }}
              >
                {chat.messages.map((msg) => (
                  <MessageBubble key={msg.id} message={msg} onSpeak={handleSpeak} />
                ))}

                {chat.isTyping && <TypingIndicator />}

                {/* Quick replies */}
                {chat.quickReplies.length > 0 && !chat.isTyping && (
                  <QuickReplies replies={chat.quickReplies} onSelect={handleQuickReply} />
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input area */}
              <InputBar
                onSend={chat.handleUserMessage}
                onVoiceStart={speech.startListening}
                onVoiceStop={speech.stopListening}
                isListening={speech.isListening}
                transcript={speech.transcript}
                disabled={chat.isTyping}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
