import { Comment } from '@components/Comment';

import type { CommentType } from '@modules/CommentType';

export const Comments = ({ comments }: { comments: CommentType[] }) => {
  return (
    <ul className="grid gap-y-4 py-6">
      {comments.map(comment => (
        <Comment key={comment._id} {...comment} />
      ))}
    </ul>
  );
};
