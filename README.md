# Real Estate ROI Calculator

Online calculator to evaluate the profitability of a real estate rental investment.

## Features

- Automatic gross and net yield calculation
- Mortgage monthly payment simulation
- Monthly cashflow calculation
- Export results to Excel file
- Realistic default values to get started quickly
- Responsive interface (mobile and desktop)
- Dark/Light/System theme support
- Visual performance indicators (positive/negative cashflow, yield)

## Calculations

### Gross Yield
```
Gross Yield = (Annual Rent / Total Investment Cost) × 100
```

### Net Yield
```
Net Monthly Income = (Annual Rent - Charges - Property Tax) / 12
Net Yield = (Net Annual Income / Total Investment Cost) × 100
```

### Monthly Mortgage Payment (Constant Annuity Formula)
```
M = P × [t(1+t)^n] / [(1+t)^n - 1]
```
- M = Monthly payment
- P = Loan amount
- t = Monthly rate (Annual rate / 12 / 100)
- n = Number of months (Duration × 12)

### Monthly Cashflow
```
Cashflow = Net Monthly Income - Monthly Mortgage Payment
```

### Total Credit Cost
```
Total Cost = Monthly Payment × Number of Months
Total Interest = Total Cost - Loan Amount
```

## Tech Stack

- **Framework**: Next.js 14
- **UI**: Chakra UI
- **Language**: TypeScript
- **Testing**: Jest, React Testing Library
- **Package Manager**: pnpm
- **Deployment**: GitHub Pages

## Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Run production server
pnpm start

# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

## Usage

1. Enter purchase parameters (property price, notary fees, renovation costs)
2. Configure mortgage (loan amount, rate, duration)
3. Enter rental parameters (rent, charges, property tax)
4. Results update in real-time
5. Export your calculations to Excel with the "Export" button

## Performance Indicators

- **Positive cashflow**: The investment generates income each month
- **Negative cashflow**: The investment costs money each month (avoid)
- **Net yield > 5%**: Excellent investment
- **Net yield 3-5%**: Good investment
- **Net yield < 3%**: Low profitability

## License

MIT
