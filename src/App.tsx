return (
  // 1. 修改外层容器：确保最小高度为屏幕高度，去掉溢出，增加自适应内边距
  <div className="min-h-screen w-full flex items-center justify-center p-6 md:p-12 overflow-hidden" 
       style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)' }}>
    
    {/* 容器包裹层：限制最大高度为屏幕的 90%，确保上下始终有空隙 */}
    <div className="flex flex-row items-center justify-center gap-8 w-full max-w-7xl h-[90vh] max-h-[900px]">
      
      {/* ================= 左侧：业务场景导航栏 (改为高度自适应) ================= */}
      <aside className="hidden md:flex flex-col w-80 h-full bg-white/95 backdrop-blur-xl rounded-[32px] shadow-2xl p-6 relative z-10 border border-white/20">
        
        {/* Header 区域保持不变... */}
        <div className="flex items-center gap-4 mb-8 shrink-0">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#6a11cb] to-[#2575fc] flex items-center justify-center shadow-lg shadow-blue-500/20">
            <span className="text-white font-bold text-xl tracking-wider">AI</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800 tracking-tight">万能营销助手</h1>
            <p className="text-xs text-gray-400 font-medium mt-1">智能保险销售平台</p>
          </div>
        </div>

        <div className="px-1 mb-3 shrink-0">
          <span className="text-sm font-semibold text-gray-400">业务场景模块</span>
        </div>

        {/* 导航列表区域：自动伸缩 */}
        <nav className="flex-1 overflow-y-auto space-y-3 pr-1 scrollbar-hide">
          {modulesMeta.map((mod) => {
            const isActive = activeModule === mod.id;
            return (
              <button
                key={mod.id}
                onClick={() => handleModuleClick(mod.id)}
                className={`w-full p-3 rounded-2xl flex items-center gap-4 transition-all duration-300 group text-left relative
                  ${isActive ? `${mod.lightColor} shadow-sm translate-x-1` : 'hover:bg-gray-50 hover:translate-x-1'}`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shadow-sm transition-transform duration-300 ${isActive ? 'scale-105' : 'group-hover:scale-105'} 
                  ${isActive ? mod.color + ' text-white' : 'bg-gray-100 text-gray-500'}`}>
                  {mod.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`font-bold text-sm truncate leading-tight mb-1 ${isActive ? mod.textColor : 'text-gray-700'}`}>
                    {mod.name.includes('，') ? mod.name.split('，')[1] : mod.name}
                  </h3>
                  <p className={`text-xs ${isActive ? mod.textColor : 'text-gray-400'} opacity-80`}>
                    {mod.timing}
                  </p>
                </div>
                {isActive && <div className={`w-2 h-2 rounded-full ${mod.textColor.replace('text', 'bg')}`} />}
              </button>
            );
          })}
        </nav>

        {/* 底部 Footer 保持不变... */}
        <div className="mt-4 pt-4 border-t border-gray-100 shrink-0">
          <div className="bg-gray-50 rounded-xl p-3 text-center">
            <p className="text-xs font-medium text-gray-500">Demo 演示模式</p>
            <p className="text-[10px] text-gray-400 mt-1">点击上方模块切换场景</p>
          </div>
        </div>
      </aside>


      {/* ================= 右侧：手机容器 (改为高度自适应) ================= */}
      <main className="relative h-full w-[400px] shrink-0">
        {/* 手机外壳：h-full 会随父容器自动缩放 */}
        <div className="absolute inset-0 bg-gray-900 rounded-[50px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] border-[8px] border-gray-900 overflow-hidden ring-4 ring-black/10">
          
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-7 w-40 bg-gray-900 rounded-b-2xl z-50"></div>
          
          <div className="h-full bg-white flex flex-col relative">
            <Header isSpeaking={speech.isSpeaking} onStopSpeaking={speech.stopSpeaking} />

            <div ref={chatContainerRef} className="flex-1 overflow-y-auto pt-4 pb-4 scroll-smooth scrollbar-hide">
              {chat.messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} onSpeak={handleSpeak} />
              ))}
              {chat.isTyping && <TypingIndicator />}
              {chat.quickReplies.length > 0 && !chat.isTyping && (
                <QuickReplies replies={chat.quickReplies} onSelect={handleQuickReply} />
              )}
              <div ref={messagesEndRef} />
            </div>

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
  </div>
);
