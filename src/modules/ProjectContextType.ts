export type ProjectContextType = {
  isAdmin: boolean;
  isDescription: boolean;
  classNameProject?: classNameProjectType;
  classNameProjects?: classNameProjectsType;
  title?: string;
  isFavorites?: boolean;
  isMore?: boolean;
  isSlider?: boolean;
  isLink?: boolean;
};

export type classNameProjectsType = {
  container?: string;
  section?: string;
};

export type classNameProjectType = {
  content?: string;
  img?: string;
  imgContainer?: string;
  textContainer?: string;
  description?: string;
  title?: string;
  link?: string;
  container?: string;
};
