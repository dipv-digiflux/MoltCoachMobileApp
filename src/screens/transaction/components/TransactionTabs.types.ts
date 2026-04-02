export interface TransactionTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  tabs: string[];
}
