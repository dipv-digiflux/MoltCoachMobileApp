export interface BankAccount {
  id: string;
  name: string;
  number: string;
}

export interface RedeemTransferAccountsProps {
  /**
   * List of bank accounts
   */
  accounts: BankAccount[];
  /**
   * Currently selected account ID
   */
  selectedId?: string;
  /**
   * Callback when an account is selected
   */
  onSelect?: (id: string) => void;
  /**
   * Callback when "Manage Accounts" is pressed
   */
  onManageAccounts?: () => void;
}
