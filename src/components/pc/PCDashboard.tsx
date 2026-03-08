import { useState, useEffect, useRef } from 'react';
import { useNarrator, NarratorSubtitle } from './Narrator';
import { ScenarioInterview } from './scenarios/ScenarioInterview';
import { ScenarioOperations } from './scenarios/ScenarioOperations';
import { ScenarioTracking } from './scenarios/ScenarioTracking';

type DemoPhase = 'idle' | 'loading' | 'reasoning' | 'alert' | 'drawer';
type ScenarioId = 'inspection-radar' | 'interview' | 'operations' | 'tracking';

interface PCDashboardProps {
  onModeToggle: () => void;
}

const REASONING_LINES = [
  '正在并行执行——扫描 8 个营业部 × 12 项指标 = 96 个数据点，交叉比对基准线、环比、同比…',
  '发现异常簇：阳光部人均FYC和有效活动率同时偏离基准线，且连续5日下滑无回弹迹象——判定为"结构性异常"而非波动噪声',
  '进一步关联分析：该部出勤率、1V1扫码量、1VN参与率三项行为指标均同步下降 → 判断为"团队行为全面失活"而非单一指标波动',
];

const DRAWER_THOUGHTS = [
  '正在聚合各营业部指标数据，识别偏离基准线的异常节点…',
  '关联行为层图谱，追溯指标异常的底层行为成因…',
  '建模连续 5 日趋势序列，计算自然恢复概率…',
  '构建因果链路，归因分析，输出破局策略建议…',
];

