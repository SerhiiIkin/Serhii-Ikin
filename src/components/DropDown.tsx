import NavLink from '@components/NavLink';

import { classes } from '@utils/classes';

import type { DropDownProps } from '@modules/DropDownProps';

const DropDown = ({ links, title }: DropDownProps) => {
  return (
    <div className="group relative">
      <span className="text-primaryLigth">{title}</span>
      <ul
        className={classes([
          'invisible absolute z-10 min-w-max rounded bg-primaryLigth p-2 opacity-0 duration-1000 ease-in-out',
          'group-hover:visible group-hover:opacity-100',
        ])}
      >
        {links.map(link => (
          <li key={link.name}>
            <NavLink
              to={link.to}
              className={'text-primaryDark xl:hover:text-primaryDarkBlue'}
            >
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropDown;
