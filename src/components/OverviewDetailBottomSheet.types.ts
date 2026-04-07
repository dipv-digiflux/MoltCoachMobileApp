export type OverviewDetailTab = 'Steps' | 'Kcal' | 'Weight';

export interface StepsDetailData {
  current: number;
  target: number;
  lastSynced: string;
  onTrackMessage: string;
  dailyAverage: string;
  time: string;
  distance: string;
  activities: {
    id: string;
    type: string;
    time: string;
    duration: string;
    steps: string;
  }[];
  activitiesSummary?: {
    totalTime: string;
    caloriesBurned: string;
    stepsConverted: string;
  };
}

export interface WeightDetailData {
  current: number;
  unit: string;
  updatedAt: string;
  status: 'On Track' | 'Off Track';
  statusMessage: string;
  targetWeight: string;
  startedWith: string;
  avgWeeklyChange: string;
  logs: {
    id: string;
    date: string;
    time: string;
    value: string;
    change: string;
    changeColor: string;
  }[];
}

export interface CaloriesDetailData {
  consumed: number;
  target: number;
  left: number;
  lastSynced: string;
  macros: {
    label: string;
    current: number;
    target: number;
    status: string;
    statusColor: string;
    statusMessage: string;
  }[];
  insightMessage: string;
  meals: {
    category: string;
    items: {
      id: string;
      name: string;
      kcal: number;
      macros: string;
      image?: string;
      status?: string;
      statusColor?: string;
    }[];
  }[];
}

export interface OverviewDetailBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  date: string;
  initialTab?: OverviewDetailTab;
  stepsData: StepsDetailData;
  weightData: WeightDetailData;
  caloriesData: CaloriesDetailData;
  onNudge: () => void;
}
