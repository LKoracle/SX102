import { useRef, useEffect } from 'react';
import type { WeChatChatMessage, WeChatMoment, WeChatScreenshotHelper } from '../types';

interface WeChatSimulatorProps {
  currentView: 'chat' | 'moments';
  chatMessages: WeChatChatMessage[];
  moments: WeChatMoment[];
  screenshotHelper: WeChatScreenshotHelper | null;
  onSwitchView: (view: 'chat' | 'moments') => void;
}

function WeChatHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="wechat-header">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <span style={{ fontSize: 16, color: '#000', opacity: 0.6 }}>‹</span>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#000' }}>{title}</div>
          {subtitle && <div style={{ fontSize: 10, color: '#999' }}>{subtitle}</div>}
        </div>
        <span style={{ fontSize: 14, color: '#000', opacity: 0.5 }}>⋯</span>
      </div>
    </div>
  );
}

function WeChatNavTabs({ currentView, onSwitch }: { currentView: 'chat' | 'moments'; onSwitch: (v: 'chat' | 'moments') => void }) {
  return (
    <div className="wechat-nav-tabs">
      <button
        className={`wechat-nav-tab ${currentView === 'chat' ? 'active' : ''}`}
        onClick={() => onSwitch('chat')}
      >
        💬 聊天
      </button>
      <button
        className={`wechat-nav-tab ${currentView === 'moments' ? 'active' : ''}`}
        onClick={() => onSwitch('moments')}
      >
        📷 朋友圈
      </button>
    </div>
  );
}

function ChatBubble({ msg }: { msg: WeChatChatMessage }) {
  const isMe = msg.sender === 'xiaoli';
  const avatar = isMe ? '🧑‍💼' : '👤';
  const name = isMe ? '小李' : '王哥';

  return (
    <div className={`wechat-bubble-row ${isMe ? 'right' : 'left'}`}>
      {!isMe && <div className="wechat-avatar wangge">{avatar}</div>}
      <div style={{ maxWidth: '75%' }}>
        {!isMe && <div style={{ fontSize: 10, color: '#999', marginBottom: 2 }}>{name}</div>}
        {msg.contentType === 'file' ? (
          <div className="wechat-bubble file">
            <span style={{ fontSize: 20 }}>📄</span>
            <div>
              <div style={{ fontSize: 11, color: '#333', fontWeight: 500 }}>{msg.content.replace('[文件] ', '')}</div>
              <div style={{ fontSize: 9, color: '#999' }}>文件</div>
            </div>
          </div>
        ) : (
          <div className={`wechat-bubble ${isMe ? 'right' : 'left'}`}>
            {msg.content}
          </div>
        )}
        {msg.timestamp && <div style={{ fontSize: 9, color: '#bbb', marginTop: 2, textAlign: isMe ? 'right' : 'left' }}>{msg.timestamp}</div>}
      </div>
      {isMe && <div className="wechat-avatar xiaoli">{avatar}</div>}
    </div>
  );
}

function MomentPost({ moment }: { moment: WeChatMoment }) {
  return (
    <div className="wechat-moment-item">
      <div className="wechat-moment-header">
        <div className="wechat-moment-avatar">{moment.avatar || '👤'}</div>
        <div className="wechat-moment-author">{moment.author}</div>
      </div>
      <div className="wechat-moment-content">{moment.content}</div>
      {/* Real images */}
      {moment.imageUrls && moment.imageUrls.length > 0 ? (
        <div className="wechat-moment-images">
          {moment.imageUrls.map((url, i) => (
            <img
              key={i}
              src={url}
              alt={moment.images?.[i] || `图片${i + 1}`}
              className="wechat-moment-img-placeholder"
              style={{ objectFit: 'cover' }}
              loading="lazy"
            />
          ))}
        </div>
      ) : moment.images && moment.images.length > 0 ? (
        <div className="wechat-moment-images">
          {moment.images.map((img, i) => (
            <div key={i} className="wechat-moment-img-placeholder">{img}</div>
          ))}
        </div>
      ) : null}
      <div className="wechat-moment-time">{moment.time}</div>
      {((moment.likes && moment.likes.length > 0) || (moment.comments && moment.comments.length > 0)) && (
        <div className="wechat-moment-interactions">
          {moment.likes && moment.likes.length > 0 && (
            <div className="wechat-moment-likes">❤️ {moment.likes.join('，')}</div>
          )}
          {moment.comments && moment.comments.map((c, i) => (
            <div key={i} className="wechat-moment-comment">
              <span className="wechat-moment-comment-author">{c.author}：</span>{c.content}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ScreenshotHelperOverlay({ helper }: { helper: WeChatScreenshotHelper }) {
  return (
    <div className="wechat-screenshot-overlay">
      <div className="wechat-screenshot-title">⚡ 输入法AI截图帮回</div>
      <div className="wechat-screenshot-analysis">
        <div style={{ marginBottom: 4, fontWeight: 500, color: '#fff', fontSize: 11 }}>📸 截图识别</div>
        <div>{helper.screenshot}</div>
        <div style={{ marginTop: 6, fontWeight: 500, color: '#fff', fontSize: 11 }}>🔍 AI分析</div>
        <div>{helper.analysis}</div>
      </div>
      <div className="wechat-screenshot-reply">
        <div style={{ marginBottom: 4, fontWeight: 500, fontSize: 11 }}>✏️ 推荐回复</div>
        {helper.generatedReply}
      </div>
    </div>
  );
}

function WeChatInputBar() {
  return (
    <div className="wechat-input-bar">
      <span style={{ fontSize: 16 }}>🎤</span>
      <div className="wechat-input-field">输入消息...</div>
      <span style={{ fontSize: 16 }}>😊</span>
      <span style={{ fontSize: 16 }}>＋</span>
    </div>
  );
}

export function WeChatSimulator({ currentView, chatMessages, moments, screenshotHelper, onSwitchView }: WeChatSimulatorProps) {
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
      <WeChatHeader
        title={currentView === 'chat' ? '王哥' : '朋友圈'}
        subtitle={currentView === 'chat' ? '在线' : undefined}
      />
      <WeChatNavTabs currentView={currentView} onSwitch={onSwitchView} />

      {currentView === 'chat' ? (
        <div className="wechat-chat-area">
          {chatMessages.length === 0 && (
            <div style={{ textAlign: 'center', color: '#999', fontSize: 12, marginTop: 40 }}>
              暂无消息
            </div>
          )}
          {chatMessages.map((msg, i) => (
            <ChatBubble key={i} msg={msg} />
          ))}
          <div ref={chatEndRef} />
        </div>
      ) : (
        <div className="wechat-moments-area">
          {moments.length === 0 && (
            <div style={{ textAlign: 'center', color: '#999', fontSize: 12, marginTop: 40 }}>
              暂无朋友圈动态
            </div>
          )}
          {moments.map((m, i) => (
            <MomentPost key={i} moment={m} />
          ))}
        </div>
      )}

      <WeChatInputBar />

      {screenshotHelper && screenshotHelper.visible && (
        <ScreenshotHelperOverlay helper={screenshotHelper} />
      )}
    </div>
  );
}
