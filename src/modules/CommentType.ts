export type CommentType = {
  _id?: string;
  name: string;
  description: string;
  date: string;
  likes: string[];
  logo: string;
  replies?: CommentType[];
  className?: string;
  isReply: boolean;
  idComment: string;
  idProject?: string;
  userId?: string;
};
