interface ScheduleCardProps {
  data: Record<string, unknown>;
}

interface ScheduleDay {
  day: string;
  items: Array<{
    time: string;
    task: string;
    type: string;
  }>;
}

export function ScheduleCard({ data }: ScheduleCardProps) {
  const title = data.title as string;
  const days = data.days as ScheduleDay[];

  const typeIcons: Record<string, string> = {
    visit: '🚶',
    call: '📞',
    prepare: '📝',
    meeting: '🏢',
  };

  const typeColors: Record<string, string> = {
    visit: 'border-l-blue-400 bg-blue-50',
    call: 'border-l-indigo-400 bg-indigo-50',
    prepare: 'border-l-violet-400 bg-violet-50',
    meeting: 'border-l-purple-400 bg-purple-50',
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-500 px-4 py-2.5">
        <h3 className="text-white font-semibold text-sm">📅 {title}</h3>
      </div>
      <div className="p-2 space-y-2">
        {days.map((day, index) => (
          <div key={index}>
            <p className="text-xs font-semibold text-text mb-1 px-1">{day.day}</p>
            <div className="space-y-1">
              {day.items.map((item, i) => (
                <div
                  key={i}
                  className={`border-l-3 rounded-r-lg px-3 py-1.5 flex items-center gap-2 ${typeColors[item.type] || 'border-l-gray-400 bg-gray-50'}`}
                >
                  <span className="text-xs">{typeIcons[item.type] || '📌'}</span>
                  <span className="text-xs font-medium text-text-secondary w-10">{item.time}</span>
                  <span className="text-xs text-text flex-1">{item.task}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
