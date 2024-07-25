import type { ProjectImageType } from '@modules/ProjectImageType';

export type DonutType = {
  _id?: string;
  images: ProjectImageType[];
  title: {
    ukr: '';
    eng: '';
    dk: '';
  };
  description: {
    ukr: '';
    eng: '';
    dk: '';
  };
  link: string;
};
