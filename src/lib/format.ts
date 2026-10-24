const pkr = new Intl.NumberFormat("en-PK", { maximumFractionDigits: 0 });

/** Formats a whole-rupee amount the way Pakistani shoppers read it: Rs. 1,800 */
export function formatPrice(amount: number) {
  return `Rs. ${pkr.format(amount)}`;
}
