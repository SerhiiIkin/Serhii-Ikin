import type { ReactNode } from 'react';

import type { ProjectType } from '@modules/ProjectType';

export type FetchDataHandlerProps = {
  data: {
    data: [] | string[] | ProjectType[] | string;
    error: string;
    isLoading: boolean;
  };
  children: ReactNode;
  className?: string;
  SkeletonCount?: number;
  containerClassNameSkeleton?: string;
};
