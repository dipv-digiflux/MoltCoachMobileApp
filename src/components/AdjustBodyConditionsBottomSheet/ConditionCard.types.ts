import type { Condition } from './AdjustBodyConditionsBottomSheet.types';

export interface ConditionCardProps {
  condition: Condition;
  onRemove: (id: string) => void;
}
