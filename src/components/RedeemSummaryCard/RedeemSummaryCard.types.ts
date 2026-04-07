export interface RedeemSummaryCardProps {
  /**
   * Conversion rate text (e.g. "10 Credits = 1 AED")
   */
  conversionRateText: string;
  /**
   * Transfer fee text (e.g. "Free")
   */
  transferFeeText: string;
  /**
   * Final amount to receive in AED (e.g. 20.00)
   */
  receiveAmount: number;
}
