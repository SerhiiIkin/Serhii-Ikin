import { createContext } from 'react';

type ProjectContextType = {
  isAdmin: boolean;
  isDescription: boolean;
  classNameProject: classNameProjectType;
  classNameProjects: classNameProjectsType;
};

type classNameProjectsType = {
  container?: string;
  section?: string;
};

type classNameProjectType = {
  content?: string;
  img?: string;
  imgContainer?: string;
  textContainer?: string;
  description?: string;
  title?: string;
  link?: string;
};

export const ProjectContext = createContext<ProjectContextType>({
  isAdmin: false,
  isDescription: false,
  classNameProject: {},
  classNameProjects: {},
});
