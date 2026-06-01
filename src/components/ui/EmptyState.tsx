interface EmptyStateProps {
  titulo: string
  descricao?: string
  acao?: React.ReactNode
}

export function EmptyState({ titulo, descricao, acao }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-14 h-14 bg-teal-50 rounded-full flex items-center justify-center mb-4">
        <svg className="w-7 h-7 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <h3 className="text-base font-semibold text-gray-800">{titulo}</h3>
      {descricao && <p className="text-sm text-gray-500 mt-1 max-w-xs">{descricao}</p>}
      {acao && <div className="mt-5">{acao}</div>}
    </div>
  )
}
