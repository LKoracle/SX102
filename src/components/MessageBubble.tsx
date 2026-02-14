import type { Message } from '../types';
import { CustomerCard } from './cards/CustomerCard';
import { PlanCard } from './cards/PlanCard';
import { ProductCard } from './cards/ProductCard';
import { CoverageGapCard } from './cards/CoverageGapCard';
import { TeamDashboard } from './cards/TeamDashboard';
import { MemberCard } from './cards/MemberCard';
import { VisitSummaryCard } from './cards/VisitSummaryCard';
import { WorkSummaryCard } from './cards/WorkSummaryCard';
import { ScheduleCard } from './cards/ScheduleCard';
import { IncomeCard } from './cards/IncomeCard';
import { NearbyCustomersCard } from './cards/NearbyCustomersCard';

interface MessageBubbleProps {
  message: Message;
  onSpeak?: (text: string) => void;
}

function renderMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br/>')
    .replace(
      /\|(.+)\|/g,
      (match) => {
        const cells = match.split('|').filter(Boolean);
        if (cells.every((c) => c.trim().match(/^[-:]+$/))) return '';
        const tds = cells.map((c) => `<td class="px-2 py-1 border border-border text-sm">${c.trim()}</td>`).join('');
        return `<tr>${tds}</tr>`;
      }
    );
}

function TextContent({ content, onSpeak }: { content: string; onSpeak?: (text: string) => void }) {
  const hasTable = content.includes('|') && content.includes('---');
  let beforeTable = content;
  let tableHtml = '';
  let afterTable = '';

  if (hasTable) {
    const lines = content.split('\n');
    const tableStart = lines.findIndex((l) => l.trim().startsWith('|'));
    const tableEnd = lines.findLastIndex((l) => l.trim().startsWith('|'));

    if (tableStart >= 0) {
      beforeTable = lines.slice(0, tableStart).join('\n');
      afterTable = lines.slice(tableEnd + 1).join('\n');

      const tableLines = lines.slice(tableStart, tableEnd + 1).filter(
        (l) => !l.trim().match(/^\|[-:| ]+\|$/)
      );

      const headers = tableLines[0]?.split('|').filter(Boolean).map((h) => h.trim()) || [];
      const rows = tableLines.slice(1);

      tableHtml = `<table class="w-full border-collapse my-2 text-sm"><thead><tr>${headers
        .map((h) => `<th class="px-2 py-1.5 bg-primary-50 border border-border text-left font-medium text-primary">${h}</th>`)
        .join('')}</tr></thead><tbody>${rows
        .map((row) => {
          const cells = row.split('|').filter(Boolean).map((c) => c.trim());
          return `<tr class="hover:bg-gray-50">${cells.map((c) => `<td class="px-2 py-1 border border-border">${c}</td>`).join('')}</tr>`;
        })
        .join('')}</tbody></table>`;
    }
  }

  return (
    <div className="relative group">
      {beforeTable && (
        <div
          className="text-[14px] leading-relaxed whitespace-pre-wrap"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(beforeTable) }}
        />
      )}
      {tableHtml && (
        <div
          className="overflow-x-auto"
          dangerouslySetInnerHTML={{ __html: tableHtml }}
        />
      )}
      {afterTable && (
        <div
          className="text-[14px] leading-relaxed whitespace-pre-wrap"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(afterTable) }}
        />
      )}
      {onSpeak && (
        <button
          onClick={() => onSpeak(content)}
          className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          title="朗读"
        >
          <svg className="w-3 h-3 text-primary" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
          </svg>
        </button>
      )}
    </div>
  );
}

export function MessageBubble({ message, onSpeak }: MessageBubbleProps) {
  const isAi = message.role === 'ai';

  const renderContent = () => {
    switch (message.type) {
      case 'customer-card':
        return <CustomerCard data={message.data as Record<string, unknown>} />;
      case 'plan-card':
        return <PlanCard data={message.data as Record<string, unknown>} />;
      case 'product-card':
        return <ProductCard data={message.data as Record<string, unknown>} />;
      case 'coverage-gap':
        return <CoverageGapCard data={message.data as Record<string, unknown>} />;
      case 'team-dashboard':
        return <TeamDashboard />;
      case 'member-card':
        return <MemberCard data={message.data as Record<string, unknown>} />;
      case 'visit-summary':
        return <VisitSummaryCard data={message.data as Record<string, unknown>} />;
      case 'work-summary':
        return <WorkSummaryCard data={message.data as Record<string, unknown>} />;
      case 'schedule-card':
        return <ScheduleCard data={message.data as Record<string, unknown>} />;
      case 'income-card':
        return <IncomeCard data={message.data as Record<string, unknown>} />;
      case 'nearby-customers':
        return <NearbyCustomersCard data={message.data as Record<string, unknown>} />;
      default:
        return <TextContent content={message.content} onSpeak={isAi ? onSpeak : undefined} />;
    }
  };

  // User message - right aligned with avatar
  if (!isAi) {
    return (
      <div className="flex justify-end gap-2.5 message-spacing animate-fade-in-up px-5">
        <div className="max-w-[75%] bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-[20px] rounded-tr-md px-4 py-3 shadow-sm shadow-blue-200/40">
          <p className="text-[14.5px] leading-relaxed">{message.content}</p>
        </div>
        {/* User avatar */}
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex-shrink-0 flex items-center justify-center">
          <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </div>
      </div>
    );
  }

  // AI message - left aligned with avatar
  return (
    <div className="flex gap-2.5 message-spacing animate-slide-in-left px-5">
      {/* AI avatar */}
      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex-shrink-0 flex items-center justify-center shadow-sm shadow-blue-200/30">
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
        </svg>
      </div>

      <div className="flex-1 max-w-[82%]">
        {message.type === 'text' ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-[20px] rounded-tl-md px-4 py-3 shadow-sm shadow-gray-200/30 border border-gray-200/40">
            {renderContent()}
          </div>
        ) : (
          <div>{renderContent()}</div>
        )}
      </div>
    </div>
  );
}
