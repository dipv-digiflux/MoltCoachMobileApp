import type { SharedValue } from 'react-native-reanimated';

export interface SlideData {
  title: string;
  subtitle: string;
}

export interface ProgressSegmentProps {
  index: number;
  currentIndex: number;
  progressAnim: SharedValue<number>;
}

export interface ImageCellProps {
  slide: SlideData;
}

export interface TextCellProps {
  slide: SlideData;
}
