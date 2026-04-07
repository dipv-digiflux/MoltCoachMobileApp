export type TransactionType = 'incoming' | 'outgoing' | 'transfer';

export interface TransactionItemProps {
  /**
   * Type of transaction
   */
  type: TransactionType;
  /**
   * Title of the transaction (e.g. 'Referral bonus')
   */
  title: string;
  /**
   * Date string (e.g. 'Feb 18, 2026')
   */
  date: string;
  /**
   * Credit amount
   */
  amount: number;
  /**
   * AED value equivalent
   */
  aedValue: number;
  /**
   * Whether this is the last item in the list (hides bottom border)
   */
  isLast?: boolean;
  /**
   * Callback when the item is pressed
   */
  onPress?: (item: TransactionItemProps) => void;
}

export interface RecentTransactionsProps {
  /**
   * Initial selected filter index
   */
  initialFilterIndex?: number;
  /**
   * Transaction data to display
   */
  data: TransactionItemProps[];
  /**
   * Callback when a transaction item is pressed
   */
  onTransactionPress?: (item: TransactionItemProps) => void;
}
