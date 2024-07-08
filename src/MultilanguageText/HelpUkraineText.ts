import Multilanguage from '@utils/Multilanguage';

export default function HelpUkraineText() {
  const title = Multilanguage({
    ukr: 'Пожертви українським військовим',
    eng: 'Donations to the Ukrainian military',
    dk: 'Donationer til det ukrainske militær',
  });
  const errorMessage = Multilanguage({
    ukr: 'Помилка завантаження даних з банку!',
    eng: 'Error downloading data from the bank!',
    dk: 'Fejl ved download af data fra bank!',
  });

  const convertorTitle = Multilanguage({
    ukr: 'Конвертувати валюту',
    eng: 'Convert currency',
    dk: 'Konverter valuta',
  });

  const convertorText = Multilanguage({
    ukr: 'Я зробив конвертер валюти, для розуміння скільки грошей бажаєте донатити',
    eng: 'I made a currency converter to understand how much money you want to donate',
    dk: 'Jeg lavede en valutaomregner for at forstå, hvor mange penge du vil donere',
  });

  return {
    title,
    errorMessage,
    convertorTitle,
    convertorText,
  };
}
