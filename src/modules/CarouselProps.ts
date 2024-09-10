import type { classNameProjectType } from '@modules/ProjectContextType';

export type CarouselProps = {
  data: string[];
  duration: number;
  spaceBetween: number;
  draggable: boolean;
  interval: number;
  classNameProject: classNameProjectType;
};
