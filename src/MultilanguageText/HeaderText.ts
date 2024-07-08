import Multilanguage from '@utils/Multilanguage';

function HeaderText() {
  const fullName = Multilanguage({
    ukr: 'Сергій Ікін',
    eng: 'Serhii Ikin',
    dk: 'Serhii Ikin',
  });
  const home = Multilanguage({ ukr: 'Домашня', eng: 'Home', dk: 'Hjem' });
  const about = Multilanguage({
    ukr: 'Про мене',
    eng: 'About me',
    dk: 'Om mig',
  });
  const portfolio = Multilanguage({
    ukr: 'Портфоліо',
    eng: 'Portfolio',
    dk: 'Portefølje',
  });

  return {
    fullName,
    home,
    about,
    portfolio,
  };
}
export default HeaderText;
