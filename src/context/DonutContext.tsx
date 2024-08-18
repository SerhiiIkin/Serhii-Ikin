import { createContext } from 'react';

import type { DonutContextType } from '@modules/DonutTypeContext';

export const DonutContext = createContext<DonutContextType>({
  isAdmin: true,
});
