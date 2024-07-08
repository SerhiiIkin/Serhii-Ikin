// eslint-disable-next-line import/no-unresolved
import { useMemo } from 'react';

// eslint-disable-next-line import/no-unresolved
import HelpUkraineText from '@MultilanguageText/HelpUkraineText';

import Converter from '@components/Converter';
import ImageSlider from '@components/ImageSlider';
import SectionLayout from '@components/Layouts/SectionLayout';
import Title from '@components/Title';

import Multilanguage from '@utils/Multilanguage';

const HelpUkraine = () => {
  const { convertorTitle, convertorText, title } = HelpUkraineText();

  const donationData = useMemo(
    () => [
      {
        id: 1,
        title: {
          ukr: 'Постійний збір на дрони камікадзе',
          eng: 'Permanent collection for kamikaze drones',
          dk: 'Permanent samling til kamikaze-droner',
        },
        description: {
          ukr: 'Сергій Стерненко і його команда, постійно збирають військовим на допомогу українським військовим. Є що допомогти? Використовуйте посилання до сторінки донатів. Маленьких донатів не буває',
          eng: 'Serhii Sternenko and his team are constantly collecting military personnel to help the Ukrainian military. Is there anything to help? Use the link to the donation page. There are no small donations',
          dk: 'Serhii Sternenko og hans team indsamler konstant militært personel for at hjælpe det ukrainske militær. Er der noget at hjælpe? Brug linket til donationssiden. Der er ingen små donationer',
        },
        imgs: ['sternenko/sternenko.jpg'],
        link: 'https://send.monobank.ua/jar/dzBdJ3737',
      },
    ],
    []
  );

  return (
    <SectionLayout className="pt-8">
      <Title typeTitle="h2">{convertorTitle}</Title>
      <p className="pb-4">{convertorText}</p>
      <Converter />
      <Title typeTitle="h1">{title}</Title>
      <ul className="marker:text-primaryLigthBlue list-decimal marker:font-bold">
        {donationData.map(({ title, description, imgs, id, link }) => {
          const titleLanguage = Multilanguage(title);
          const descriptionLanguage = Multilanguage(description);
          return (
            <li key={id}>
              <a href={link} target="_blank" className="">
                <Title
                  typeTitle="h2"
                  className="xl:hover:text-primaryLigth xl:hover:bg-primaryLigthBlue bg-primaryDarkBlue rounded p-2 text-left xl:hover:duration-500"
                >
                  {titleLanguage}
                </Title>
              </a>
              <p className="pb-4">{descriptionLanguage}</p>

              <ImageSlider images={imgs} />
            </li>
          );
        })}
      </ul>
    </SectionLayout>
  );
};

export default HelpUkraine;
