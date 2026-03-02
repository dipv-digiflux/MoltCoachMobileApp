declare module '*.png' {
  const value: number;
  export default value;
}

declare module '*.jpg' {
  const value: number;
  export default value;
}

declare module '*.svg' {
  import type { ComponentType } from 'react';

  import type { SvgProps } from 'react-native-svg';
  const ReactComponent: ComponentType<SvgProps>;
  export default ReactComponent;
}
