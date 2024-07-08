import type { TextareaProps } from '@modules/TextareaProps';

import { classes } from '@utils/classes';

const Textarea = ({ className, ...rest }: TextareaProps) => {
  return (
    <textarea
      className={classes([
        'outline-primaryDarkBlue resize-none rounded p-2 outline outline-1',
        className ?? '',
      ])}
      {...rest}
    />
  );
};

export default Textarea;
