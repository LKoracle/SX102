import { useEffect, useRef, useCallback, useState } from 'react';
import { Header } from './components/Header';
import { MessageBubble } from './components/MessageBubble';
import { InputBar } from './components/InputBar';
import { QuickReplies } from './components/QuickReplies';
import { TypingIndicator } from './components/TypingIndicator';
import { useChat } from './hooks/useChat';
import { useSpeech } from './hooks/useSpeech';
import { scenarios } from './data/scenarios';

// 更新配置：调整配色以匹配截图的“高级感”
const modulesMeta = [
  {
    id: 'monthly-review',
    name: '每月初，提醒代理人盘点客户',
    timing: '每月初',
    icon: '📋',
    color: 'bg-blue-500', // 图标背景色
    lightColor: 'bg-blue-50', // 选中时的背景色
    textColor: 'text-blue-600', // 选中时的文字色
  },
  {
    id: 'weekly-plan',
    name: '每周初，提醒本周经营计划',
    timing: '每周初',
    icon: '📅',
    color: 'bg-indigo-500',
    lightColor: 'bg-indigo-50',
    textColor: 'text-indigo-600',
  },
  {
    id: 'pre-visit',
    name: '某天，客户拜访前',
    timing: '拜访前',
    icon: '💼',
    color: 'bg-orange-400',
    lightColor: 'bg-orange-50',
    textColor: 'text-orange-600',
  },
  {
    id: 'post-visit',
    name: '某天，客户拜访后',
    timing: '拜访后',
    icon: '📝',
    color: 'bg-emerald-500',
    lightColor: 'bg-emerald-50',
    textColor: 'text-emerald-600',
  },
  {
    id: 'team-coaching',
    name: '某天晚上：辅导下属',
    timing: '晚上',
    icon: '👥',
    color: 'bg-purple-500',
    lightColor: 'bg-purple-50',
    textColor: 'text-purple-600',
  },
];

function App() {
  const chat = useChat();
  const speech = useSpeech();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [activeModule, setActiveModule] = useState<string | null>('monthly-review'); // 默认选中第一个

  useEffect(() => {
    chat.initChat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chat.messages, chat.isTyping, chat.quickReplies]);

  useEffect(() => {
    if (speech.transcript && !speech.isListening) {
      const text = speech.transcript.trim();
      if (text) {
        chat.handleUserMessage(text);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [speech.isListening]);

  const handleModuleClick = useCallback(
    (moduleId: string) => {
      setActiveModule(moduleId);
      chat.resetAndStartScenario(moduleId);
    },
    [chat]
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

  return (
    // 外层容器：保持渐变背景，Flex 布局让左右并排
    <div className="h-screen w-full flex items-center justify-center p-4 gap-8 overflow-hidden" 
         style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)' }}>
      
      {/* ================= 左侧：业务场景导航栏 (新视觉) ================= */}
      <aside className="hidden md:flex flex-col w-80 h-[850px] bg-white/95 backdrop-blur-xl rounded-[32px] shadow-2xl p-6 relative z-10">
        
        {/* 1. Header 区域 */}
        <div className="flex items-center gap-4 mb-8">
          {/* Logo 盒子 */}
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#6a11cb] to-[#2575fc] flex items-center justify-center shadow-lg shadow-blue-500/20">
            <span className="text-white font-bold text-xl tracking-wider">AI</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800 tracking-tight">万能营销助手</h1>
            <p className="text-xs text-gray-400 font-medium mt-1">智能保险销售平台</p>
          </div>
        </div>

        {/* 2. 小标题 */}
        <div className="px-1 mb-3">
          <span className="text-sm font-semibold text-gray-400">业务场景模块</span>
        </div>

        {/* 3. 导航列表区域 - 可滚动 */}
        <nav className="flex-1 overflow-y-auto space-y-3 pr-1 scrollbar-hide">
          {modulesMeta.map((mod) => {
            const isActive = activeModule === mod.id;
            
            return (
              <button
                key={mod.id}
                onClick={() => handleModuleClick(mod.id)}
                className={`w-full p-3 rounded-2xl flex items-center gap-4 transition-all duration-300 group text-left relative
                  ${isActive 
                    ? `${mod.lightColor} shadow-sm translate-x-1` 
                    : 'hover:bg-gray-50 hover:translate-x-1'
                  }`}
              >
                {/* 左侧图标盒子 */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shadow-sm transition-transform duration-300 ${isActive ? 'scale-105' : 'group-hover:scale-105'} 
                  ${isActive ? mod.color + ' text-white' : 'bg-gray-100 text-gray-500'}`}>
                  {mod.icon}
                </div>

                {/* 中间文字 */}
                <div className="flex-1 min-w-0">
                  <h3 className={`font-bold text-sm truncate leading-tight mb-1 ${isActive ? mod.textColor : 'text-gray-700'}`}>
                    {mod.name.split('，')[1] || mod.name} {/* 智能截取逗号后的重点 */}
                  </h3>
                  <p className={`text-xs ${isActive ? mod.textColor : 'text-gray-400'} opacity-80`}>
                    {mod.timing}
                  </p>
                </div>

                {/* 选中态：右侧的小圆点 */}
                {isActive && (
                  <div className={`w-2 h-2 rounded-full ${mod.textColor.replace('text', 'bg')}`} />
                )}
              </button>
            );
          })}
        </nav>

        {/* 4. 底部 Footer */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="bg-gray-50 rounded-xl p-3 text-center">
            <p className="text-xs font-medium text-gray-500">Demo 演示模式</p>
            <p className="text-[10px] text-gray-400 mt-1">点击上方模块切换场景</p>
          </div>
        </div>
      </aside>


      {/* ================= 右侧：手机容器 (保持居中) ================= */}
      <main className="relative h-[850px] w-[400px] shrink-0">
        <div className="absolute inset-0 bg-gray-900 rounded-[50px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] border-[8px] border-gray-900 overflow-hidden ring-4 ring-black/10">
          
          {/* 手机刘海 */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-7 w-40 bg-gray-900 rounded-b-2xl z-50"></div>
          
          {/* 手机屏幕内容 */}
          <div className="h-full bg-white flex flex-col relative">
            <Header
              isSpeaking={speech.isSpeaking}
              onStopSpeaking={speech.stopSpeaking}
            />

            {/* Chat messages area */}
            <div
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto pt-4 pb-4 scroll-smooth"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              {chat.messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} onSpeak={handleSpeak} />
              ))}

              {chat.isTyping && <TypingIndicator />}

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
      </main>

    </div>
  );
}

export default App;
