export type TransferType = 'temporary' | 'permanent';

export interface TabItem<T extends string> {
  label: string;
  value: T;
}

export interface TransferTabsProps<T extends string> {
  tabs: readonly TabItem<T>[];
  activeTab: T;
  onChange: (value: T) => void;
}

export interface DayInputsProps {
  fromDays: string;
  toDays: string;
  setFromDays: (value: string) => void;
  setToDays: (value: string) => void;
}
