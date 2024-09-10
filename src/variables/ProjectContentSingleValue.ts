import type { ProjectContextType } from '@modules/ProjectContextType';

export const ProjectContentSingleValue: ProjectContextType = {
  isAdmin: false,
  isDescription: true,
  isFavorites: true,
  isMore: false,
  isSlider: true,
  classNameProject: {
    title: ' text-3xl md:text-4xl xl:text-5xl',
    description: '',
    img: 'md:min-h-[60dvh]',
    container: 'min-h-[60dvh]',
  },
  isLink: true,
};
