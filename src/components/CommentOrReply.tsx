import { type FC, type ReactNode, useContext } from 'react';

import { CommentContext } from '@context/CommentContext';

import { classes } from '@utils/classes';

export const CommentOrReply: FC<{ children: ReactNode }> = ({ children }) => {
  const { isReply } = useContext(CommentContext);

  const Tag = isReply ? 'ol' : 'li';
  return (
    <Tag
      className={classes([
        isReply ? 'pl-7' : 'border-l border-l-primaryOrange pl-5',
      ])}
    >
      {children}
    </Tag>
  );
};
