import { useState, useCallback, useRef } from 'react';
import type { Message, ChatState, QuickReply } from '../types';
import { scenarios } from '../data/scenarios';

let messageIdCounter = 0;
function generateId() {
  return `msg-${Date.now()}-${++messageIdCounter}`;
}

export function useChat() {
  const [state, setState] = useState<ChatState>({
    messages: [],
    isTyping: false,
    currentScenario: null,
    currentStep: 0,
    quickReplies: [],
    isListening: false,
    isSpeaking: false,
  });

  const timeoutRefs = useRef<number[]>([]);

  const clearTimeouts = useCallback(() => {
    timeoutRefs.current.forEach((t) => window.clearTimeout(t));
    timeoutRefs.current = [];
  }, []);

  const addMessage = useCallback((msg: Omit<Message, 'id' | 'timestamp'>) => {
    const newMsg: Message = {
      ...msg,
      id: generateId(),
      timestamp: Date.now(),
    };
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, newMsg],
    }));
    return newMsg;
  }, []);

  const setTyping = useCallback((typing: boolean) => {
    setState((prev) => ({ ...prev, isTyping: typing }));
  }, []);

  const setQuickReplies = useCallback((replies: QuickReply[]) => {
    setState((prev) => ({ ...prev, quickReplies: replies }));
  }, []);

  const playScenarioStep = useCallback(
    (scenarioId: string, stepIndex: number) => {
      const scenario = scenarios.find((s) => s.id === scenarioId);
      if (!scenario || stepIndex >= scenario.steps.length) return;

      const step = scenario.steps[stepIndex];
      clearTimeouts();
      setQuickReplies([]);
      setTyping(true);

      let totalDelay = 600;
      const messageCallbacks: Array<{ delay: number; msg: typeof step.aiMessages[0] }> = [];

      step.aiMessages.forEach((msg) => {
        const msgDelay = totalDelay;
        messageCallbacks.push({ delay: msgDelay, msg });
        totalDelay += (msg.delay || 400) + 600;
      });

      messageCallbacks.forEach(({ delay, msg }, index) => {
        const t = window.setTimeout(() => {
          setState((prev) => ({
            ...prev,
            isTyping: index < messageCallbacks.length - 1,
            messages: [
              ...prev.messages,
              {
                id: generateId(),
                role: 'ai' as const,
                type: msg.type,
                content: msg.content,
                data: msg.data,
                timestamp: Date.now(),
              },
            ],
          }));

          if (index === messageCallbacks.length - 1 && step.quickReplies) {
            const qrTimeout = window.setTimeout(() => {
              setQuickReplies(step.quickReplies || []);
            }, 300);
            timeoutRefs.current.push(qrTimeout);
          }
        }, delay);
        timeoutRefs.current.push(t);
      });

      setState((prev) => ({
        ...prev,
        currentScenario: scenarioId,
        currentStep: stepIndex,
      }));
    },
    [clearTimeouts, setQuickReplies, setTyping]
  );

  const startScenario = useCallback(
    (scenarioId: string) => {
      playScenarioStep(scenarioId, 0);
    },
    [playScenarioStep]
  );

  const handleQuickReply = useCallback(
    (reply: QuickReply) => {
      // Add user message
      addMessage({ role: 'user', type: 'text', content: reply.label });
      setQuickReplies([]);

      if (reply.value === 'back-to-menu') {
        setState((prev) => ({
          ...prev,
          currentScenario: null,
          currentStep: 0,
        }));
        // Show welcome quick replies
        const t = window.setTimeout(() => {
          setQuickReplies(
            scenarios.map((s) => ({
              label: `${s.icon} ${s.name}`,
              value: s.id,
            }))
          );
        }, 300);
        timeoutRefs.current.push(t);
        return;
      }

      const { currentScenario, currentStep } = state;
      if (currentScenario) {
        const scenario = scenarios.find((s) => s.id === currentScenario);
        if (scenario) {
          const nextStep = currentStep + 1;
          if (nextStep < scenario.steps.length) {
            playScenarioStep(currentScenario, nextStep);
          } else {
            // Scenario complete, show menu
            const t = window.setTimeout(() => {
              addMessage({
                role: 'ai',
                type: 'text',
                content: '还有什么我可以帮您的吗？请选择以下场景：',
              });
              setState((prev) => ({
                ...prev,
                currentScenario: null,
                currentStep: 0,
              }));
              setQuickReplies(
                scenarios.map((s) => ({
                  label: `${s.icon} ${s.name}`,
                  value: s.id,
                }))
              );
            }, 500);
            timeoutRefs.current.push(t);
          }
        }
      }
    },
    [state, addMessage, setQuickReplies, playScenarioStep]
  );

  const handleUserMessage = useCallback(
    (text: string) => {
      addMessage({ role: 'user', type: 'text', content: text });
      setQuickReplies([]);

      // Check if user text matches a scenario
      const matchedScenario = scenarios.find(
        (s) =>
          text.includes(s.name) ||
          text.includes(s.description) ||
          s.name.includes(text)
      );

      if (matchedScenario) {
        startScenario(matchedScenario.id);
        return;
      }

      // Check if in a scenario, advance to next step
      if (state.currentScenario) {
        const scenario = scenarios.find((s) => s.id === state.currentScenario);
        if (scenario) {
          const nextStep = state.currentStep + 1;
          if (nextStep < scenario.steps.length) {
            playScenarioStep(state.currentScenario, nextStep);
            return;
          }
        }
      }

      // Default response
      setTyping(true);
      const t = window.setTimeout(() => {
        addMessage({
          role: 'ai',
          type: 'text',
          content:
            '好的，我理解您的需求。请选择以下场景，我可以为您提供更专业的服务：',
        });
        setTyping(false);
        setQuickReplies(
          scenarios.map((s) => ({
            label: `${s.icon} ${s.name}`,
            value: s.id,
          }))
        );
      }, 800);
      timeoutRefs.current.push(t);
    },
    [state, addMessage, setQuickReplies, setTyping, startScenario, playScenarioStep]
  );

  const resetAndStartScenario = useCallback(
    (scenarioId: string) => {
      clearTimeouts();
      setState({
        messages: [],
        isTyping: false,
        currentScenario: null,
        currentStep: 0,
        quickReplies: [],
        isListening: false,
        isSpeaking: false,
      });
      // Use setTimeout to ensure state is reset before starting
      const t = window.setTimeout(() => {
        playScenarioStep(scenarioId, 0);
      }, 100);
      timeoutRefs.current.push(t);
    },
    [clearTimeouts, playScenarioStep]
  );

  const initChat = useCallback(() => {
    const welcomeMsg: Message = {
      id: generateId(),
      role: 'ai',
      type: 'text',
      content:
        '您好，张经理！我是您的AI智能助理\n\n今天是2025年2月14日，我已经为您准备好了今天的工作安排。\n\n📌 今日待办：\n• 10:00 拜访王建国（教育金方案）\n• 14:00 团队周例会\n• 16:00 电话跟进李美琳\n\n请选择您需要的服务：',
      timestamp: Date.now(),
    };

    setState((prev) => ({
      ...prev,
      messages: [welcomeMsg],
      quickReplies: scenarios.map((s) => ({
        label: `${s.icon} ${s.name}`,
        value: s.id,
      })),
    }));
  }, []);

  return {
    ...state,
    addMessage,
    handleQuickReply,
    handleUserMessage,
    startScenario,
    resetAndStartScenario,
    initChat,
  };
}
