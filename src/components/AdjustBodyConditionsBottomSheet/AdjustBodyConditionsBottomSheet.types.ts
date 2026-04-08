export interface Condition {
  id: string;
  name: string;
}

export interface Activity {
  id: string;
  type: 'Added' | 'Remove';
  conditionName: string;
  timestamp: string;
}

export interface AdjustBodyConditionsBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  currentConditions: Condition[];
  recentActivities: Activity[];
  onAddCondition: (name: string) => void;
  onRemoveCondition: (id: string) => void;
  onSaveChanges: () => void;
}
