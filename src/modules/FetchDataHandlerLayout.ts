import type { ReactNode } from 'react';

export type FetchDataHandlerLayoutProps = {
  data: {
    data: [];
    error: string;
    isLoading: boolean;
  };
  children: ReactNode;
  className?: string;
};
