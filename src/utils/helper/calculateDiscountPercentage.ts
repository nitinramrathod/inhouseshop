export function calculateDiscountPercentage(
  actualPrice: number,
  discountedPrice: number
): number {
  if (actualPrice <= 0 || discountedPrice >= actualPrice) {
    return 0;
  }

  return Math.round(
    ((actualPrice - discountedPrice) / actualPrice) * 100
  );
}
