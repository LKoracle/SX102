import { useEffect, useRef, useCallback } from 'react';
import { Header } from './components/Header';
import { MessageBubble } from './components/MessageBubble';
import { InputBar } from './components/InputBar';
import { QuickReplies } from './components/QuickReplies';
import { TypingIndicator } from './components/TypingIndicator';
import { useChat } from './hooks/useChat';
import { useSpeech } from './hooks/useSpeech';
import { scenarios } from './data/scenarios';

function App() {
  const chat = useChat();
  const speech = useSpeech();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chat.initChat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chat.messages, chat.isTyping, chat.quickReplies]);

  // Handle voice transcript submission
  useEffect(() => {
    if (speech.transcript && !speech.isListening) {
      const text = speech.transcript.trim();
      if (text) {
        chat.handleUserMessage(text);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [speech.isListening]);

  const handleQuickReply = useCallback(
    (reply: { label: string; value: string }) => {
      // Check if the value matches a scenario id
      const scenario = scenarios.find((s) => s.id === reply.value);
      if (scenario) {
        chat.addMessage({ role: 'user', type: 'text', content: reply.label });
        chat.startScenario(scenario.id);
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
    <div className="h-full flex flex-col max-w-lg mx-auto shadow-2xl relative overflow-hidden">
      <Header
        isSpeaking={speech.isSpeaking}
        onStopSpeaking={speech.stopSpeaking}
      />

      {/* Chat messages area */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto pt-8 pb-4"
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
    </div>
  );
}

export default App;
