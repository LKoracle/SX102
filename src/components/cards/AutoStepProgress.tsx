interface AutoStepProgressProps {
  data: Record<string, unknown>;
}

export function AutoStepProgress({ data }: AutoStepProgressProps) {
  const steps = (data.steps as string[]) ?? ['需求分析', '保障检视', '方案推荐'];
  const currentStep = (data.currentStep as number) ?? 0;

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-3">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            <div className="flex items-center gap-1.5">
              {/* Step indicator */}
              {index < currentStep ? (
                <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              ) : index === currentStep ? (
                <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                </div>
              ) : (
                <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-gray-400" />
                </div>
              )}
              <span
                className={`text-xs font-medium ${
                  index < currentStep
                    ? 'text-green-600'
                    : index === currentStep
                      ? 'text-blue-600'
                      : 'text-gray-400'
                }`}
              >
                {step}
              </span>
            </div>
            {/* Connector line */}
            {index < steps.length - 1 && (
              <div className="mx-2 flex-shrink-0">
                <div
                  className={`w-8 h-0.5 ${
                    index < currentStep ? 'bg-green-400' : 'bg-gray-200'
                  }`}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
