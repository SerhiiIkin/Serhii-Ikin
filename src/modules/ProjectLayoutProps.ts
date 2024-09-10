import type { classNameProjectType } from '@modules/ProjectContextType';

export type ProjectLayoutProps = {
  children: React.ReactNode;
  isMore: boolean;
  id: string;
  classNameProject: classNameProjectType;
};
