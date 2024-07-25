import { useSelector } from 'react-redux';

import type { MultilanguageType } from '@modules/MultilanguageType';

import type { RootState } from '../store/store';

const Multilanguage = (languages: MultilanguageType) => {
  const lang = useSelector((state: RootState) => state.language.language);
  if (!languages) return '';

  switch (lang) {
    case 'UKR':
      return languages.ukr;

    case 'ENG':
      return languages.eng;

    case 'DK':
      return languages.dk;
    default:
      return languages.dk;
  }
};
export default Multilanguage;
