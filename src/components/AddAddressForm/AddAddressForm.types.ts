import type { StyleProp, ViewStyle } from 'react-native';

import type { DropdownValue } from '@/types/dropdown.types';

export interface AddAddressFormProps {
  /** Extra styles on the outermost wrapper. */
  style?: StyleProp<ViewStyle>;
}

export interface AddAddressFormState {
  address: string;
  area: DropdownValue;
  county: DropdownValue;
  emirate: DropdownValue;
  postalCode: string;
}
