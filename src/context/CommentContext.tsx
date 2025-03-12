import { createContext } from 'react';

import type { CommentContextType } from '@modules/CommentContextType';

export const CommentContext = createContext<CommentContextType>({
  isReply: false,
  idComment: '',
  idProject: '',
});
