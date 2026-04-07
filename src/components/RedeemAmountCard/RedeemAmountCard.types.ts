export interface RedeemAmountCardProps {
  /**
   * Total credits available (e.g. 200)
   */
  credits: number;
  /**
   * AED value equivalent (e.g. 45.00)
   */
  aedValue: number;
  /**
   * Limit used in the tier banner (e.g. 400)
   */
  tierLimitTotal: number;
  /**
   * Current applied limit (e.g. 200)
   */
  tierLimitApplied: number;
  /**
   * Percentage for the banner (e.g. 50)
   */
  tierPercentage: number;
  /**
   * Callback when "Withdraw All" is pressed
   */
  onWithdrawAll?: () => void;
}
