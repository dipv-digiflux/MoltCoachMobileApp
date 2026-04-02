export interface TableRowData {
  id: string;
  label: string;
  subLabel?: string;
  value: string;
}

export interface TableSectionData {
  id: string;
  period: string;
  dateRange: string;
  completion: string;
  rows: TableRowData[];
}

export interface TableRowProps {
  label: string;
  subLabel?: string;
  value: string;
  isHeader?: boolean;
  onPress?: () => void;
}

export interface CollapsibleTableCardProps {
  sections: TableSectionData[];
}
