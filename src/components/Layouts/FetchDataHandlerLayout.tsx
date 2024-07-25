import type { FetchDataHandlerLayoutProps } from '@modules/FetchDataHandlerLayout';

import Loader from '@components/Loader';

import { classes } from '@utils/classes';

const FetchDataHandler = ({
  data,
  children,
  className,
}: FetchDataHandlerLayoutProps) => {
  if (data.error) {
    return (
      <div className={classes(['mb-5 text-secondaryRed', className ?? ''])}>
        {data.error}
      </div>
    );
  }
  if (data?.data?.length === 0 && !data.isLoading && !data.error) {
    return <div className={classes(['mb-5', className ?? ''])}>Tom liste</div>;
  }

  if (data.isLoading) {
    return (
      <div className={classes(['mb-5', className ?? ''])}>
        <Loader size="medium" />
      </div>
    );
  }

  return <>{children}</>;
};

export default FetchDataHandler;
