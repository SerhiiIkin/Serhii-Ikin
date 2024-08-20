import Multilanguage from '@utils/Multilanguage';

import type { ProjectContextType } from '@modules/ProjectContextType';

export const ProjectContentValueHomePage: () => ProjectContextType = () => {
  const multilanguageTitlte = Multilanguage({
    ukr: 'Мої улюблені проекти',
    eng: 'My favorite projects',
    dk: 'Mine yndlingsprojekter',
  });

  return {
    isAdmin: false,
    isDescription: true,
    isFavorites: true,
    classNameProject: {
      content: [
        'grid-cols-1 grid ',
        'md:grid-cols-2',
        '[&_h3]:even:col-start-1 [&_h3]:even:col-span-2 [&_p]:even:col-start-1 [&_p]:even:row-start-2',
        'xl:hover:bg-initial',
      ].join(' '),
      img: 'md:col-start-1 md:row-span-3 md:row-start-1 rounded-xl',
      title: 'md:col-start-2 text-left xl:group-hover:text-initial',
      link: '',
      description: 'line-clamp-3 xl:group-hover:text-initial',
    },
    classNameProjects: {
      section: '',
      container: 'grid-cols-1',
    },
    title: multilanguageTitlte,
    isMore: true,
    isSlider: true,
    isLink: false,
  };
};
