import type { SyntheticEvent } from 'react';

import type { BankDataType } from '@modules/bankDataType';

export type SelectProps = {
  filteredValuta: BankDataType[];
  value: string;
  defaultValue?: boolean;
  onChange: () => void;
  onClickOption: (e: SyntheticEvent<EventTarget>) => void;
  isChecked: boolean;
  onBlur: () => void;
  className?: string;
};
