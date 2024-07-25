import HeaderText from '@variables/HeaderText';

export const Links = () => {
  const localToken = localStorage.getItem('token')?.length
    ? localStorage.getItem('token')?.includes('expiry')
      ? JSON.parse(localStorage.getItem('token') || '')
      : localStorage.getItem('token') || ''
    : '';
  const { home, about, portfolio } = HeaderText();

  return [
    { children: home, to: '/' },
    { children: about, to: '/about' },
    { children: portfolio, to: '/portfolio' },
    { children: 'Dashboard', to: '/dashboard' },
    {
      children: localToken && 'Dashboard',
      to: localToken ? '/dashboard' : '/',
    },
  ];
};
