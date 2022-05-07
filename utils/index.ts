export const loanInterestCalculator = (
  loanAmount: number,
  interestRate: number,
  loanTerm: number
): number => {
  const interest = loanAmount * interestRate * loanTerm;
  return interest;
};

export const loanPaymentCalculator = (
  loanAmount: number,
  interestRate: number,
  loanTerm: number
): number => {
  const payment =
    (loanAmount * interestRate) / (1 - Math.pow(1 + interestRate, -loanTerm));
  return payment;
};
