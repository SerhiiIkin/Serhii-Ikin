import Multilanguage from '@utils/Multilanguage';

const HeaderText = () => {
  const fullName = Multilanguage({
    ukr: 'Сергій Ікін',
    eng: 'Serhii Ikin',
    dk: 'Serhii Ikin',
  });
  const home = Multilanguage({ ukr: 'Домашня', eng: 'Home', dk: 'Hjem' });
  const blog = Multilanguage({
    ukr: 'Блог',
    eng: 'Blog',
    dk: 'Blog',
  });
  const portfolio = Multilanguage({
    ukr: 'Проекти',
    eng: 'Projects',
    dk: 'Projekter',
  });

  return {
    fullName,
    home,
    blog,
    portfolio,
  };
};
export default HeaderText;
