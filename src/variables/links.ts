import HeaderText from '@variables/HeaderText';

import { isAdmin } from '@utils/auth';

export const Links = () => {
  const { home, blog, portfolio } = HeaderText();

  return [
    { children: home, to: '/' },
    { children: blog, to: '/blog' },
    { children: portfolio, to: '/portfolio' },
    {
      children: isAdmin() ? 'Dashboard' : '',
      to: isAdmin() ? '/dashboard' : '/',
    },
  ];
};
