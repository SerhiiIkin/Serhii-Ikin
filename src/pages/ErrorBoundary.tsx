import { useRouteError } from 'react-router-dom';

import IndexLayout from '@components/Layouts/IndexLayout';

export const ErrorBoundary = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <IndexLayout>
      <div>{error as string}</div>
    </IndexLayout>
  );
};
