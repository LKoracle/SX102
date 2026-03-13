import { useState, useEffect } from 'react';

interface WelcomePageProps {
  onStart: () => void;
}

function getTimeString() {
  const now = new Date();
  const h = now.getHours().toString().padStart(2, '0');
  const m = now.getMinutes().toString().padStart(2, '0');
  return `${h}:${m}`;
}

function getDateString() {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const weekDays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  const weekDay = weekDays[now.getDay()];
  return `${year}年${month}月${day}日  ${weekDay}`;
}

export function WelcomePage({ onStart }: WelcomePageProps) {
  const [timeStr, setTimeStr] = useState(getTimeString());

  useEffect(() => {
    const timer = setInterval(() => setTimeStr(getTimeString()), 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      style={{
        height: '100%',
        background: 'linear-gradient(180deg, #EBF5FF 0%, #E0F2FE 50%, #DBEAFE 100%)',
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch' as React.CSSProperties['WebkitOverflowScrolling'],
        padding: '20px 16px 16px',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

        {/* Top hero card */}
        <div style={{
          background: 'linear-gradient(135deg, #3B5EDB 0%, #4F6FE8 60%, #6C82F0 100%)',
          borderRadius: 20,
          padding: '22px 22px 20px',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(59,94,219,0.28)',
        }}>
          {/* decorative circle top right */}
          <div style={{
            position: 'absolute', top: -28, right: -28,
            width: 110, height: 110,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.12)',
          }} />
          <div style={{
            position: 'absolute', top: 20, right: 20,
            width: 60, height: 60,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.10)',
          }} />

          {/* Time */}
          <div style={{
            fontSize: 52,
            fontWeight: 800,
            color: '#fff',
            letterSpacing: -1,
            lineHeight: 1,
            marginBottom: 6,
          }}>
            {timeStr}
          </div>
          <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)', marginBottom: 16 }}>
            {getDateString()}
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: 'rgba(255,255,255,0.25)', marginBottom: 16 }} />

          {/* User info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 44, height: 44,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #F59E0B, #FBBF24)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 22,
              flexShrink: 0,
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            }}>
              👩
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 17, fontWeight: 700, color: '#fff' }}>王芳</span>
                <span style={{
                  fontSize: 12, color: 'rgba(255,255,255,0.85)',
                  background: 'rgba(255,255,255,0.15)',
                  borderRadius: 20, padding: '2px 8px',
                }}>资深寿险顾问</span>
              </div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)', marginTop: 3 }}>
                平安人寿 · 星耀营业区
              </div>
            </div>
          </div>
        </div>

        {/* 今日提示 */}
        <div style={{
          background: '#fff',
          borderRadius: 16,
          padding: '16px 18px',
          boxShadow: '0 2px 12px rgba(59,94,219,0.07)',
        }}>
          <div style={{ fontSize: 12, color: '#94A3B8', marginBottom: 10, fontWeight: 500 }}>今日提示</div>
          <div style={{ fontSize: 16, lineHeight: 1.65, color: '#1E293B', fontWeight: 600 }}>
            早上好，美好的一天从现在开始，王芳。 今日 AI 助手已就绪，带您完成从
            <span style={{ color: '#3B5EDB' }}>圈客</span>
            到
            <span style={{ color: '#7C3AED' }}>转化</span>
            的完整销售闭环。
          </div>
        </div>

        {/* 今日重点工作 */}
        <div style={{
          background: '#fff',
          borderRadius: 16,
          padding: '16px 18px',
          boxShadow: '0 2px 12px rgba(59,94,219,0.07)',
        }}>
          <div style={{ fontSize: 12, color: '#94A3B8', marginBottom: 14, fontWeight: 500 }}>今日重点工作</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* 圈客 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: 'linear-gradient(135deg, #FFF7ED, #FEF3C7)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 22, flexShrink: 0,
              }}>🗂️</div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#3B5EDB', marginBottom: 2 }}>圈客</div>
                <div style={{ fontSize: 13, color: '#64748B', lineHeight: 1.4 }}>
                  AI 智能盘点本月 20 位优质目标客户
                </div>
              </div>
            </div>

            {/* 触客 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: 'linear-gradient(135deg, #F0FDF4, #DCFCE7)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 22, flexShrink: 0,
              }}>📲</div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#1E293B', marginBottom: 2 }}>触客</div>
                <div style={{ fontSize: 13, color: '#64748B', lineHeight: 1.4 }}>
                  微信实时互动，AI 生成专属活动邀请函
                </div>
              </div>
            </div>

            {/* 访客·转化 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: 'linear-gradient(135deg, #FAF5FF, #F3E8FF)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 22, flexShrink: 0,
              }}>🏆</div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#7C3AED', marginBottom: 2 }}>访客 · 转化</div>
                <div style={{ fontSize: 13, color: '#64748B', lineHeight: 1.4 }}>
                  定制方案 + 话术，潜在收入 16,880 元
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
          {[
            { num: '20', unit: '位', label: '目标客户' },
            { num: '3', unit: '步', label: '完整闭环' },
            { num: '1', unit: '单', label: '潜在成交' },
          ].map((item) => (
            <div key={item.label} style={{
              background: '#fff',
              borderRadius: 14,
              padding: '14px 8px',
              textAlign: 'center',
              boxShadow: '0 2px 12px rgba(59,94,219,0.07)',
            }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 2 }}>
                <span style={{ fontSize: 28, fontWeight: 800, color: '#1E293B', lineHeight: 1 }}>{item.num}</span>
                <span style={{ fontSize: 13, color: '#64748B', fontWeight: 500 }}>{item.unit}</span>
              </div>
              <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 4 }}>{item.label}</div>
            </div>
          ))}
        </div>

        {/* CTA button */}
        <button
          onClick={onStart}
          style={{
            width: '100%',
            padding: '16px 0',
            background: 'linear-gradient(135deg, #3B5EDB, #5B7CF0)',
            border: 'none',
            borderRadius: 16,
            color: '#fff',
            fontSize: 17,
            fontWeight: 700,
            letterSpacing: 1,
            cursor: 'pointer',
            boxShadow: '0 6px 24px rgba(59,94,219,0.35)',
            transition: 'transform 0.1s, box-shadow 0.1s',
          }}
          onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.97)')}
          onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          onTouchStart={(e) => (e.currentTarget.style.transform = 'scale(0.97)')}
          onTouchEnd={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          开始今天的工作 →
        </button>

        {/* Footer */}
        <div style={{ textAlign: 'center', fontSize: 11, color: '#94A3B8', paddingBottom: 8 }}>
          平安人寿 · AI 赋能外勤营销 · 仅供演示
        </div>
      </div>
    </div>
  );
}
