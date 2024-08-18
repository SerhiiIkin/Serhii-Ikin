import { lazy } from 'react';

import FetchDataHandler from '@layouts/FetchDataHandler';
import SectionLayout from '@layouts/SectionLayout';

import SkillsSection from '@components/SkillsSection';
import Title from '@components/Title';

import { useAppSelector } from '@hooks/redux';
import { useGetImages } from '@hooks/useGetImages';
import { useSectionTilteDescriptionHook } from '@hooks/useSectionTilteDescriptionHook';

import { folderNames } from '@variables/folderNames';

const Image = lazy(() => import('@components/Image'));

const Welcome = () => {
  const { language } = useAppSelector(state => state.language);

  const { description, isLoading, error } =
    useSectionTilteDescriptionHook('about');
  const profileImages = useGetImages(folderNames.forsideWelcome);

  return (
    <SectionLayout classNameContainer="grid md:grid-cols-3 h-full gap-2 md:gap-4 xl:gap-6  pt-6 md:pt-8 xl:pt-10">
      <FetchDataHandler
        data={{
          data: description,
          isLoading,
          error: error?.message ?? '',
        }}
        containerClassNameSkeleton="md:col-span-3 md:row-start-1 md:min-h-0 xl:col-span-2"
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
          {description}
        </Title>
      </FetchDataHandler>

      <FetchDataHandler
        data={{
          data: profileImages.images.sm,
          isLoading: profileImages.isLoading,
          error: profileImages.error?.message ?? '',
        }}
        containerClassNameSkeleton="md:row-start-1 md:col-start-1 xl:col-start-3 xl:row-start-1"
        SkeletonCount={15}
      >
        <Image
          srcSM={profileImages.images.sm}
          srcMD={profileImages.images.md}
          srcXL={profileImages.images.xl}
          classNamePicture="relative xl:after:content-[''] xl:after:absolute xl:after:inset-0 xl:after:backdrop-grayscale hover:xl:after:backdrop-grayscale-0 focus-within:xl:after:backdrop-grayscale-0 xl:after:duration-1000"
          classNameImg="rounded-xl "
          classNameFigure="flex justify-center  md:row-start-1 md:col-start-1 xl:col-start-3 xl:row-start-1 "
        />
      </FetchDataHandler>
      <SkillsSection isEdit={false} />
    </SectionLayout>
  );
};

export default Welcome;