export function PCDashboard({ onModeToggle }: PCDashboardProps) {
  const [phase, setPhase] = useState<DemoPhase>('idle');
  const [cardsVisible, setCardsVisible] = useState<boolean[]>([false, false, false]);
  const [reasoningLines, setReasoningLines] = useState<string[]>([]);
  const [showAlertBadge, setShowAlertBadge] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerStep, setDrawerStep] = useState(0);
  const [currentTime, setCurrentTime] = useState('');
  const [activeScenario, setActiveScenario] = useState<ScenarioId>('inspection-radar');
  const drawerBodyRef = useRef<HTMLDivElement>(null);
  const { narratorText, speak, stop } = useNarrator();

  // Subtle alert beep using Web Audio API
  const playAlertBeep = () => {
    try {
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.value = 880;
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.6);
      // Second softer beep
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.type = 'sine';
      osc2.frequency.value = 660;
      gain2.gain.setValueAtTime(0.08, ctx.currentTime + 0.15);
      gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.7);
      osc2.start(ctx.currentTime + 0.15);
      osc2.stop(ctx.currentTime + 0.7);
    } catch { /* ignore if AudioContext unavailable */ }
  };

  // Live clock
  useEffect(() => {
    const update = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }));
    };
    update();
    const id = setInterval(update, 60000);
    return () => clearInterval(id);
  }, []);

  // Auto-start on mount
  useEffect(() => {
    const t = setTimeout(() => setPhase('loading'), 800);
    return () => clearTimeout(t);
  }, []);

  const restartInspection = () => {
    setCardsVisible([false, false, false]);
    setReasoningLines([]);
    setShowAlertBadge(false);
    setDrawerOpen(false);
    setDrawerStep(0);
    setPhase('idle');
    setTimeout(() => setPhase('loading'), 120);
  };

  // Phase: loading → cards
  useEffect(() => {
    if (phase !== 'loading') return;
    const timers = [
      setTimeout(() => setCardsVisible([true, false, false]), 400),
      setTimeout(() => setCardsVisible([true, true, false]), 1100),
      setTimeout(() => setCardsVisible([true, true, true]), 1800),
      setTimeout(() => setPhase('reasoning'), 2500),
    ];
    return () => timers.forEach(clearTimeout);
  }, [phase]);

  // Phase: reasoning → stream lines
  useEffect(() => {
    if (phase !== 'reasoning') return;
    const t1 = setTimeout(() => setReasoningLines([REASONING_LINES[0]]), 400);
    const t2 = setTimeout(() => setReasoningLines(REASONING_LINES.slice(0, 2)), 2800);
    const t3 = setTimeout(() => setReasoningLines(REASONING_LINES), 5200);
    const t4 = setTimeout(() => { setShowAlertBadge(true); setPhase('alert'); playAlertBeep(); speak('赵虎，检测到阳光部出现结构性异常，人均FYC跌破红线，有效活动率仅17%，连续5日下滑无回弹，建议立即查看诊断报告。'); }, 7200);
    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, [phase]);

  // Drawer: Phase 1 thoughts (steps 1-4), then Phase 2 sections (steps 5-9)
  useEffect(() => {
    if (!drawerOpen) { setDrawerStep(0); return; }
    const timers = [
      setTimeout(() => setDrawerStep(1), 300),   // thought 1
      setTimeout(() => setDrawerStep(2), 1200),  // thought 2
      setTimeout(() => setDrawerStep(3), 2100),  // thought 3
      setTimeout(() => setDrawerStep(4), 3000),  // thought 4 — all thoughts done
      setTimeout(() => { setDrawerStep(5); speak('诊断报告已生成。阳光部存在团队行为全面失活问题，自愈概率低于5%，建议从士气重建和外部标杆借力两个方向同时介入。'); }, 3700),  // collapse → section 1 slides in
      setTimeout(() => setDrawerStep(6), 4200),  // section 2
      setTimeout(() => setDrawerStep(7), 4700),  // section 3
      setTimeout(() => setDrawerStep(8), 5200),  // section 4
      setTimeout(() => setDrawerStep(9), 5600),  // CTA
    ];
    return () => timers.forEach(clearTimeout);
  }, [drawerOpen]);

  const openDiagnostics = () => {
    setDrawerOpen(true);
    setPhase('drawer');
    setShowAlertBadge(false);
  };

  // Auto-scroll drawer to bottom as sections appear
  useEffect(() => {
    if (drawerBodyRef.current && drawerStep >= 5) {
      const el = drawerBodyRef.current;
      setTimeout(() => { el.scrollTop = el.scrollHeight; }, 80);
    }
  }, [drawerStep]);

  const switchScenario = (id: ScenarioId) => {
    stop();
    if (id === 'inspection-radar') {
      setActiveScenario('inspection-radar');
      // reset inspection state
      setCardsVisible([false, false, false]);
      setReasoningLines([]);
      setShowAlertBadge(false);
      setDrawerOpen(false);
      setDrawerStep(0);
      setPhase('idle');
      setTimeout(() => setPhase('loading'), 120);
    } else {
      setActiveScenario(id);
      setDrawerOpen(false);
    }
  };

  const agents = [
    {
      id: 'management', name: '经营管理智能体', icon: '🧠', color: '#3B82F6',
      scenarios: [
        { id: 'inspection-radar' as ScenarioId, name: '智能巡检雷达', icon: '📡', tag: '每日自动巡检' },
        { id: 'interview' as ScenarioId, name: '智能面谈全流程', icon: '💬', tag: '动态策略树' },
        { id: 'tracking' as ScenarioId, name: '周五进度追踪', icon: '📊', tag: 'AI外呼+闭环' },
      ],
    },
    {
      id: 'case-mining', name: '内容创作智能体', icon: '🏆', color: '#047857',
      scenarios: [
        { id: 'operations' as ScenarioId, name: '周五自动化运营', icon: '🤖', tag: '人机对话驱动' },
      ],
    },
  ];

  return (
    <div className="pc-layout">
      {/* ── Header ── */}
      <header className="pc-header">
        <div className="pc-header-left">
          <div className="pc-logo">
            <span className="pc-logo-brand">平安DO</span>
            <span className="pc-logo-badge">PC端</span>
          </div>
          <div className="pc-header-divider" />
          <span className="pc-header-tagline">助力内勤作业的AI平台</span>
        </div>
        <div className="pc-header-center">
          <span className="pc-breadcrumb">
            <span className="pc-breadcrumb-agent">
              {activeScenario === 'operations' ? '内容创作智能体' : '经营管理智能体'}
            </span>
            <span className="pc-breadcrumb-sep">›</span>
            <span className="pc-breadcrumb-scenario">
              {activeScenario === 'inspection-radar' && '智能巡检雷达'}
              {activeScenario === 'interview' && '智能面谈全流程'}
              {activeScenario === 'operations' && '周五自动化运营'}
              {activeScenario === 'tracking' && '周五进度追踪'}
            </span>
          </span>
        </div>
        <div className="pc-header-right">
          <div className="pc-header-inspect-status">
            <span className="pc-inspect-dot" />
            <span className="pc-inspect-label">
              {phase === 'loading' || phase === 'reasoning' ? '巡检中' : '今日巡检完成'}
            </span>
          </div>
          <span className="pc-time">{currentTime}</span>
          <button className="pc-mode-toggle-btn" onClick={onModeToggle}>
            <span>📱</span>切换到外勤
          </button>
        </div>
      </header>

      <div className="pc-body">
        {/* ── Sidebar ── */}
        <aside className="pc-sidebar">
          <div className="pc-sidebar-section-label">AI 智能体</div>
          {agents.map((agent) => (
            <div key={agent.id} className="pc-agent-group">
              <div className="pc-agent-group-header">
                <span className="pc-agent-icon-wrap" style={{ background: agent.color + '18' }}>
                  {agent.icon}
                </span>
                <span className="pc-agent-name">{agent.name}</span>
              </div>
              {agent.scenarios.length > 0 ? (
                agent.scenarios.map((sc) => (
                  <button key={sc.id}
                    className={`pc-scenario-btn ${activeScenario === sc.id ? 'pc-scenario-btn-active' : ''}`}
                    style={{ borderLeftColor: agent.color }}
                    onClick={() => switchScenario(sc.id)}>
                    <span className="pc-scenario-btn-icon">{sc.icon}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="pc-scenario-btn-name">{sc.name}</div>
                      <div className="pc-scenario-btn-tag">{sc.tag}</div>
                    </div>
                    {activeScenario === sc.id && <span className="pc-scenario-active-dot" style={{ background: agent.color }} />}
                  </button>
                ))
              ) : (
                <div className="pc-scenario-coming-soon">更多场景即将上线</div>
              )}
            </div>
          ))}
          <div className="pc-sidebar-footer">
            <div className="pc-sidebar-footer-agent-list">
              <span className="pc-sidebar-footer-badge blue">管理</span>
              <span className="pc-sidebar-footer-badge green">案例</span>
              <span className="pc-sidebar-footer-badge purple">创作</span>
            </div>
            <div className="pc-sidebar-footer-tip">Multi-Agent 协同平台</div>
          </div>
        </aside>

        {/* ── Main ── */}
        <main className="pc-main" style={{ position: 'relative', overflow: 'hidden' }}>
          {/* Non-inspection scenarios render here (full height scrollable) */}
          {activeScenario === 'interview' && (
            <div style={{ height: '100%', overflowY: 'auto', padding: '24px 28px' }}>
              <ScenarioInterview onBack={() => switchScenario('inspection-radar')} />
            </div>
          )}
          {activeScenario === 'operations' && (
            <div style={{ height: '100%', overflowY: 'auto', padding: '24px 28px' }}>
              <ScenarioOperations onBack={() => switchScenario('inspection-radar')} />
            </div>
          )}
          {activeScenario === 'tracking' && (
            <div style={{ height: '100%', overflowY: 'auto', padding: '24px 28px' }}>
              <ScenarioTracking onBack={() => switchScenario('inspection-radar')} />
            </div>
          )}

          {/* Inspection scenario (scenario 1) */}
          {activeScenario === 'inspection-radar' && (<>
          <div style={{
            height: '100%', overflowY: 'auto',
            padding: '24px 28px',
            paddingRight: drawerOpen ? '432px' : '28px',
            transition: 'padding-right 0.4s ease',
          }}>
            {/* Scene Title */}
            <div className="pc-scene-header">
              <div>
                <div className="pc-scene-title-row">
                  <h1 className="pc-scene-title">
                    <span className="pc-scene-title-icon">📡</span>智能巡检雷达
                  </h1>
                </div>
                <div className="pc-scene-meta-row">
                  <span className="pc-meta-dot" />
                  <span className="pc-meta-text">每日登录自动触发</span>
                  <span className="pc-meta-sep">·</span>
                  <span className="pc-meta-text">多维度异常检测</span>
                  <span className="pc-meta-sep">·</span>
                  <span className="pc-meta-text">趋势预判</span>
                  <span className="pc-meta-sep">·</span>
                  <span className="pc-meta-text">主动推送</span>
                </div>
              </div>
              <button className="pc-btn-reinspect" onClick={restartInspection}>
                ↺ 重新巡检
              </button>
            </div>

            {/* Data Cards */}
            <div className="pc-cards-grid">
              <div className={`pc-data-card ${cardsVisible[0] ? 'pc-data-card-in' : 'pc-data-card-out'}`}>
                <div className="pc-dc-eyebrow">本月NBEV</div>
                <div className="pc-dc-label-main">当日新增</div>
                <div className="pc-dc-value">10<span className="pc-dc-unit">万</span></div>
                <div className="pc-dc-progress-wrap">
                  <div className="pc-dc-progress-bg">
                    <div className="pc-dc-progress-fill" style={{
                      width: cardsVisible[0] ? '42%' : '0%',
                      background: 'linear-gradient(90deg,#3B82F6,#1D4ED8)',
                      transition: 'width 1.4s cubic-bezier(0.34,1.56,0.64,1) 0.4s',
                    }} />
                  </div>
                  <span className="pc-dc-pct">42%</span>
                </div>
                <div className="pc-dc-hint">目标达成进度</div>
              </div>

              <div className={`pc-data-card ${cardsVisible[1] ? 'pc-data-card-in' : 'pc-data-card-out'}`}>
                <div className="pc-dc-eyebrow">本月NBEV</div>
                <div className="pc-dc-label-main">累计达成</div>
                <div className="pc-dc-value">200<span className="pc-dc-unit">万</span></div>
                <div className="pc-dc-badge-row">
                  <span className="pc-dc-trend-up">↑ 环比 +12%</span>
                </div>
                <div className="pc-dc-hint">较上月同期</div>
              </div>

              <div className={`pc-data-card ${cardsVisible[2] ? 'pc-data-card-in' : 'pc-data-card-out'}`}>
                <div className="pc-dc-eyebrow">团队健康度</div>
                <div className="pc-dc-label-main">有效活动率</div>
                <div className="pc-dc-value">50<span className="pc-dc-unit">%</span></div>
                <div className="pc-dc-badge-row">
                  <span className="pc-dc-status-ok">✅ 达标</span>
                </div>
                <div className="pc-dc-hint">基准线 ≥ 40%</div>
              </div>
            </div>

            {/* AI Reasoning Panel */}
            {reasoningLines.length > 0 && (
              <div className="pc-reasoning-panel pc-fade-in">
                <div className="pc-rp-header">
                  <span className="pc-rp-icon">🧠</span>
                  <span className="pc-rp-title">AI 推理过程</span>
                  {phase === 'reasoning' && <span className="pc-rp-live-badge">● 分析中</span>}
                  {(phase === 'alert' || phase === 'drawer') && (
                    <span className="pc-rp-done-badge">✓ 分析完成</span>
                  )}
                </div>
                <div className="pc-rp-lines">
                  {reasoningLines.map((line, i) => (
                    <div key={i} className="pc-rp-line pc-fade-in-up">
                      <span className="pc-ai-tag">AI推理</span>
                      <span className="pc-rp-line-text">{line}</span>
                    </div>
                  ))}
                  {phase === 'reasoning' && reasoningLines.length < 3 && (
                    <div className="pc-rp-typing">
                      <span className="pc-dot-pulse" />
                      <span className="pc-dot-pulse" style={{ animationDelay: '0.22s' }} />
                      <span className="pc-dot-pulse" style={{ animationDelay: '0.44s' }} />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ── Anomaly Alert Card ── */}
            {(phase === 'alert' || phase === 'drawer') && (
              <div className="pc-anomaly-card">
                <div className="pc-anomaly-card-header">
                  <div className="pc-anomaly-card-left">
                    <span className="pc-anomaly-pulse-icon">🚨</span>
                    <div>
                      <div className="pc-anomaly-headline">侦测到结构性异常</div>
                      <div className="pc-anomaly-sub">AI 判断非正常波动，需立即干预</div>
                    </div>
                  </div>
                  <div className="pc-anomaly-card-right">
                    <div className="pc-anomaly-dept">阳光部</div>
                    <div className="pc-anomaly-meta">
                      部经理：张仟
                      <span className="pc-anomaly-days">● 连续 5 日下滑</span>
                    </div>
                  </div>
                </div>

                <div className="pc-anomaly-metrics">
                  <div className="pc-anomaly-metric-item pc-anomaly-metric-danger">
                    <div className="pc-am-top">
                      <span className="pc-am-name">人均FYC</span>
                      <div className="pc-am-right">
                        <span className="pc-am-value">¥820</span>
                        <span className="pc-am-delta">↓ 18%</span>
                      </div>
                    </div>
                    <div className="pc-am-bar-wrap">
                      <div className="pc-am-bar-bg">
                        <div className="pc-am-bar-fill pc-am-bar-fill-animate" style={{ width: '82%' }} />
                        <div className="pc-am-bar-threshold" style={{ left: '100%' }} title="红线 ¥1,000" />
                      </div>
                      <span className="pc-am-threshold-label">红线 ¥1,000</span>
                    </div>
                  </div>

                  <div className="pc-anomaly-metric-item pc-anomaly-metric-danger">
                    <div className="pc-am-top">
                      <span className="pc-am-name">有效活动率</span>
                      <div className="pc-am-right">
                        <span className="pc-am-value">17%</span>
                        <span className="pc-am-delta">↓ 43%</span>
                      </div>
                    </div>
                    <div className="pc-am-bar-wrap">
                      <div className="pc-am-bar-bg">
                        <div className="pc-am-bar-fill pc-am-bar-fill-animate" style={{ width: '57%' }} />
                        <div className="pc-am-bar-threshold" style={{ left: '88%' }} title="及格线 30%" />
                      </div>
                      <span className="pc-am-threshold-label">及格线 30%</span>
                    </div>
                  </div>
                </div>

                <div className="pc-anomaly-footer">
                  <span className="pc-anomaly-proba">自愈概率 &lt; 5%</span>
                  <button className="pc-alert-cta" onClick={openDiagnostics}>
                    查看完整诊断报告 →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Floating AI Button */}
          <button
            className={`pc-ai-fab ${showAlertBadge ? 'pc-ai-fab-alert' : ''} ${phase === 'idle' || phase === 'loading' ? 'pc-ai-fab-dim' : ''}`}
            onClick={phase === 'alert' || phase === 'drawer' ? openDiagnostics : undefined}
            title={showAlertBadge ? '发现异常，点击查看诊断报告' : 'AI 助手'}
            style={{ right: drawerOpen ? '432px' : '24px', transition: 'right 0.4s ease' }}
          >
            <span className="pc-ai-fab-emoji">🤖</span>
            {showAlertBadge && <span className="pc-ai-fab-badge">1</span>}
            {showAlertBadge && <span className="pc-ai-fab-pulse" />}
          </button>
          </>)}
        </main>

        {/* ── Drawer ── */}
        {drawerOpen && (
          <aside className="pc-drawer pc-drawer-open">
            <div className="pc-drawer-header">
              <div>
                <div className="pc-drawer-title">异常诊断报告</div>
                <div className="pc-drawer-sub">经营管理智能体 · AI 实时生成</div>
              </div>
              <button className="pc-drawer-close" onClick={() => setDrawerOpen(false)}>✕</button>
            </div>

            <div className="pc-drawer-body" ref={drawerBodyRef}>

              {/* ── Phase 1: AI Thinking (steps 1–4) ── */}
              {drawerStep < 5 && (
                <div className="pc-drawer-thinking">
                  <div className="pc-drawer-thinking-title">
                    <span className="pc-rp-icon">🧠</span>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>
                      AI 正在推理分析…
                    </span>
                  </div>
                  {DRAWER_THOUGHTS.slice(0, drawerStep).map((thought, i) => (
                    <div key={i} className="pc-drawer-thought pc-fade-in-up">
                      <span className="pc-ai-tag" style={{ fontSize: '10px' }}>AI推理</span>
                      <span className="pc-drawer-thought-text">{thought}</span>
                    </div>
                  ))}
                  {drawerStep < 4 && (
                    <div className="pc-rp-typing" style={{ paddingLeft: '4px' }}>
                      <span className="pc-dot-pulse" />
                      <span className="pc-dot-pulse" style={{ animationDelay: '0.22s' }} />
                      <span className="pc-dot-pulse" style={{ animationDelay: '0.44s' }} />
                    </div>
                  )}
                  {drawerStep === 4 && (
                    <div className="pc-drawer-thinking-done-row pc-fade-in">
                      <span className="pc-thought-done" style={{ fontSize: '13px' }}>✓</span>
                      <span style={{ fontSize: '12px', color: '#4ADE80', fontWeight: 600 }}>
                        推理完成，正在生成报告…
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* ── Phase 2: compact done badge + sections (steps 5–9) ── */}
              {drawerStep >= 5 && (
                <>
                  {/* Compact thinking summary */}
                  <div className="pc-drawer-done-badge pc-fade-in">
                    <span className="pc-thought-done">✓</span>
                    <span>AI 推理完成</span>
                    <span className="pc-drawer-done-detail">
                      · 已识别 4 个分析维度 · 生成诊断报告如下
                    </span>
                  </div>

                  {/* 关键指标异常 */}
                  <div className="pc-diag-card pc-diag-card-red pc-diag-section-reveal">
                    <div className="pc-diag-card-title">
                      <span className="pc-layer-num">①</span>关键指标异常
                    </div>
                    <div className="pc-metric-row-item">
                      <div className="pc-metric-head-row">
                        <span className="pc-metric-name">人均FYC</span>
                        <span className="pc-metric-val-danger">¥820</span>
                      </div>
                      <div className="pc-metric-desc">
                        跌破 <strong>¥1,000</strong> 红线 · 偏离度 <span className="pc-val-red">-18%</span>
                      </div>
                      <div className="pc-metric-bar-bg">
                        <div className="pc-metric-bar-fill" style={{ width: '82%', background: '#EF4444' }} />
                      </div>
                    </div>
                    <div className="pc-metric-row-item" style={{ marginTop: '12px' }}>
                      <div className="pc-metric-head-row">
                        <span className="pc-metric-name">有效活动率</span>
                        <span className="pc-metric-val-danger">17%</span>
                      </div>
                      <div className="pc-metric-desc">
                        远低于 <strong>30%</strong> 及格线 · 偏离度 <span className="pc-val-red">-43%</span>
                      </div>
                      <div className="pc-metric-bar-bg">
                        <div className="pc-metric-bar-fill" style={{ width: '57%', background: '#EF4444' }} />
                      </div>
                    </div>
                  </div>

                  {/* 底层行为穿透 */}
                  {drawerStep >= 6 && (
                    <div className="pc-diag-card pc-diag-card-orange pc-diag-section-reveal">
                      <div className="pc-diag-card-title">
                        <span className="pc-layer-num">②</span>底层行为穿透
                        <span className="pc-diag-ai-label">AI自动关联下钻</span>
                      </div>
                      {[
                        { label: '早会出勤率', value: '28%', reason: '团队失联，管理抓手缺失' },
                        { label: '1V1扫码量人均', value: '8个', reason: '盘客动作变形，无效拜访' },
                        { label: '1VN活动参与率', value: '7%', reason: '批量获客通道完全堵死' },
                      ].map((item, i) => (
                        <div key={i} className="pc-behavior-row">
                          <span className="pc-beh-label">{item.label}</span>
                          <span className="pc-beh-val">{item.value}</span>
                          <span className="pc-beh-arrow">→</span>
                          <span className="pc-beh-reason">{item.reason}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* 趋势研判 */}
                  {drawerStep >= 7 && (
                    <div className="pc-diag-card pc-diag-card-purple pc-diag-section-reveal">
                      <div className="pc-diag-card-title">
                        <span className="pc-layer-num">③</span>趋势研判
                      </div>
                      <div className="pc-trend-line">📉 连续 5 个工作日下滑，无回弹迹象</div>
                      <div className="pc-trend-ai-row">
                        <span className="pc-ai-tag" style={{ fontSize: '10px' }}>AI判断</span>
                        <span className="pc-trend-ai-text">
                          自愈概率 <strong style={{ color: '#EF4444' }}>{'<'} 5%</strong>，不干预将持续恶化
                        </span>
                      </div>
                    </div>
                  )}

                  {/* 根因推断 */}
                  {drawerStep >= 8 && (
                    <div className="pc-diag-card pc-diag-card-dark pc-diag-section-reveal">
                      <div className="pc-diag-card-title">
                        <span className="pc-layer-num">④</span>根因推断
                      </div>
                      <div className="pc-cause-chain-row">
                        {['连续未出单', '士气低迷', '出勤下降', '基础动作量下降', '业绩进一步下滑'].map(
                          (node, i, arr) => (
                            <span key={i} className="pc-cause-inline">
                              <span className="pc-cause-node">{node}</span>
                              {i < arr.length - 1 && <span className="pc-cause-arr">→</span>}
                            </span>
                          )
                        )}
                      </div>
                      <div className="pc-cause-loop-label">恶性循环</div>
                      <div className="pc-breakthrough-box">
                        <span className="pc-breakthrough-label">破局点：</span>
                        需从 <strong>"士气重建"</strong> 和 <strong>"外部标杆借力"</strong> 两个方向同时介入
                      </div>
                    </div>
                  )}

                  {drawerStep >= 9 && (
                    <button className="pc-cta-btn pc-diag-section-reveal" onClick={() => switchScenario('interview')}>
                      <span>⚡</span> 立即生成面谈策略
                    </button>
                  )}
                </>
              )}

            </div>
          </aside>
        )}
      </div>
      <NarratorSubtitle text={narratorText} />
    </div>
  );
}
