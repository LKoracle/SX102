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

const SCENE_NUMS = ['一', '二', '三', '四', '五', '六', '七'];

const agentModules = [
  {
    id: 'monthly-review',
    name: '每月初，提醒代理人盘点客户',
    timing: '每月初',
    icon: '📋',
    color: '#4F6BF6',
    narration: '场景一，每月初，AI主动提醒代理人盘点客户并生成经营计划。',
    category: 'agent',
  },
  {
    id: 'weekly-plan',
    name: '每周初，提醒本周经营计划',
    timing: '每周初',
    icon: '📅',
    color: '#6366F1',
    narration: '场景二，每周初，AI推送本周拜访计划与客户跟进策略。',
    category: 'agent',
  },
  {
    id: 'pre-visit',
    name: '某天，客户拜访前',
    timing: '拜访前',
    icon: '💼',
    color: '#818CF8',
    narration: '场景三，拜访前，AI自动生成保障检视与专属产品方案。',
    category: 'agent',
  },
  {
    id: 'post-visit',
    name: '某天，客户拜访后',
    timing: '拜访后',
    icon: '📝',
    color: '#7C3AED',
    narration: '场景四，拜访后，AI语音记录拜访并生成总结与跟进计划。',
    category: 'agent',
  },
  {
    id: 'team-coaching',
    name: '某天晚上：辅导下属',
    timing: '晚上',
    icon: '👥',
    color: '#A78BFA',
    narration: '场景五，当天晚上，AI辅助主管精准辅导下属。',
    category: 'agent',
  },
  {
    id: 'weekly-summary',
    name: '每周末，形成周工作总结',
    timing: '周末',
    icon: '📊',
    color: '#0EA5E9',
    narration: '场景六，每周末，AI自动生成本周工作周报。',
    category: 'agent',
  },
  {
    id: 'monthly-retrospective',
    name: '每月末，形成月度工作复盘',
    timing: '月末',
    icon: '📈',
    color: '#10B981',
    narration: '场景七，每月末，AI生成月度复盘报告，闭环全月经营。',
    category: 'agent',
  },
];

const managerModules = [
  {
    id: 'manager-monthly-coaching-list',
    name: '月初，推荐本月面谈计划',
    timing: '每月初',
    icon: '📋',
    color: '#F59E0B',
    narration: '尊敬的您，新的一个月开始了。我已经为您分析了团队成员的本月业绩达成情况。这是建议您重点面谈的成员名单，以及自动生成的面谈计划。',
    category: 'manager',
  },
  {
    id: 'manager-pre-coaching-guidance',
    name: '面谈前，推荐面谈指引',
    timing: '面谈前',
    icon: '💡',
    color: '#EC4899',
    narration: '尊敬的您，面谈前的充分准备是提高面谈效果的关键。我为您准备了详细的面谈指引，包括收入分析、客户盘点、准增员盘点和面谈话术建议。',
    category: 'manager',
  },
  {
    id: 'manager-during-coaching-record',
    name: '面谈中，实时记录并生成总结',
    timing: '面谈中',
    icon: '📱',
    color: '#8B5CF6',
    narration: '尊敬的您，在面谈进行中，系统可以帮您实时记录谈话要点。面谈后，自动生成面谈总结和改进建议，让您快速掌握关键信息。',
    category: 'manager',
  },
  {
    id: 'manager-post-coaching-tracking',
    name: '面谈后，追踪执行过程',
    timing: '面谈后',
    icon: '📊',
    color: '#10B981',
    narration: '尊敬的您，面谈后的追踪同样重要。系统为您提供目标达成情况和经营过程追踪看板，帮您及时了解团队成员的执行进展和辅导重点。',
    category: 'manager',
  },
  {
    id: 'manager-work-summary',
    name: '主管工作总结，分析团队业绩',
    timing: '每天/周/月',
    icon: '📈',
    color: '#0891B2',
    narration: '尊敬的您，每天、每周、每月结束时，系统都会为您生成团队业绩分析、成员活动情况等详细报表，帮助您更好地管理团队。',
    category: 'manager',
  },
];

const modulesMeta = [...agentModules, ...managerModules];

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
      const idx = modulesMeta.findIndex((m) => m.id === moduleId);
      const mod = modulesMeta[idx];
      if (!mod) return;

      setActiveModule(moduleId);
      const isAgentModule = mod.category === 'agent';
      const label = isAgentModule ? `场景${SCENE_NUMS[idx]}：${mod.name}` : mod.name;

      if (autoSpeak && mod.narration) {
        setTransition({ icon: mod.icon, label });
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
    startModuleWithNarration(managerModules[0].id);
  }, [startModuleWithNarration]);

  const handleModuleClick = useCallback(
    (moduleId: string) => {
      startModuleWithNarration(moduleId);
    },
    [startModuleWithNarration]
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
          </div>
        </div>

        <div className="sidebar-label">外勤主管场景</div>

        <nav className="sidebar-nav">
          {managerModules.map((mod) => (
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
