import { classes } from '@utils/classes';

import type { InputProps } from '@modules/InputProps';

const Input = ({ className, ...rest }: InputProps) => {
  return (
    <input
      {...rest}
      className={classes([
        'rounded border border-secondaryGrey px-4 py-2',
        className ?? '',
      ])}
    />
  );
};

export default Input;
