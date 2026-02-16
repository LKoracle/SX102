import { useEffect, useRef, useCallback, useState } from 'react';
import { Header } from './components/Header';
import { MessageBubble } from './components/MessageBubble';
import { InputBar } from './components/InputBar';
import { QuickReplies } from './components/QuickReplies';
import { TypingIndicator } from './components/TypingIndicator';
import { useChat } from './hooks/useChat';
import { useSpeech } from './hooks/useSpeech';
import { scenarios } from './data/scenarios';

const modulesMeta = [
  { id: 'monthly-review', name: '每月初，提醒代理人盘点客户', timing: '每月初', icon: '📋', color: '#4F6BF6' },
  { id: 'weekly-plan', name: '每周初，提醒本周经营计划', timing: '每周初', icon: '📅', color: '#6366F1' },
  { id: 'pre-visit', name: '某天，客户拜访前', timing: '拜访前', icon: '💼', color: '#818CF8' },
  { id: 'post-visit', name: '某天，客户拜访后', timing: '拜访后', icon: '📝', color: '#7C3AED' },
  { id: 'team-coaching', name: '某天晚上：辅导下属', timing: '晚上', icon: '👥', color: '#A78BFA' },
];

function App() {
  const chat = useChat();
  const speech = useSpeech();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [activeModule, setActiveModule] = useState<string | null>(null);

  useEffect(() => {
    chat.initChat();
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chat.messages, chat.isTyping, chat.quickReplies]);

  useEffect(() => {
    if (speech.transcript && !speech.isListening) {
      const text = speech.transcript.trim();
      if (text) { chat.handleUserMessage(text); }
    }
  }, [speech.isListening]);

  const handleModuleClick = useCallback((moduleId: string) => {
    setActiveModule(moduleId);
    chat.resetAndStartScenario(moduleId);
  }, [chat]);

  const handleQuickReply = useCallback((reply: { label: string; value: string }) => {
    const scenario = scenarios.find((s) => s.id === reply.value);
    if (scenario) {
      chat.addMessage({ role: 'user', type: 'text', content: reply.label });
      chat.startScenario(scenario.id);
      setActiveModule(scenario.id);
    } else {
      chat.handleQuickReply(reply);
    }
  }, [chat]);

  const handleSpeak = useCallback((text: string) => {
    if (speech.isSpeaking) { speech.stopSpeaking(); } 
    else { speech.speak(text); }
  }, [speech]);

  return (
    // 使用 min-h-screen 和 flex-col 在移动端适配，md:flex-row 在桌面端适配
    <div className="min-h-screen w-full flex flex-col md:flex-row items-center justify-center p-4 md:p-8 gap-6 md:gap-12 overflow-hidden" 
         style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)' }}>
      
      {/* 左侧侧边栏 - 参照图19视觉优化 */}
      <aside className="hidden md:flex flex-col w-80 h-[85vh] max-h-[850px] bg-white/95 backdrop-blur-xl rounded-[32px] shadow-2xl p-6 border border-white/20">
        <div className="flex items-center gap-4 mb-8 shrink-0 px-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#6a11cb] to-[#2575fc] flex items-center justify-center shadow-lg text-white font-bold text-xl">AI</div>
          <div>
            <h1 className="text-lg font-bold text-gray-800 leading-tight">万能营销助手</h1>
            <p className="text-xs text-gray-400 mt-1">智能保险销售平台</p>
          </div>
        </div>

        <div className="px-2 mb-4 shrink-0 uppercase tracking-widest text-[10px] font-bold text-gray-400">业务场景模块</div>

        <nav className="flex-1 overflow-y-auto space-y-3 pr-1 scrollbar-hide">
          {modulesMeta.map((mod) => {
            const isActive = activeModule === mod.id;
            return (
              <button
                key={mod.id}
                onClick={() => handleModuleClick(mod.id)}
                className={`w-full p-3.5 rounded-2xl flex items-center gap-4 transition-all duration-300 group text-left
                  ${isActive ? 'bg-indigo-50 shadow-sm' : 'hover:bg-gray-50'}`}
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl shadow-sm transition-transform ${isActive ? 'scale-110 text-white' : 'bg-gray-100 text-gray-400'}`}
                     style={{ background: isActive ? mod.color : undefined }}>
                  {mod.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`font-bold text-sm truncate ${isActive ? 'text-indigo-600' : 'text-gray-700'}`}>{mod.name}</h3>
                  <p className={`text-xs ${isActive ? 'text-indigo-400' : 'text-gray-400'}`}>{mod.timing}</p>
                </div>
                {isActive && <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />}
              </button>
            );
          })}
        </nav>

        <div className="mt-6 pt-4 border-t border-gray-100 shrink-0 text-center bg-gray-50/50 rounded-2xl p-3">
          <p className="text-[11px] font-bold text-gray-500">Demo 演示模式</p>
          <p className="text-[10px] text-gray-400 mt-0.5">点击上方模块切换场景</p>
        </div>
      </aside>

      {/* 右侧手机容器 - 保持比例高度 */}
      <main className="relative h-[85vh] max-h-[850px] aspect-[9/18.5] md:aspect-auto md:w-[390px] shrink-0">
        <div className="absolute inset-0 bg-gray-900 rounded-[50px] shadow-2xl border-[8px] border-gray-900 overflow-hidden ring-4 ring-black/5">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-36 bg-gray-900 rounded-b-3xl z-50"></div>
          <div className="h-full bg-white flex flex-col relative">
            <Header isSpeaking={speech.isSpeaking} onStopSpeaking={speech.stopSpeaking} />
            <div ref={chatContainerRef} className="flex-1 overflow-y-auto pt-4 pb-4 scroll-smooth scrollbar-hide">
              {chat.messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} onSpeak={handleSpeak} />
              ))}
              {chat.isTyping
