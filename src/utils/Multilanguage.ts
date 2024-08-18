import { useSelector } from 'react-redux';

import type { RootState } from '../store/store';

import type { MultilanguageType } from '@modules/MultilanguageType';

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
