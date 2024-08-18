import Skeleton from 'react-loading-skeleton';

import { classes } from '@utils/classes';

import type { FetchDataHandlerProps } from '@modules/FetchDataHandlerProps';

const FetchDataHandler = ({
  data,
  children,
  className,
  SkeletonCount = 5,
  containerClassNameSkeleton,
}: FetchDataHandlerProps) => {
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
      <Skeleton
        containerClassName={containerClassNameSkeleton}
        count={SkeletonCount}
      />
    );
  }

  return <>{children}</>;
};

export default FetchDataHandler;
