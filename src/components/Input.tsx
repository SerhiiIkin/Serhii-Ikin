import type { InputProps } from '@modules/InputProps';

import { classes } from '@utils/classes';

const Input = ({ className, ...rest }: InputProps) => {
  return (
    <input
      {...rest}
      className={classes([
        'border-secondaryGrey rounded border px-4 py-2',
        className ?? '',
      ])}
    />
  );
};

export default Input;
