import { createContext } from 'react';

import type { ProjectContextType } from '@modules/ProjectContextType';

export const ProjectContext = createContext<ProjectContextType>({
  isAdmin: false,
  isDescription: false,
  classNameProject: {},
  classNameProjects: {},
  title: '',
  isFavorites: false,
  isMore: true,
  isSlider: false,
});
