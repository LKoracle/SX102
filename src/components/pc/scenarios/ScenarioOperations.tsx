import { useState, useRef } from 'react';
import { useNarrator, NarratorSubtitle } from '../Narrator';

interface Props { onBack: () => void; }

const CMD1 = '请帮我每周五分析营业部月钻石占比，对第一个达成35%、本周排名最高的营业部发贺报到微信群。';
const CMD2 = '请帮我对每月钻石占比排名第一的营业部、超过单件保费50万大单代理人制作榜样案例，并转发微信群传播。';

const R1 = [
  '语音识别完成，正在解析指令… 识别到关键意图：①分析维度=月钻石占比；②触发条件=达成35%且排名第一；③动作=生成贺报；④渠道=微信群；⑤频率=每周五。正在调取本周8个营业部钻石占比数据…',
  '数据扫描完成：朝阳部月钻石占比35%，本周排名第一 → 符合触发条件 → 自动调用内容创作智能体生成贺报',
];

const R2 = [
  '语音识别完成，正在解析指令… 识别到关键意图：①对象A=钻石占比排名第一的营业部；②对象B=单件保费超50万大单代理人；③动作=挖掘制作榜样案例；④渠道=微信群传播；⑤频率=每月。正在调取本月全区业绩数据…',
  '数据匹配完成：朝阳部李平安经理（钻石占比第一）、王帅（保费60万大单）符合条件 → 自动调用案例挖掘智能体启动案例制作',
];

