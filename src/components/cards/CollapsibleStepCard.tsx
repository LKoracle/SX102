import { useState, useEffect, useRef } from 'react';
import { CustomerCard } from './CustomerCard';
import { CustomerProfileGrid } from './CustomerProfileGrid';
import { CoverageAnalysisCard } from './CoverageAnalysisCard';

interface StepItem {
  type: string;
  content?: string;
  data?: Record<string, unknown>;
}

interface CollapsibleStepCardProps {
  data: Record<string, unknown>;
}

export function CollapsibleStepCard({ data }: CollapsibleStepCardProps) {
  const title = (data.title as string) ?? '';
  const stepIcon = (data.stepIcon as string) ?? '🔍';
  const autoCollapse = (data.autoCollapse as boolean) ?? true;
  const collapseDelay = (data.collapseDelay as number) ?? 2500;
  const summary = (data.summary as string) ?? '';
  const items = (data.items as StepItem[]) ?? [];

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  // Measure content height after mount
  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [items]);

  // Auto-collapse after delay
  useEffect(() => {
    if (!autoCollapse) return;
    const timer = window.setTimeout(() => {
      setIsCompleted(true);
      setIsCollapsed(true);
    }, collapseDelay);
    return () => window.clearTimeout(timer);
  }, [autoCollapse, collapseDelay]);

  const toggle = () => setIsCollapsed((prev) => !prev);

  const renderItem = (item: StepItem, index: number) => {
    switch (item.type) {
      case 'customer-card':
        return <CustomerCard key={index} data={item.data ?? {}} />;
      case 'customer-profile-grid':
        return <CustomerProfileGrid key={index} data={item.data ?? {}} />;
      case 'coverage-analysis':
        return <CoverageAnalysisCard key={index} data={item.data ?? {}} />;
      case 'text':
        return (
          <div key={index} className="bg-white rounded-lg px-3 py-2 shadow-sm">
            <p className="text-[13px] text-gray-700 leading-relaxed">{item.content}</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="rounded-xl border border-gray-200 shadow-sm overflow-hidden bg-white">
      {/* Header */}
      <div
        className={`flex items-center justify-between px-4 py-3 cursor-pointer transition-all duration-300 ${
          isCompleted
            ? 'bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100'
            : 'bg-gradient-to-r from-blue-50 to-indigo-50'
        }`}
        onClick={toggle}
      >
        <div className="flex items-center gap-2">
          {isCompleted ? (
            <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          ) : (
            <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
              <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
            </div>
          )}
          <span className="text-[14px] font-semibold text-gray-800">{stepIcon} {title}</span>
          {isCompleted && (
            <span className="text-[11px] text-green-600 font-medium ml-1">已完成</span>
          )}
        </div>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform duration-300 flex-shrink-0 ${
            isCollapsed ? '' : 'rotate-180'
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Collapsible Content */}
      <div
        ref={contentRef}
        className="transition-all duration-500 ease-in-out overflow-hidden"
        style={{
          maxHeight: isCollapsed ? '0px' : `${contentHeight || 2000}px`,
          opacity: isCollapsed ? 0 : 1,
        }}
      >
        <div className="p-3 space-y-3 bg-gray-50/30 border-t border-gray-100">
          {items.map((item, index) => renderItem(item, index))}
        </div>
      </div>

      {/* Summary when collapsed */}
      {isCollapsed && summary && (
        <div className="px-4 py-2 border-t border-gray-100 bg-green-50/30 animate-fade-in">
          <p className="text-[11px] text-gray-500 leading-relaxed">{summary}</p>
        </div>
      )}
    </div>
  );
}
