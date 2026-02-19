import { useEffect, useRef, useCallback, useState } from 'react';
import { Header } from './components/Header';
import { MessageBubble } from './components/MessageBubble';
import { InputBar } from './components/InputBar';
import { QuickReplies } from './components/QuickReplies';
import { TypingIndicator } from './components/TypingIndicator';
import { OverviewPage } from './components/OverviewPage';
import { useChat } from './hooks/useChat';
import { useSpeech } from './hooks/useSpeech';
import { scenarios } from './data/scenarios';

const modulesMeta = [
  {
    id: 'monthly-review',
    name: '每月初，提醒代理人盘点客户',
    timing: '每月初',
    icon: '📋',
    color: '#4F6BF6',
    narration:
      '场景一，每月初主动出击。AI自动盘点全量客户，推送精选高价值名单，并一键生成月度经营计划。' +
      '让服务从被动等待变为主动出击，这正是"服务被动转主动"的第一个落地场景。',
  },
  {
    id: 'weekly-plan',
    name: '每周初，提醒本周经营计划',
    timing: '每周初',
    icon: '📅',
    color: '#6366F1',
    narration:
      '场景二，每周有的放矢。AI推送本周拜访优先级与客户跟进策略，深度可视化每位客户的潜力与紧迫程度。' +
      '让代理人每周一打开手机，就知道该找谁、说什么。',
  },
  {
    id: 'pre-visit',
    name: '某天，客户拜访前',
    timing: '拜访前',
    icon: '💼',
    color: '#818CF8',
    narration:
      '场景三，拜访前知己知彼。AI自动生成客户保障检视报告与专属产品方案，让每一次上门都是有备而来。' +
      '对话即交易，从见面第一句话起，就直指客户的真实需求。',
  },
  {
    id: 'post-visit',
    name: '某天，客户拜访后',
    timing: '拜访后',
    icon: '📝',
    color: '#7C3AED',
    narration:
      '场景四，拜访后立即闭环。AI语音记录拜访全程，自动生成拜访总结与下一步跟进计划。' +
      '每次对话都形成完整闭环，这就是"闭环式成交"的核心理念。',
  },
  {
    id: 'team-coaching',
    name: '某天晚上：辅导下属',
    timing: '晚上',
    icon: '👥',
    color: '#A78BFA',
    narration:
      '场景五，精准辅导团队。AI深度可视化下属的业绩数据与客户经营情况，精准定位短板，给出针对性辅导建议。' +
      '让主管告别凭感觉带团队，用数据驱动团队持续成长。',
  },
  {
    id: 'weekly-summary',
    name: '每周末，形成周工作总结',
    timing: '周末',
    icon: '📊',
    color: '#0EA5E9',
    narration:
      '场景六，周末一键成果可视化。AI汇总本周拜访、跟进与成交数据，自动生成图文并茂的工作周报。' +
      '让每一周的努力清晰可见，为下周主动出击提供决策依据。',
  },
  {
    id: 'monthly-retrospective',
    name: '每月末，形成月度工作复盘',
    timing: '月末',
    icon: '📈',
    color: '#10B981',
    narration:
      '场景七，月末深度闭环。AI生成月度复盘报告，全景呈现客户经营轨迹与成交成果。' +
      '从盘点到复盘，从计划到结果，完整的经营闭环在这里形成。',
  },
];

function App() {
  const chat = useChat();
  const speech = useSpeech();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [autoSpeak, setAutoSpeak] = useState(true);
  const [showOverview, setShowOverview] = useState(true);

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

  // Handle voice transcript submission
  useEffect(() => {
    if (speech.transcript && !speech.isListening) {
      const text = speech.transcript.trim();
      if (text) {
        chat.handleUserMessage(text);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [speech.isListening]);

  const handleStartDemo = useCallback(() => {
    setShowOverview(false);
    const first = modulesMeta[0];
    setActiveModule(first.id);
    if (autoSpeak) {
      speech.narrate(first.narration, () => chat.resetAndStartScenario(first.id));
    } else {
      chat.resetAndStartScenario(first.id);
    }
  }, [chat, speech, autoSpeak]);

  const handleModuleClick = useCallback(
    (moduleId: string) => {
      setActiveModule(moduleId);
      const mod = modulesMeta.find((m) => m.id === moduleId);
      if (autoSpeak && mod?.narration) {
        speech.narrate(mod.narration, () => chat.resetAndStartScenario(moduleId));
      } else {
        chat.resetAndStartScenario(moduleId);
      }
    },
    [chat, speech, autoSpeak]
  );

  const handleQuickReply = useCallback(
    (reply: { label: string; value: string }) => {
      const scenario = scenarios.find((s) => s.id === reply.value);
      if (scenario) {
        chat.addMessage({ role: 'user', type: 'text', content: reply.label });
        chat.startScenario(scenario.id);
        setActiveModule(scenario.id);
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
    <div className="h-full flex items-center justify-center py-5" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)' }}>
      {/* Left Sidebar Navigation */}
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo">AI</div>
          <div>
            <h2 className="sidebar-title">万能营销助手</h2>
            <p className="sidebar-subtitle">智能保险销售平台</p>
          </div>
        </div>

        <div className="sidebar-label">业务场景模块</div>

        <nav className="sidebar-nav">
          {modulesMeta.map((mod) => (
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
          <p>Demo 演示模式</p>
          <p>点击左侧模块切换场景</p>
        </div>
      </div>

      {/* Phone Mockup - Centered */}
      <div className="phone-frame">
        <div className="phone-notch" />
        <div className="phone-screen">
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
            className="flex-1 overflow-y-auto pt-4 pb-4"
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
        </div>
      </div>
    </div>
  );
}

export default App;
