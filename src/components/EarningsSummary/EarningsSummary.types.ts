import type { ReactNode } from 'react';

export interface EarningsSummaryCardProps {
  /**
   * Icon element to display at the top
   */
  icon: ReactNode;
  /**
   * Title of the card (e.g. 'Referral')
   */
  title: string;
  /**
   * Number of credits
   */
  credits: number;
  /**
   * AED value equivalent
   */
  aedValue: number;
}

export interface EarningsSummaryProps {
  /**
   * List of summary items to display
   */
  items: EarningsSummaryCardProps[];
}
