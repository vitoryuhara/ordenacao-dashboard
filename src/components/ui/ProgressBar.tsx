import { corProgresso } from '../../lib/constants'

interface ProgressBarProps {
  value: number
}

export function ProgressBar({ value }: ProgressBarProps) {
  const cor = corProgresso(value)
  return (
    <div className="w-full bg-gray-100 rounded-full h-2">
      <div
        className={`h-2 rounded-full transition-all duration-500 ${cor}`}
        style={{ width: `${value}%` }}
      />
    </div>
  )
}
