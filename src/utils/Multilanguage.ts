import { useSelector } from 'react-redux';

import type { MultilanguageType } from '@modules/MultilanguageType';

import type { RootState } from '../store/store';

const Multilanguage = ({ ukr, eng, dk }: MultilanguageType) => {
  const lang = useSelector((state: RootState) => state.language.language);

  class LanguageItem {
    ukr: string;
    eng: string;
    dk: string;

    constructor(ukr: string, eng: string, dk: string) {
      this.ukr = ukr;
      this.eng = eng;
      this.dk = dk;
    }
  }

  if (!eng && !dk) {
    eng = ukr;
    dk = ukr;
  }

  const englishText = eng ? eng : ukr;

  const dkText = dk ? dk : ukr;

  const text = new LanguageItem(ukr, englishText, dkText);

  switch (lang) {
    case 'UKR':
      return text.ukr;

    case 'ENG':
      return text.eng;

    case 'DK':
      return text.dk;
    default:
      return text.dk;
  }
};
export default Multilanguage;
