import HeaderText from '@variables/HeaderText';

import { isAdmin } from '@utils/auth';

export const Links = () => {
  const { home, about, portfolio } = HeaderText();

  return [
    { children: home, to: '/' },
    { children: about, to: '/about' },
    { children: portfolio, to: '/portfolio' },
    {
      children: isAdmin() && 'Dashboard',
      to: isAdmin() && '/dashboard',
    },
  ];
};
