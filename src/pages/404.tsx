import SectionLayout from '@layouts/SectionLayout';

import Title from '@components/Title';

import Multilanguage from '@utils/Multilanguage';

const NotFounded = () => {
  const cantFind = Multilanguage({
    ukr: 'Помилкова сторінка',
    eng: 'Wrong page',
    dk: 'Forkert side',
  });
  return (
    <SectionLayout>
      <Title typeTitle="h1">404</Title>
      <Title typeTitle="h2">{cantFind}</Title>
    </SectionLayout>
  );
};

export default NotFounded;
