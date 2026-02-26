import { type ReactElement } from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';

/** Single option in the dropdown list. */
export type DropdownOption = {
  label: string;
  value: string | number;
  disabled?: boolean;
};

/** Type alias for a single selected value. */
export type DropdownValue = string | number;

/** Props for the Dropdown component. */
export type DropdownProps = {
  /** Available options to select from. */
  options: ReadonlyArray<DropdownOption>;

  /** Enable multi-select mode with checkboxes. @default false */
  multiple?: boolean;

  /** Currently selected value (single) or values (multi). Controls the component. */
  value?: DropdownValue | ReadonlyArray<DropdownValue>;

  /** Default selected value(s) for uncontrolled usage. */
  defaultValue?: DropdownValue | ReadonlyArray<DropdownValue>;

  /** Called when selection changes. Returns single value or array based on `multiple`. */
  onChange: (value: DropdownValue | ReadonlyArray<DropdownValue>) => void;

  /** Enable search/filter in the dropdown list. @default false */
  searchable?: boolean;

  /** Placeholder for the search input. @default 'Search…' */
  searchPlaceholder?: string;

  /** Placeholder text when no value is selected. @default 'Select…' */
  placeholder?: string;

  /** Primary label text above the dropdown. */
  label?: string;

  /** Secondary hint shown after the label, e.g. "(optional)". */
  labelHint?: string;

  /** Shows a red asterisk next to the label. @default false */
  required?: boolean;

  /** Shows an info icon next to the label. @default false */
  showInfoIcon?: boolean;

  /** Called when the info icon is pressed. */
  onInfoPress?: () => void;

  /** Disables the dropdown. @default false */
  disabled?: boolean;

  /** Shows a loading spinner in the dropdown list. @default false */
  loading?: boolean;

  /** Activates error visual state. @default false */
  error?: boolean;

  /** Error message shown below the dropdown. */
  errorMessage?: string;

  /** Helper text shown below the dropdown (hidden when error). */
  helperText?: string;

  /** Auto-close after selecting in single-select mode. @default true for single, false for multi */
  closeOnSelect?: boolean;

  /** Show "Select All" option in multi-select mode. @default false */
  showSelectAll?: boolean;

  /** Show clear selection button in multi-select mode. @default false */
  showClearButton?: boolean;

  /** Custom title for the bottom sheet. Defaults to `label`. */
  sheetTitle?: string;

  /** Custom item renderer. */
  renderItem?: (option: DropdownOption, selected: boolean) => ReactElement;

  /** Custom key extractor for list items. */
  keyExtractor?: (option: DropdownOption) => string;

  /** Test identifier. */
  testID?: string;

  /** Extra styles on the outermost wrapper. */
  style?: StyleProp<ViewStyle>;

  /** Accessibility label. Falls back to `label` when omitted. */
  accessibilityLabel?: string;
};

/** Props for the DropdownItem subcomponent. */
export type DropdownItemProps = {
  option: DropdownOption;
  selected: boolean;
  multiple: boolean;
  onSelect: (value: DropdownValue) => void;
  testID?: string;
};

/** Config passed to useDropdown. */
export type UseDropdownConfig = {
  options: ReadonlyArray<DropdownOption>;
  multiple: boolean;
  value?: DropdownValue | ReadonlyArray<DropdownValue>;
  defaultValue?: DropdownValue | ReadonlyArray<DropdownValue>;
  onChange: (value: DropdownValue | ReadonlyArray<DropdownValue>) => void;
  closeOnSelect: boolean;
};

/** Return type of useDropdown. */
export type UseDropdownReturn = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredOptions: ReadonlyArray<DropdownOption>;
  selectedValues: ReadonlyArray<DropdownValue>;
  isSelected: (value: DropdownValue) => boolean;
  toggleOption: (value: DropdownValue) => void;
  selectAll: () => void;
  clearSelection: () => void;
  displayText: string;
};
