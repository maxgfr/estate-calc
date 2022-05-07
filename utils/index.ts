export const getTotalFeesMortgage = (
  amountRented: string | number,
  loanDurationInYear: string | number,
  monthlyPayment: string | number,
  decimal = 0
): string => {
  const monthlyLoanDuration = Number(loanDurationInYear) * 12;
  const monthlyWithoutFees = Number(amountRented) / monthlyLoanDuration;
  const monthlyFees = Number(monthlyPayment) - monthlyWithoutFees;
  const totalFees = monthlyFees * monthlyLoanDuration;
  return isNaN(totalFees) ? "0" : totalFees.toFixed(decimal);
};

export const getMonthlyMortgagePayment = (
  amountRented: string | number,
  interestRate: string | number,
  loanDurationInYear: string | number,
  decimal = 0
): string => {
  const monthlyLoanDuration = Number(loanDurationInYear) * 12;
  const interestPerMonth = Number(interestRate) / 100 / 12;
  const monthlyPayment =
    (Number(amountRented) * interestPerMonth) /
    (1 - Math.pow(1 + interestPerMonth, -monthlyLoanDuration));
  return isNaN(monthlyPayment) ? "0" : monthlyPayment.toFixed(decimal);
};

export const getTotalPriceMortgage = (
  amountRented: string | number,
  totalFees: string | number,
  decimal = 0
): string => {
  const totalPrice = Number(amountRented) + Number(totalFees);
  return isNaN(totalPrice) ? "0" : totalPrice.toFixed(decimal);
};

export const getRevenuPerMonth = (
  rentPerYear: string | number,
  rentalChargesPerYear: string | number,
  propertyTaxPerYear: string | number,
  decimal = 0
): string => {
  const monthlyRent =
    Number(rentPerYear) / 12 -
    Number(rentalChargesPerYear) / 12 -
    Number(propertyTaxPerYear) / 12;
  return isNaN(monthlyRent) ? "0" : monthlyRent.toFixed(decimal);
};

export const getTotalPrice = (
  housingPrice: string | number,
  notaryFees: string | number,
  houseWorks: string | number,
  decimal = 0
): string => {
  const totalPrice =
    Number(housingPrice) + Number(notaryFees) + Number(houseWorks);
  return isNaN(totalPrice) ? "0" : totalPrice.toFixed(decimal);
};

export const getProfitability = (
  revenuPerMonth: string | number,
  totalPriceLoan: string | number,
  initialContribution: string | number,
  decimal = 2
): string => {
  const revenuPerYear = Number(revenuPerMonth) * 12;
  const profitability =
    (revenuPerYear / (Number(totalPriceLoan) + Number(initialContribution))) *
    100;
  return isNaN(profitability) ? "0" : profitability.toFixed(decimal);
};

export const getInitialContribution = (
  amountRent: string | number,
  totalPrice: string | number
): string => {
  console.log(totalPrice, amountRent);
  const initialContribution = Number(totalPrice) - Number(amountRent);
  return isNaN(initialContribution) ? "0" : initialContribution.toFixed(0);
};
