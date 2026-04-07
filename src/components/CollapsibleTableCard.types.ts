export interface TableColumn {
  id: string;
  label: string;
  flex?: number;
  width?: number;
}

export interface TableRowData {
  id: string;
  label: string;
  subLabel?: string;
  values: string[];
}

export interface TableSectionData {
  id: string;
  label: string;
  subLabel: string;
  values: string[];
  rows: TableRowData[];
}

export interface TableRowProps {
  id: string;
  label: string;
  subLabel?: string;
  values: string[];
  columns: TableColumn[];
  isHeader?: boolean;
  onPress?: () => void;
  onPressValue?: (
    id: string,
    colId: string,
    value: string,
    rowLabel: string,
  ) => void;
  onPressRow?: (id: string, label: string) => void;
}

export interface CollapsibleTableCardProps {
  columns: TableColumn[];
  sections: TableSectionData[];
  onPressValue?: (
    id: string,
    colId: string,
    value: string,
    rowLabel: string,
  ) => void;
  onPressRow?: (id: string, label: string) => void;
  isAllDatesSelected?: boolean;
}
