/**
 * Built-in icon names shipped with the Button component.
 * Pass one of these strings to `iconLeft` / `iconRight` to render
 * a built-in icon without importing an external library.
 */
export type ButtonDefaultIconName =
  | 'plus'
  | 'arrow-right'
  | 'arrow-left'
  | 'check'
  | 'close'
  | 'search';

export interface ButtonDefaultIconProps {
  name: ButtonDefaultIconName;
  size: number;
  color: string;
}
