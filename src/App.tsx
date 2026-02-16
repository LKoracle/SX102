return (
    <div className="h-full flex items-center justify-center p-6 gap-8" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)' }}>
      {/* Left Sidebar Navigation - 增强视觉版 */}
      <div className="w-[300px] h-[812px] bg-white/95 backdrop-blur-md rounded-[32px] shadow-2xl flex flex-col p-6 border border-white/20">
        {/* Header 区域 */}
        <div className="flex items-center gap-4 px-2 pb-6 border-bottom border-gray-100/50">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center shadow-lg shadow-indigo-200">
            <span className="text-white font-bold text-lg">AI</span>
          </div>
          <div>
            <h2 className="text-[17px] font-bold text-slate-800 leading-tight">万能营销助手</h2>
            <p className="text-[11px] text-slate-400 mt-0.5 tracking-wide">智能保险销售平台</p>
          </div>
        </div>

        {/* 标签标题 */}
        <div className="px-2 py-4">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">业务场景模块</span>
        </div>

        {/* 导航列表 - 增加间距和悬浮感 */}
        <nav className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
          {modulesMeta.map((mod) => (
            <button
              key={mod.id}
              className={`w-full group flex items-center gap-3.5 p-3.5 rounded-2xl transition-all duration-300 text-left
                ${activeModule === mod.id 
                  ? 'bg-indigo-50 shadow-sm shadow-indigo-100/50' 
                  : 'hover:bg-slate-50'}`}
              onClick={() => handleModuleClick(mod.id)}
            >
              {/* 图标盒子 */}
              <span
                className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl transition-transform duration-300 group-hover:scale-110
                  ${activeModule === mod.id ? 'text-white shadow-md' : 'bg-slate-100 text-slate-500'}`}
                style={{
                  background: activeModule === mod.id ? mod.color : undefined,
                }}
              >
                {mod.icon}
              </span>

              {/* 文字描述 */}
              <div className="flex-1 flex flex-col min-w-0">
                <span className={`text-[13px] font-bold truncate transition-colors
                  ${activeModule === mod.id ? 'text-indigo-600' : 'text-slate-600 group-hover:text-slate-900'}`}>
                  {mod.name}
                </span>
                <span className={`text-[11px] mt-0.5 ${activeModule === mod.id ? 'text-indigo-400' : 'text-slate-400'}`}>
                  {mod.timing}
                </span>
              </div>

              {/* 活动指示点 */}
              {activeModule === mod.id && (
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: mod.color }} />
              )}
            </button>
          ))}
        </nav>

        {/* Footer 装饰 */}
        <div className="mt-4 pt-4 border-t border-slate-100">
          <div className="bg-slate-50 rounded-2xl p-4 text-center">
            <p className="text-[12px] font-bold text-slate-500">Demo 演示模式</p>
            <p className="text-[10px] text-slate-400 mt-1">点击左侧模块切换场景</p>
          </div>
        </div>
      </div>

      {/* 右侧手机区域 (保持原样不动) */}
      <div className="phone-frame">
          {/* ...这里是你原本的手机端代码... */}
      </div>
    </div>
  );
