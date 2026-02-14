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
          className="text-sm leading-relaxed whitespace-pre-wrap"
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
          className="text-sm leading-relaxed whitespace-pre-wrap"
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

  if (!isAi) {
    return (
      <div className="flex justify-end mb-3 animate-fade-in-up px-4">
        <div className="max-w-[80%] bg-gradient-to-br from-primary to-secondary text-white rounded-2xl rounded-tr-sm px-4 py-2.5 shadow-md shadow-primary/10">
          <p className="text-sm">{message.content}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-2.5 mb-3 animate-slide-in-left px-4">
      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm shadow-primary/20">
        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
        </svg>
      </div>
      <div className="max-w-[85%]">
        {message.type === 'text' ? (
          <div className="glass rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-white/40">
            {renderContent()}
          </div>
        ) : (
          <div className="w-full">{renderContent()}</div>
        )}
      </div>
    </div>
  );
}
