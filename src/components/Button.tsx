import { classes } from '@utils/classes';

import type { ButtonProps } from '@modules/ButtonProps';

const Button = ({ children, className, ...rest }: ButtonProps) => {
  return (
    <button
      {...rest}
      className={classes([
        'rounded px-4 py-2',
        'bg-primaryOrange text-primaryLigth xl:hover:bg-primaryLigth xl:hover:text-primaryOrange xl:hover:duration-500',
        className ?? '',
      ])}
    >
      {children}
    </button>
  );
};

export default Button;
