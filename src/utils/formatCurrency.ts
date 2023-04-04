export function formatCurrency(value: string): string {
  const stringValue = String(value)
  const formattedValue = Number(stringValue.replace(',', '.')).toLocaleString(
    'pt-BR',
    {
      style: 'currency',
      currency: 'BRL',
    },
  )

  return formattedValue.replace('R$', 'R$ ')
}
