import type { MouseEvent } from 'react';

import { classes } from '@utils/classes';

import type { ButtonProps } from '@modules/ButtonProps';

const Button = ({ children, className, ...rest }: ButtonProps) => {
  const updatePosition = (e: MouseEvent<HTMLButtonElement>) => {
    const _t = e.target as HTMLButtonElement;

    if (_t.tagName.match(/^button$/i)) {
      const r = _t.getBoundingClientRect();
      ['x', 'y'].forEach(c => {
        const clientProp = c === 'x' ? 'clientX' : 'clientY';
        _t.style.setProperty(
          `--${c}`,
          `${e[clientProp] - (c === 'x' ? r.x : r.y)}px`
        );
      });
    }
  };

  return (
    <button
      onMouseOver={updatePosition}
      onMouseOut={updatePosition}
      type="button"
      {...rest}
      className={classes([
        'bg-custom-radial-o-w rounded-3xl px-4 py-2 text-primaryLigth',
        'disabled:cursor-not-allowed disabled:xl:hover:bg-primaryOrange disabled:xl:hover:text-primaryLigth',
        'xl:hover:text-primaryOrange',
        className ?? '',
      ])}
    >
      {children}
    </button>
  );
};

export default Button;
