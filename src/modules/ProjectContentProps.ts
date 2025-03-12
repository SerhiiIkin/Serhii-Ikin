import type { CommentType } from '@modules/CommentType';
import type { MultilanguageType } from '@modules/MultilanguageType';
import type { ProjectImageType } from '@modules/ProjectImageType';

export type ProjectContentProps = {
  _id?: string;
  images: ProjectImageType[];
  title: MultilanguageType;
  description: MultilanguageType;
  link: string;
  isFavorite: boolean;
  comments: CommentType[];
};
