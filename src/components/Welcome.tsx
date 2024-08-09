import { useQuery } from '@tanstack/react-query';
import { lazy } from 'react';

import { profileImages } from '@variables/profileImages';
import { skillsListGoup } from '@variables/skillsList';

import FetchDataHandler from '@components/Layouts/FetchDataHandlerLayout';
import SectionLayout from '@components/Layouts/SectionLayout';
import Title from '@components/Title';

import { useAppSelector } from '@hooks/redux';

import Multilanguage from '@utils/Multilanguage';
import { getForsideWelcomeDescription } from '@utils/axios';

const Image = lazy(() => import('@components/Image'));

const Welcome = () => {
  const { language } = useAppSelector(state => state.language);

  const description = useQuery({
    queryKey: ['forside-welcome-description'],
    queryFn: getForsideWelcomeDescription,
  });

  return (
    <SectionLayout
      className=""
      classNameContainer="grid md:grid-cols-3 h-full gap-2 md:gap-4 xl:gap-6  pt-6 md:pt-8 xl:pt-10"
    >
      <FetchDataHandler
        data={{
          data: description.data,
          error: description.error ? description.error.message : '',
          isLoading: description.isLoading,
        }}
      >
        <Title
          typeTitle="h3"
          className={[
            'isolate min-h-[200px] pt-10 text-left text-primaryDark backdrop-blur-2xl',
            'md:col-span-3 md:row-start-1 md:min-h-0',
            'xl:col-span-2',
            'before:absolute before:-left-0 before:-top-4 before:-z-10 before:font-serif before:text-6xl before:font-bold before:content-[open-quote]',
            language != 'UKR' && 'font-DancingScript',
          ].join(' ')}
        >
          {Multilanguage(description.data)}
        </Title>
      </FetchDataHandler>
      <Image
        srcSM={profileImages().sm}
        srcMD={profileImages().md}
        srcXL={profileImages().xl}
        classNamePicture="relative xl:after:content-[''] xl:after:absolute xl:after:inset-0 xl:after:backdrop-grayscale hover:xl:after:backdrop-grayscale-0 focus-within:xl:after:backdrop-grayscale-0 xl:after:duration-1000"
        classNameImg="rounded-xl max-h-[40dvh] xl:max-h-[60dvh]"
        classNameFigure="flex justify-center  md:row-start-1 md:col-start-1 xl:col-start-3 xl:row-start-1 "
      />
      {skillsListGoup.map((skill, i) => (
        <ul key={i} className="md:row-start-3">
          <li className="text-md text-primaryDarkBlue md:text-xl xl:text-2xl">
            {skill.title}:
          </li>
          {skill.list.map((item, index) => (
            <li
              key={index}
              className="list-['*'] pl-4 text-primaryDark marker:text-primaryDarkBlue"
            >
              <b>{item.b}</b> {item.li.join(', ')}
            </li>
          ))}
        </ul>
      ))}
    </SectionLayout>
  );
};

export default Welcome;
