export function calculateFare(baseFare: number, percentage: number) {
  const fare = baseFare + baseFare * (percentage / 100);
  return Math.ceil(fare);
}

export function getFareWithCurr(baseFare: number, percentage: number) {
  return `${calculateFare(baseFare, percentage)} tk`;
}
