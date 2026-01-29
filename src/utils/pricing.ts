export function calculateFixedInstallment(financedAmount: number, monthlyRate: number, term: number = 72): number {
  return financedAmount * monthlyRate / (1 - Math.pow(1 + monthlyRate, -term));
}
