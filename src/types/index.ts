export type MessageContentType =
  | 'text'
  | 'progress-list'
  | 'agent-report'
  | 'ai-call'
  | 'data-capture'
  | 'risk-radar'
  | 'root-cause'
  | 'meeting-target'
  | 'meeting-script'
  | 'response-strategy'
  | 'recording'
  | 'meeting-result'
  | 'plan-delivery'
  | 'report-upload'
  | 'report-preview'
  | 'material-config'
  | 'material-preview'
  | 'material-distribute'
  | 'case-search'
  | 'case-result'
  | 'case-interview'
  | 'case-video';

export interface Message {
  id: string;
  role: 'ai' | 'user';
  type: MessageContentType;
  content: string;
  speechText?: string;
  data?: Record<string, unknown>;
  timestamp: number;
}

export interface QuickReply {
  label: string;
  value: string;
  icon?: string;
}

export interface ScenarioStep {
  aiMessages: Array<{
    type: MessageContentType;
    content: string;
    speechText?: string;
    data?: Record<string, unknown>;
    delay?: number;
  }>;
  quickReplies?: QuickReply[];
  quickReplyDelay?: number;
}

export interface Scenario {
  id: string;
  name: string;
  icon: string;
  description: string;
  steps: ScenarioStep[];
}

export interface ChatState {
  messages: Message[];
  isTyping: boolean;
  currentScenario: string | null;
  currentStep: number;
  quickReplies: QuickReply[];
  isListening: boolean;
  isSpeaking: boolean;
}
