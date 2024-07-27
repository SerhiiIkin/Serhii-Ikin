import { useEffect, useRef } from 'react';

import type { TextareaProps } from '@modules/TextareaProps';

import { classes } from '@utils/classes';

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

  const focusTextAria = () => changeTextArea();
  return (
    <textarea
      onBlur={focusTextAria}
      ref={textAriaRef}
      rows={2}
      className={classes([
        'resize-none rounded p-2 outline outline-1 outline-primaryDarkBlue',
        className ?? '',
      ])}
      {...rest}
    />
  );
};

export default Textarea;
