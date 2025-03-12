export type CommentType = {
  _id?: string;
  name: string;
  description: string;
  date: string;
  likes: number;
  logo: string;
  replies?: CommentType[];
  className?: string;
  isReply: boolean;
  idComment: string;
  idProject?: string;
};
