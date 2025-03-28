import { useEffect, useRef } from 'react';

import { classes } from '@utils/classes';

import type { TextareaProps } from '@modules/TextareaProps';

const Textarea = ({ className, stopTyping, ...rest }: TextareaProps) => {
  const textAriaRef = useRef<HTMLTextAreaElement>(null);

  const changeTextArea = () => {
    if (typeof stopTyping === 'function') {
      stopTyping();
    }
    if (textAriaRef.current && textAriaRef.current.scrollHeight > 0) {
      textAriaRef.current.style.height = 0 + 'px';
      const scrollHeight = textAriaRef.current.scrollHeight;
      textAriaRef.current.style.height = scrollHeight + 'px';
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => changeTextArea(), [textAriaRef.current?.scrollHeight]);

  return (
    <textarea
      onBlur={changeTextArea}
      ref={textAriaRef}
      rows={1}
      className={classes([
        'min-h-full resize-none rounded-3xl pl-3 py-2 outline outline-1 outline-primaryDarkBlue',
        className ?? '',
      ])}
      {...rest}
    />
  );
};

export default Textarea;
