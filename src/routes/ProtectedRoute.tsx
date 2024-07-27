import type { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

import { isAdmin } from '@utils/auth';

type ProtectedRouteProps = {
  element: ReactElement;
};

const ProtectedRoute = ({ element }: ProtectedRouteProps) => {
  return isAdmin() ? element : <Navigate to="/" replace />;
};

export default ProtectedRoute;
