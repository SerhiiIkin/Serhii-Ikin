import type { ProjectImageType } from '@modules/ProjectImageType';

export type ProjectType = {
  _id?: string;
  images: ProjectImageType[];
  title: {
    ukr: string;
    eng: string;
    dk: string;
  };
  description: {
    ukr: string;
    eng: string;
    dk: string;
  };
  link: string;
  isFavorite: boolean;
};