export function ScenarioOperations({ onBack }: Props) {
  const [step, setStep] = useState(0);
  const [r1Lines, setR1Lines] = useState(0);
  const [r2Lines, setR2Lines] = useState(0);
  const [confirmed, setConfirmed] = useState(false);
  const [honorOpen, setHonorOpen] = useState(false);
  const [micReady, setMicReady] = useState(1); // 1=ready for cmd1, 2=ready for cmd2, 0=not ready
  const [typed1, setTyped1] = useState(0);
  const [typed2, setTyped2] = useState(0);
  const bodyRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const typingRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { narratorText, speak } = useNarrator();

  const scroll = () => setTimeout(() => { if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight; }, 80);

  const handleMicClick = () => {
    if (micReady === 1) {
      setMicReady(0);
      setStep(1);
      setTyped1(0);
      scroll();
      // Character-by-character typing effect
      const iv1 = Math.floor(4400 / CMD1.length);
      let c1 = 0;
      if (typingRef.current) clearInterval(typingRef.current);
      typingRef.current = setInterval(() => {
        c1++;
        setTyped1(c1);
        if (c1 >= CMD1.length && typingRef.current) clearInterval(typingRef.current);
      }, iv1);
      timersRef.current = [
        setTimeout(() => { if (typingRef.current) clearInterval(typingRef.current); setTyped1(CMD1.length); setStep(2); scroll(); }, 4700),
        setTimeout(() => { setStep(3); setR1Lines(1); scroll(); }, 5700),
        setTimeout(() => { setR1Lines(2); scroll(); }, 7700),
        setTimeout(() => { setStep(4); setHonorOpen(true); scroll(); setMicReady(2); speak('分析完成。朝阳部月钻石占比35%，排名第一，贺报已制作好并发送到微信群，同时创建了每周五自动执行的周期任务。'); }, 9400),
      ];
    } else if (micReady === 2) {
      setMicReady(0);
      setStep(5);
      setTyped2(0);
      scroll();
      const iv2 = Math.floor(4200 / CMD2.length);
      let c2 = 0;
      if (typingRef.current) clearInterval(typingRef.current);
      typingRef.current = setInterval(() => {
        c2++;
        setTyped2(c2);
        if (c2 >= CMD2.length && typingRef.current) clearInterval(typingRef.current);
      }, iv2);
      timersRef.current = [
        ...timersRef.current,
        setTimeout(() => { if (typingRef.current) clearInterval(typingRef.current); setTyped2(CMD2.length); setStep(6); scroll(); }, 4500),
        setTimeout(() => { setStep(7); setR2Lines(1); scroll(); }, 5500),
        setTimeout(() => { setR2Lines(2); scroll(); }, 7500),
        setTimeout(() => { setStep(8); scroll(); speak('榜样案例已制作完成。包含李平安钻石达标和王帅大单绩优两个案例的海报和转发文案，请您确认后转发到全区微信群。'); }, 9000),
      ];
    }
  };

  const handleConfirm = () => { setConfirmed(true); setStep(9); scroll(); speak('好的，案例已转发至全区8个营业部微信群，周期任务已写入AI日历，后续每月自动执行。'); };

  return (
    <div className="sc-body-outer">
      <div className="sc-body-scroll" ref={bodyRef}>
        {/* Scene Header */}
        <div className="pc-scene-header">
          <div>
            <div className="pc-scene-title-row">
              <h1 className="pc-scene-title"><span className="pc-scene-title-icon">🤖</span>周五自动化运营</h1>
            </div>
            <div className="pc-scene-meta-row">
              <span className="pc-meta-dot" /><span className="pc-meta-text">人机对话驱动贺报与案例宣发</span>
              <span className="pc-meta-sep">·</span><span className="pc-meta-text">STEP 1 贺报自动生成与发布</span>
              <span className="pc-meta-sep">·</span><span className="pc-meta-text">STEP 2 榜样案例挖掘与全区宣发</span>
            </div>
          </div>
          <button className="pc-btn-reinspect" onClick={onBack}>← 返回</button>
        </div>

        {/* Chat Container */}
        <div className="sc-chat-wrap">

          {/* ── Command 1 ── */}
          {step >= 1 && (
            <div className="sc-chat-row sc-chat-user pc-fade-in-up">
              <div className="sc-chat-bubble-user">
                {step === 1 ? (
                  <div className="sc-voice-active">
                    <span className="sc-mic-icon">🎙️</span>
                    <div className="sc-waveform">
                      {[...Array(12)].map((_, i) => <span key={i} className="sc-wave-bar" style={{ animationDelay: `${i * 0.08}s` }} />)}
                    </div>
                    {typed1 > 0 && (
                      <div className="sc-voice-typing">{CMD1.slice(0, typed1)}<span className="sc-typing-cursor" /></div>
                    )}
                  </div>
                ) : (
                  <span className="sc-voice-text">{CMD1}</span>
                )}
              </div>
              <span className="sc-avatar-user">我</span>
            </div>
          )}

          {/* Reasoning 1 */}
          {step >= 3 && r1Lines > 0 && (
            <div className="pc-reasoning-panel pc-fade-in" style={{ margin: '12px 0' }}>
              <div className="pc-rp-header">
                <span className="pc-rp-icon">🧠</span>
                <span className="pc-rp-title">AI 解析指令</span>
                {step === 3 ? <span className="pc-rp-live-badge">● 处理中</span> : <span className="pc-rp-done-badge">✓ 完成</span>}
              </div>
              <div className="pc-rp-lines">
                {R1.slice(0, r1Lines).map((line, i) => (
                  <div key={i} className="pc-rp-line pc-fade-in-up">
                    <span className="pc-ai-tag">{i === 0 ? 'AI推理' : 'AI执行'}</span><span className="pc-rp-line-text">{line}</span>
                  </div>
                ))}
                {step === 3 && r1Lines < 2 && (
                  <div className="pc-rp-typing">
                    <span className="pc-dot-pulse" /><span className="pc-dot-pulse" style={{ animationDelay: '0.22s' }} /><span className="pc-dot-pulse" style={{ animationDelay: '0.44s' }} />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* AI reply 1 + 贺报 modal + cycle task + calendar + done */}
          {step >= 4 && (
            <>
              {/* 贺报 overlay modal — 4:3 poster / certificate style */}
              {honorOpen && (
                <div className="sc-honor-overlay">
                  <div className="sc-honor-overlay-bg" onClick={() => setHonorOpen(false)} />
                  <div className="sc-honor-poster">
                    <button className="sc-honor-poster-close" onClick={() => setHonorOpen(false)}>✕</button>
                    {/* Decorative corner ornaments */}
                    <div className="sc-honor-corner sc-honor-corner-tl" />
                    <div className="sc-honor-corner sc-honor-corner-tr" />
                    <div className="sc-honor-corner sc-honor-corner-bl" />
                    <div className="sc-honor-corner sc-honor-corner-br" />
                    {/* Inner border */}
                    <div className="sc-honor-inner-border">
                      <div className="sc-honor-poster-header">贺 报</div>
                      <div className="sc-honor-poster-trophy">🏆</div>
                      <div className="sc-honor-poster-congrats">恭喜</div>
                      <div className="sc-honor-poster-dept">朝阳营业部</div>
                      <div className="sc-honor-poster-achievement">
                        月钻石占比达成 <span className="sc-honor-poster-number">35%</span>
                      </div>
                      <div className="sc-honor-poster-rank">本周排名第一</div>
                      <div className="sc-honor-poster-divider" />
                      <div className="sc-honor-poster-date">2026年3月</div>
                    </div>
                  </div>
                </div>
              )}

              <div className="sc-chat-row sc-chat-ai pc-fade-in-up">
                <span className="sc-avatar-ai">AI</span>
                <div className="sc-chat-bubble-ai">
                  <div className="sc-ai-reply-text">已为您完成分析：朝阳部月钻石占比35%，本周排名第一。贺报已制作完成并发送到区经理微信群。</div>
                </div>
              </div>

              {/* Inline honor badge (always visible in chat flow) */}
              <div className="sc-honor-pop pc-fade-in" onClick={() => setHonorOpen(true)} style={{ cursor: 'pointer' }}>
                <span className="sc-honor-icon">🏆</span>
                <div>
                  <div className="sc-honor-title">恭喜朝阳部</div>
                  <div className="sc-honor-sub">月钻石占比35%，本周排名第一！</div>
                </div>
                <span className="sc-honor-check">✓ 已发送</span>
              </div>

              <div className="sc-chat-row sc-chat-ai pc-fade-in-up">
                <span className="sc-avatar-ai">AI</span>
                <div className="sc-chat-bubble-ai">
                  <div className="sc-ai-reply-text" style={{ fontSize: 12, color: '#3B82F6' }}>
                    ⚡ 检测到用户指令包含"每周五"周期关键词 → 自动创建周期任务：每周五 09:00 执行"钻石占比分析+贺报生成"，写入AI日历
                  </div>
                  <div className="sc-calendar-entry" style={{ marginTop: 10 }}>
                    <span className="sc-cal-icon">📅</span>
                    <div>
                      <div className="sc-cal-title">已写入AI日历 · 每周五 09:00</div>
                      <div className="sc-cal-sub">钻石占比分析 + 贺报自动生成 &nbsp;·&nbsp; 自动执行</div>
                    </div>
                    <span className="sc-cal-badge">周期任务</span>
                  </div>
                  <div className="sc-sent-confirm pc-fade-in" style={{ marginTop: 12 }}>
                    <span style={{ fontSize: 16 }}>✅</span>
                    <div>
                      <div className="sc-sent-title">贺报已自动发送至区经理微信群</div>
                      <div className="sc-sent-sub">自动任务已写入AI日历 &nbsp;·&nbsp; 后续每周五自动执行</div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ── Command 2 ── */}
          {step >= 5 && (
            <div className="sc-chat-row sc-chat-user pc-fade-in-up">
              <div className="sc-chat-bubble-user">
                {step === 5 ? (
                  <div className="sc-voice-active">
                    <span className="sc-mic-icon">🎙️</span>
                    <div className="sc-waveform">
                      {[...Array(12)].map((_, i) => <span key={i} className="sc-wave-bar" style={{ animationDelay: `${i * 0.08}s` }} />)}
                    </div>
                    {typed2 > 0 && (
                      <div className="sc-voice-typing">{CMD2.slice(0, typed2)}<span className="sc-typing-cursor" /></div>
                    )}
                  </div>
                ) : (
                  <span className="sc-voice-text">{CMD2}</span>
                )}
              </div>
              <span className="sc-avatar-user">我</span>
            </div>
          )}

          {/* Reasoning 2 */}
          {step >= 7 && r2Lines > 0 && (
            <div className="pc-reasoning-panel pc-fade-in" style={{ margin: '12px 0' }}>
              <div className="pc-rp-header">
                <span className="pc-rp-icon">🧠</span>
                <span className="pc-rp-title">AI 解析指令 · 多智能体协同</span>
                {step === 7 ? <span className="pc-rp-live-badge">● 处理中</span> : <span className="pc-rp-done-badge">✓ 完成</span>}
              </div>
              <div className="pc-rp-lines">
                {R2.slice(0, r2Lines).map((line, i) => (
                  <div key={i} className="pc-rp-line pc-fade-in-up">
                    <span className="pc-ai-tag">{i === 0 ? 'AI推理' : 'AI执行'}</span><span className="pc-rp-line-text">{line}</span>
                  </div>
                ))}
                {step === 7 && r2Lines < 2 && (
                  <div className="pc-rp-typing">
                    <span className="pc-dot-pulse" /><span className="pc-dot-pulse" style={{ animationDelay: '0.22s' }} /><span className="pc-dot-pulse" style={{ animationDelay: '0.44s' }} />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* AI reply 2 — rich case output + poster + copy + confirm */}
          {step >= 8 && (
            <div className="sc-chat-row sc-chat-ai pc-fade-in-up">
              <span className="sc-avatar-ai">AI</span>
              <div className="sc-chat-bubble-ai">
                <div className="sc-ai-reply-text">好的，本月已为您分析数据，正在对朝阳部李平安经理（钻石占比第一）、王帅（保费60万大单）挖掘制作案例。</div>
                {!confirmed ? (
                  <>
                    <div className="sc-ai-reply-text" style={{ marginTop: 8 }}>
                      已完成朝阳部李平安经理、王帅绩优的案例制作。以下是为您生成的榜样案例海报、宣传文案，请确认后转发到微信群：
                    </div>

                    {/* ── Case 1: 李平安 钻石达标 ── */}
                    <div className="sc-case-card">
                      <div className="sc-case-card-header sc-case-card-diamond">
                        <span className="sc-case-card-badge">🏆 钻石达标榜样</span>
                        <span className="sc-case-card-tag">AI生成</span>
                      </div>
                      {/* Poster preview */}
                      <div className="sc-case-poster sc-case-poster-diamond">
                        <div className="sc-case-poster-top">榜 样 案 例</div>
                        <div className="sc-case-poster-avatar">李</div>
                        <div className="sc-case-poster-name">朝阳部 · 李平安</div>
                        <div className="sc-case-poster-stat">月钻石占比 <span>35%</span> · 排名第一</div>
                        <div className="sc-case-poster-quote">"客户经营没有捷径，每天坚持3个有效拜访，坚持盘客，才有今天的结果。"</div>
                      </div>
                      {/* Promotion style */}
                      <div className="sc-case-style-row">
                        <span className="sc-case-style-label">宣传风格</span>
                        <span className="sc-case-style-value">数据驱动 + 经验萃取 + 金句提炼</span>
                      </div>
                      {/* Forwarding copy */}
                      <div className="sc-case-copy-box">
                        <div className="sc-case-copy-label">微信群转发文案</div>
                        <div className="sc-case-copy-text">
                          【榜样力量】朝阳部李平安经理，月钻石占比35%，全区排名第一！他的秘诀：每天坚持3个有效拜访+精细化盘客管理。从客户KYC到需求分析，每一步都做到极致。这份坚持值得每一位伙伴学习！向李平安经理致敬，大家一起加油！
                        </div>
                      </div>
                    </div>

                    {/* ── Case 2: 王帅 大单绩优 ── */}
                    <div className="sc-case-card">
                      <div className="sc-case-card-header sc-case-card-premium">
                        <span className="sc-case-card-badge">💰 大单绩优榜样</span>
                        <span className="sc-case-card-tag">AI生成</span>
                      </div>
                      {/* Poster preview */}
                      <div className="sc-case-poster sc-case-poster-premium">
                        <div className="sc-case-poster-top">榜 样 案 例</div>
                        <div className="sc-case-poster-avatar sc-case-poster-avatar-gold">王</div>
                        <div className="sc-case-poster-name">朝阳部 · 王帅</div>
                        <div className="sc-case-poster-stat">单件保费 <span>60万</span> · 大单实战</div>
                        <div className="sc-case-poster-quote">"大单不是运气，是足够了解客户后的精准匹配。做好KYC，客户自然会信任你。"</div>
                      </div>
                      {/* Promotion style */}
                      <div className="sc-case-style-row">
                        <span className="sc-case-style-label">宣传风格</span>
                        <span className="sc-case-style-value">实战拆解 + 方法论提炼 + 可复制路径</span>
                      </div>
                      {/* Forwarding copy */}
                      <div className="sc-case-copy-box">
                        <div className="sc-case-copy-label">微信群转发文案</div>
                        <div className="sc-case-copy-text">
                          【大单喜报】朝阳部王帅，单件保费60万！他用了什么方法？深度KYC锁定高净值客户需求，通过3次专业面谈建立信任，最终精准匹配年金+终身寿组合方案。大单没有秘密，只有专业与坚持。向王帅学习，人人都能开大单！
                        </div>
                      </div>
                    </div>

                    <button className="pc-cta-btn" style={{ marginTop: 14, fontSize: 13 }} onClick={handleConfirm}>
                      确认，转发到全区微信群
                    </button>
                  </>
                ) : null}
              </div>
            </div>
          )}

          {/* Done state */}
          {step >= 9 && confirmed && (
            <>
              <div className="sc-chat-row sc-chat-ai pc-fade-in-up">
                <span className="sc-avatar-ai">AI</span>
                <div className="sc-chat-bubble-ai">
                  <div className="sc-ai-reply-text" style={{ fontSize: 12, color: '#3B82F6' }}>
                    ⚡ 案例已入库并自动打标签（#钻石达标 #大单绩优），转发至全区8个营业部微信群。检测到"每月"周期关键词 → 自动创建周期任务，写入AI日历
                  </div>
                  <div className="sc-calendar-entry" style={{ marginTop: 10 }}>
                    <span className="sc-cal-icon">📅</span>
                    <div>
                      <div className="sc-cal-title">已写入AI日历 · 每月</div>
                      <div className="sc-cal-sub">榜样案例挖掘 + 全区宣发 &nbsp;·&nbsp; 自动执行</div>
                    </div>
                    <span className="sc-cal-badge">周期任务</span>
                  </div>
                  <div className="sc-sent-confirm pc-fade-in" style={{ marginTop: 12 }}>
                    <span style={{ fontSize: 16 }}>✅</span>
                    <div>
                      <div className="sc-sent-title">优秀案例已入库并转发至全区微信群</div>
                      <div className="sc-sent-sub">自动任务已写入AI日历 &nbsp;·&nbsp; 后续每月自动执行</div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Chat input bar — fixed at bottom */}
      {micReady > 0 && (
        <div className="sc-input-bar pc-fade-in-up">
          <div className="sc-input-bar-inner">
            <div className="sc-input-placeholder">点击麦克风，语音输入指令…</div>
            <button className="sc-input-mic-btn" onClick={handleMicClick}>
              <span className="sc-input-mic-icon">🎙️</span>
              <span className="sc-input-mic-pulse" />
            </button>
          </div>
        </div>
      )}
      <NarratorSubtitle text={narratorText} />
    </div>
  );
}