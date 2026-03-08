import { useState, useEffect, useRef } from 'react';
import { useNarrator, NarratorSubtitle } from '../Narrator';

interface Props { onBack: () => void; }

const REASONING = [
  '正在调取阳光部近30天全量数据… 正在关联张仟个人管理风格画像… 正在检索同区标杆营业部的成功策略…',
  '策略生成逻辑：根据张仟史上面谈记录，其抵触情绪较强，建议用"利益键接"而非"直接施压"作为破冰策略',
];

const SUMMARY_REASONING = [
  '正在回溯本次对话全量语义… 提取关键情绪节点…',
  '识别已达成共识与未解决分歧…',
  '同时基于面谈共识自动拆解为可执行任务，分配责任人，设定追踪时间节点…',
];

type Phase = 'reasoning' | 'strategy' | 'sum-reasoning' | 'minutes' | 'sent';

export function ScenarioInterview({ onBack }: Props) {
  const [phase, setPhase] = useState<Phase>('reasoning');
  const [reasoningStep, setReasoningStep] = useState(0);
  const [modulesVisible, setModulesVisible] = useState(0);
  const [sumStep, setSumStep] = useState(0);
  const [minutesStep, setMinutesStep] = useState(0);
  const bodyRef = useRef<HTMLDivElement>(null);
  const { narratorText, speak } = useNarrator();

  const scrollToBottom = () => {
    setTimeout(() => {
      if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }, 80);
  };

  // Reasoning phase
  useEffect(() => {
    const timers = [
      setTimeout(() => setReasoningStep(1), 400),
      setTimeout(() => setReasoningStep(2), 2400),
      setTimeout(() => { setPhase('strategy'); setModulesVisible(0); speak('面谈策略已生成。根据张仟历史面谈记录分析，建议用利益链接方式破冰，重点围绕三好五星落后指标展开沟通。'); }, 4200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  // Strategy modules reveal
  useEffect(() => {
    if (phase !== 'strategy') return;
    const timers = [
      setTimeout(() => setModulesVisible(1), 300),
      setTimeout(() => { setModulesVisible(2); scrollToBottom(); }, 2500),
      setTimeout(() => { setModulesVisible(3); scrollToBottom(); }, 4500),
    ];
    return () => timers.forEach(clearTimeout);
  }, [phase]);

  // Summary reasoning
  useEffect(() => {
    if (phase !== 'sum-reasoning') return;
    const timers = [
      setTimeout(() => setSumStep(1), 300),
      setTimeout(() => setSumStep(2), 1600),
      setTimeout(() => setSumStep(3), 2900),
      setTimeout(() => { setPhase('minutes'); setMinutesStep(0); speak('面谈纪要已自动生成，核心卡点、达成共识和闭环任务已拆解完毕，确认后可一键下发给责任人。'); }, 4200),
    ];
    return () => timers.forEach(clearTimeout);
  }, [phase]);

  // Minutes sections reveal
  useEffect(() => {
    if (phase !== 'minutes') return;
    const timers = [
      setTimeout(() => setMinutesStep(1), 300),
      setTimeout(() => { setMinutesStep(2); scrollToBottom(); }, 1000),
      setTimeout(() => { setMinutesStep(3); scrollToBottom(); }, 1700),
      setTimeout(() => { setMinutesStep(4); scrollToBottom(); }, 2500),
    ];
    return () => timers.forEach(clearTimeout);
  }, [phase]);

  // Speak when sent
  useEffect(() => {
    if (phase === 'sent') speak('下发成功。任务已通过企微发送给张仟，协同任务已同步至朝阳部李平安，追踪时间节点已写入AI日历。');
  }, [phase]);

  return (
    <div className="sc-body" ref={bodyRef}>
      {/* Scene Header */}
      <div className="pc-scene-header">
        <div>
          <div className="pc-scene-title-row">
            <h1 className="pc-scene-title"><span className="pc-scene-title-icon">💬</span>智能面谈全流程</h1>
          </div>
          <div className="pc-scene-meta-row">
            <span className="pc-meta-dot" /><span className="pc-meta-text">AI精准诊断，不只是给话术</span>
            <span className="pc-meta-sep">·</span><span className="pc-meta-text">STEP 1 会前：AI生成"动态策略树"</span>
            <span className="pc-meta-sep">·</span><span className="pc-meta-text">STEP 2 会后：自动纪要 + 闭环任务下发</span>
          </div>
        </div>
        <button className="pc-btn-reinspect" onClick={onBack}>← 返回巡检</button>
      </div>

      {/* Context card */}
      <div className="sc-context-card">
        <div className="sc-context-tag">面谈对象</div>
        <div className="sc-context-main">阳光部 · 部经理 张仟</div>
        <div className="sc-context-sub">根因：士气塌方 → 出勤率↓ &nbsp;·&nbsp; 盘客缺失 → 1V1↓ &nbsp;·&nbsp; 渠道堵塞 → 1VN↓</div>
      </div>

      {/* AI Reasoning */}
      {reasoningStep > 0 && (
        <div className="pc-reasoning-panel pc-fade-in">
          <div className="pc-rp-header">
            <span className="pc-rp-icon">🧠</span>
            <span className="pc-rp-title">AI 策略生成推理</span>
            {phase === 'reasoning' ? (
              <span className="pc-rp-live-badge">● 推理中</span>
            ) : (
              <span className="pc-rp-done-badge">✓ 推理完成</span>
            )}
          </div>
          <div className="pc-rp-lines">
            {REASONING.slice(0, reasoningStep).map((line, i) => (
              <div key={i} className="pc-rp-line pc-fade-in-up">
                <span className="pc-ai-tag">AI推理</span>
                <span className="pc-rp-line-text">{line}</span>
              </div>
            ))}
            {phase === 'reasoning' && (
              <div className="pc-rp-typing">
                <span className="pc-dot-pulse" /><span className="pc-dot-pulse" style={{ animationDelay: '0.22s' }} /><span className="pc-dot-pulse" style={{ animationDelay: '0.44s' }} />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Strategy Panel */}
      {(phase === 'strategy' || phase === 'sum-reasoning' || phase === 'minutes' || phase === 'sent') && (
        <div className="sc-strategy-panel">
          <div className="sc-strategy-title">
            <span>📋</span><span>阳光部张仟 · 精准面谈策略</span>
            <span className="sc-badge">AI 生成</span>
          </div>

          {modulesVisible >= 1 && (
            <div className="sc-module pc-diag-section-reveal">
              <div className="sc-module-header">
                <span className="sc-module-num">模块一</span>
                <span className="sc-module-name">三好五星落后指标分析</span>
              </div>
              <div className="sc-intent-row">
                <span className="pc-ai-tag" style={{ fontSize: '10px', flexShrink: 0 }}>AI意图</span>
                <span className="sc-intent-text">帮助部经理分析三好五星中的落后指标，用数据说话，明确差距和缺口，制造紧迫感与可行感</span>
              </div>
              <div className="sc-script-box">
                张经理，我帮你拉了一下三好五星的数据。目前咱们阳光部月均FYC不足5万，距离1星达标线还有1.5万的缺口——这个差距不大，但再不抓紧就真的来不及了。同时我注意到几个行为指标也在亮红灯：出勤率偏低，不到30%；1V1扫码量低于人均10个；1VN活动率不到10%。这几个底层数据不改善，业绩翻盘的基础就不存在。
              </div>
            </div>
          )}

          {modulesVisible >= 2 && (
            <div className="sc-module pc-diag-section-reveal">
              <div className="sc-module-header">
                <span className="sc-module-num">模块二</span>
                <span className="sc-module-name">提升建议与行动方案</span>
              </div>
              <div className="sc-intent-row">
                <span className="pc-ai-tag" style={{ fontSize: '10px', flexShrink: 0 }}>AI意图</span>
                <span className="sc-intent-text">针对三大落后指标，逐一给出具体可落地的提升建议，确保每一条都有责任人和执行路径</span>
              </div>
              <div className="sc-script-box" style={{ marginBottom: 12 }}>
                针对这些问题，我有三个具体建议：
              </div>
              {[
                {
                  title: '摸底未参会人员，提升早会质量',
                  intent: '出勤率是团队管理的基本盘，先搞清楚谁没来、为什么没来，才能对症下药',
                  script: '第一，出勤率不到30%说明团队失联严重。你这周先把阳光部未参会人员的情况逐一摸底——谁是因为客户约访冲突，谁是纯粹躺平，分清楚了才能针对性拉回来。早会质量也要升级，不能再走形式，要让大家觉得来了有收获。',
                },
                {
                  title: '加强盘客管理，制定拜访计划，做好客户KYC',
                  intent: '1V1扫码量低的根源是盘客不到位，要求张三从客户KYC做起，把拜访计划落到纸面上',
                  script: '第二，张三你的1V1扫码量人均才不到10个，说明属员不知道该拜访谁、聊什么。从这周开始，你要加强盘客管理——把每个属员手上的客户池梳理一遍，做好客户KYC，搞清楚每个客户的家庭情况、保障缺口、近期触达时机，然后制定明确的拜访计划。不能再让大家盲目跑市场了。',
                },
                {
                  title: '安排朝阳部经理李平安带队进行1VN活动分享',
                  intent: '1VN活动率不到10%，需要用"标杆借力"方式打开局面，安排达成好的朝阳部经理B带主管入场做实战分享，并监督活动落地',
                  script: '第三，1VN活动率不到10%，说明批量获客通道基本堵死了。我已经帮你安排了朝阳营业部的经理李平安——他们1VN做得最好，让他带着主管直接来阳光部做一次实战分享，手把手教你们怎么组织策划1VN活动。分享完之后，我会持续监督活动组织策划的落地情况，确保不是听完就完了，而是真正转化为行动计划并追踪执行。',
                },
              ].map((sub, i) => (
                <div key={i} className="sc-sub-module">
                  <div className="sc-sub-title">建议{['一', '二', '三'][i]}：{sub.title}</div>
                  <div className="sc-intent-row">
                    <span className="pc-ai-tag" style={{ fontSize: '10px', flexShrink: 0 }}>AI意图</span>
                    <span className="sc-intent-text">{sub.intent}</span>
                  </div>
                  <div className="sc-script-box">{sub.script}</div>
                </div>
              ))}
            </div>
          )}

          {modulesVisible >= 3 && phase === 'strategy' && (
            <button className="pc-cta-btn pc-diag-section-reveal" onClick={() => { setPhase('sum-reasoning'); setSumStep(0); }}>
              <span>📝</span> 一键总结面谈
            </button>
          )}
        </div>
      )}

      {/* Summary Reasoning */}
      {(phase === 'sum-reasoning' || phase === 'minutes' || phase === 'sent') && sumStep > 0 && (
        <div className="pc-reasoning-panel pc-fade-in">
          <div className="pc-rp-header">
            <span className="pc-rp-icon">🧠</span>
            <span className="pc-rp-title">AI 分析面谈内容</span>
            {phase === 'sum-reasoning' ? <span className="pc-rp-live-badge">● 处理中</span> : <span className="pc-rp-done-badge">✓ 完成</span>}
          </div>
          <div className="pc-rp-lines">
            {SUMMARY_REASONING.slice(0, sumStep).map((line, i) => (
              <div key={i} className="pc-rp-line pc-fade-in-up">
                <span className="pc-ai-tag">AI推理</span><span className="pc-rp-line-text">{line}</span>
              </div>
            ))}
            {phase === 'sum-reasoning' && (
              <div className="pc-rp-typing">
                <span className="pc-dot-pulse" /><span className="pc-dot-pulse" style={{ animationDelay: '0.22s' }} /><span className="pc-dot-pulse" style={{ animationDelay: '0.44s' }} />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Minutes */}
      {(phase === 'minutes' || phase === 'sent') && (
        <div className="sc-minutes-panel">
          <div className="sc-strategy-title">
            <span>📄</span><span>面谈纪要</span><span className="sc-badge">AI 自动生成</span>
          </div>

          {minutesStep >= 1 && (
            <div className="sc-minutes-section pc-diag-section-reveal">
              <div className="sc-minutes-label">核心卡点反馈 <span className="sc-ai-note">AI基于对话语义自动提炼</span></div>
              <div className="sc-minutes-item"><span className="sc-dot-red" />连续两周零出单 → 士气塌方 → 早会出勤率跌至30%以下</div>
              <div className="sc-minutes-item"><span className="sc-dot-red" />缺乏盘客方法 → 属员不知道拜访谁/聊什么 → 1V1+1VN双低</div>
            </div>
          )}

          {minutesStep >= 2 && (
            <div className="sc-minutes-section pc-diag-section-reveal">
              <div className="sc-minutes-label">达成共识</div>
              <div className="sc-minutes-item"><span className="sc-check">☑</span> 暂不强压大单业绩，先恢复团队建制+基础活动量</div>
              <div className="sc-minutes-item"><span className="sc-check">☑</span> 本周重心：重塑早会价值 + 精细化盘客</div>
              <div className="sc-minutes-item"><span className="sc-check">☑</span> 接受朝阳部李平安跨区协同帮扶</div>
            </div>
          )}

          {minutesStep >= 3 && (
            <div className="sc-minutes-section pc-diag-section-reveal">
              <div className="sc-minutes-label">AI 自动生成闭环任务</div>
              {[
                { text: '对近期未参会属员进行逐一摸底', owner: '张仟', due: '本周三', multi: false },
                { text: '完成全员客户KYC盘点，建立拜访计划表', owner: '张仟', due: '本周五', multi: false },
                { text: '朝阳营业部经理李平安带队入场进行1VN实战分享与现场带教', owner: '李平安', due: '本周四', multi: true },
              ].map((item, i) => (
                <div key={i} className={`sc-task-row ${item.multi ? 'sc-task-row-multi' : ''}`}>
                  <span className="sc-check">☑</span>
                  <div>
                    <div className="sc-task-text">任务{i + 1}：{item.text}</div>
                    <div className="sc-task-meta">责任人：{item.owner} &nbsp;·&nbsp; 截止：{item.due}</div>
                    {item.multi && (
                      <div className="sc-multi-badge">⚡ 多智能体协同 · 已同步至朝阳部经营智能体，李平安工作台将自动显示该任务</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {minutesStep >= 4 && phase === 'minutes' && (
            <button className="pc-cta-btn pc-diag-section-reveal" onClick={() => setPhase('sent')}>
              <span>📨</span> 一键下发指令
            </button>
          )}

          {phase === 'sent' && (
            <div className="sc-sent-confirm pc-fade-in">
              <span style={{ fontSize: '20px' }}>✅</span>
              <div>
                <div className="sc-sent-title">下发成功</div>
                <div className="sc-sent-sub">面谈纪要已生成 &nbsp;·&nbsp; 任务已通过企微下发给张仟 &nbsp;·&nbsp; 协同任务已同步发送至李平安 &nbsp;·&nbsp; 追踪时间节点已写入AI日历</div>
              </div>
            </div>
          )}
        </div>
      )}
      <NarratorSubtitle text={narratorText} />
    </div>
  );
}
