
export interface TransactionCardProps {
  title: string;
  amount: string;
  date: string;
  type: 'credit' | 'debit';
  onPress?: () => void;
}
