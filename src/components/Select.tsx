import { useMemo } from 'react';

import { classes } from '@utils/classes';

import type { SelectProps } from '@modules/SelectProps';

const Select = ({
  filteredValuta,
  value,
  onChange,
  isChecked,
  onClickOption,
  onBlur,
  className,
}: SelectProps) => {
  const currentValueName = useMemo(() => {
    if (value === '1') {
      return 'UKR';
    }

    return filteredValuta.find(v => v.rate === +value)?.cc ?? 'Default Value';
  }, [value, filteredValuta]);

  return (
    <div
      onClick={onChange}
      onBlur={onBlur}
      tabIndex={0}
      className={classes([
        'relative mr-2 cursor-pointer rounded-xl bg-primaryLigthYellow px-2 py-1',
        className ?? '',
      ])}
    >
      <div>{currentValueName}</div>

      <ul
        className={classes([
          'absolute left-0 top-full z-10 hidden w-full rounded-xl bg-primaryLigthYellow p-1',
          isChecked ? 'block' : '',
        ])}
      >
        {filteredValuta.map(v => (
          <li
            onClick={onClickOption}
            className="block w-full rounded-xl p-1 text-start xl:hover:bg-primaryDarkBlue xl:hover:text-primaryLigth xl:hover:duration-500"
            key={v.rate}
            data-value={v.rate}
          >
            {v.cc}
          </li>
        ))}
      </ul>

      <span
        className={classes([
          `after:absolute after:right-2 after:top-1/2 after:-translate-y-1/2 after:content-[">"]`,
          isChecked
            ? 'after:-rotate-90 after:duration-300'
            : 'after:rotate-90 after:duration-300',
        ])}
      ></span>
    </div>
  );
};

export default Select;
