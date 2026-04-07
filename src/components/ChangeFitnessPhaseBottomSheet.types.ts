export type FitnessPhase =
  | 'Build Muscle'
  | 'Burn Fat'
  | 'Performance'
  | 'Maintain';

export interface ChangeFitnessPhaseBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  currentPhase?: FitnessPhase;
  onUpdate?: (phase: FitnessPhase) => void;
}
