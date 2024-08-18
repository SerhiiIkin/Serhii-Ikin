import { useQuery } from '@tanstack/react-query';

import Multilanguage from '@utils/Multilanguage';
import { getSectionTitleDescription } from '@utils/axios';

export const useSectionTilteDescriptionHook = (key: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [key],
    queryFn: () => getSectionTitleDescription(key),
  });

  const description = Multilanguage(data?.description);
  const title = Multilanguage(data?.title);
  return {
    title,
    description,
    isLoading,
    error,
  };
};
