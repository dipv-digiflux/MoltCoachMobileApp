import type { ReactNode } from 'react';

export interface TransactionDetailsStatusHeaderProps {
  /**
   * Amount of the transaction (e.g. 50)
   */
  amount: number;
  /**
   * Currency or unit (e.g. 'MOLT')
   */
  unit: string;
  /**
   * Status label (e.g. 'Completed')
   */
  status: string;
}

export interface TransactionDetailsDetailRowProps {
  /**
   * Label for the row (e.g. 'From')
   */
  label: string;
  /**
   * Value to display
   */
  value: string;
  /**
   * Optional icon to display next to the value
   */
  icon?: ReactNode;
}

export interface TransactionDetailsCardProps {
  /**
   * Transaction type (e.g. 'Referral Bonus')
   */
  transactionType: string;
  /**
   * Source of the transaction (e.g. 'Molt')
   */
  from: string;
  /**
   * Date and time string
   */
  dateTime: string;
  /**
   * Optional note about the transaction
   */
  note?: string;
}

export interface TransactionDetailsReportFooterProps {
  onReportPress: () => void;
}
