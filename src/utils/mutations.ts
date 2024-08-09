import { useMutation } from '@tanstack/react-query';

import { getImagesAxios } from '@utils/axios';

export const useGetImagesWelcomeMutation = (folderName: string) => {
  return useMutation({
    mutationFn: () => getImagesAxios(folderName),
  });
};
