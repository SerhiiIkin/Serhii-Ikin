export const isAdmin = () => {
  const token = localStorage.getItem('token');
  if (token === null) {
    return false;
  }
  const parsedToken = JSON.parse(token);
  return parsedToken.role === 'admin';
};
