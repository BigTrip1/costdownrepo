/**
 * Gets the appropriate color for a metric based on performance against target and budget
 *
 * @param value Current value
 * @param target Target value
 * @param budget Budget value
 * @returns Color string
 */
export const getMetricColor = (
  value: number,
  target: number,
  budget: number
): string => {
  // If forecast is better than target (lower is better)
  if (value <= target) {
    return "#4caf50"; // Green
  }
  // If forecast is between target and budget
  else if (value <= budget) {
    return "#ffc107"; // Amber
  }
  // If forecast is worse than budget
  else {
    return "#ef5350"; // Red
  }
};
