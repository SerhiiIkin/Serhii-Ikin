import type { ProjectContextType } from '@modules/ProjectContextType';

export const ProjectContentSingleValue: ProjectContextType = {
  isAdmin: false,
  isDescription: true,
  isFavorites: true,
  isMore: false,
  isSlider: true,
  classNameProject: {
    title: 'text-primaryOrange text-3xl md:text-4xl xl:text-5xl',
    description: 'text-primaryDarkBlue',
    img: 'md:min-h-[60dvh]',
  },
  isLink: true,
};
