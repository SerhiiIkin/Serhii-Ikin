import type { ReactNode } from 'react';

import type { ProjectType } from '@modules/ProjectType';

export type FetchDataHandlerLayoutProps = {
  data: {
    data: [] | ProjectType[];
    error: string;
    isLoading: boolean;
  };
  children: ReactNode;
  className?: string;
};
