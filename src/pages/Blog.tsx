import { useQuery } from '@tanstack/react-query';
import { lazy, useMemo } from 'react';

import FetchDataHandler from '@layouts/FetchDataHandler';
import SectionLayout from '@layouts/SectionLayout';

import Job from '@components/Job';
import { LanguagesSection } from '@components/LanguagesSection';
import Title from '@components/Title';

import { useGetImages } from '@hooks/useGetImages';
import { useSectionTilteDescriptionHook } from '@hooks/useSectionTilteDescriptionHook';

import Multilanguage from '@utils/Multilanguage';
import { getJobsAxios } from '@utils/axios';
import { classes } from '@utils/classes';

import { folderNames } from '@variables/folderNames';

import type { JobType } from '@modules/JobType';

const Image = lazy(() => import('@components/Image'));

const Blog = () => {
  const hobbyData = useSectionTilteDescriptionHook('hobby');
  const resumeData = useSectionTilteDescriptionHook('resume');
  const profileImages = useGetImages(folderNames.blog);

  const jobs = useQuery({
    queryKey: ['jobs'],
    queryFn: getJobsAxios,
  });

  const sortedJobs: JobType[] = useMemo(
    () =>
      jobs?.data &&
      jobs.data?.sort((a: JobType, b: JobType) => +b.date - +a.date),
    [jobs.data]
  );

  const languageTitle = Multilanguage({
    ukr: 'Мови',
    eng: 'Languages',
    dk: 'Sprog',
  });

  const workTitle = Multilanguage({
    ukr: 'Де я працював?',
    eng: 'Where did I work?',
    dk: 'Hvor arbejdede jeg?',
  });

  return (
    <>
      <SectionLayout classNameContainer="md:grid md:grid-cols-2 gap-2 md:gap-4 xl:gap-6">
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
            classNameImg="rounded-xl mx-auto"
            classNameFigure="md:row-span-2"
          />
        </FetchDataHandler>
        <FetchDataHandler
          data={{
            data: [resumeData.description],
            isLoading: resumeData.isLoading,
            error: resumeData.error?.message ?? '',
          }}
          SkeletonCount={16}
        >
          <Title typeTitle="h2"> {resumeData.title} </Title>
          <p className="text-primaryDark"> {resumeData.description} </p>
        </FetchDataHandler>
      </SectionLayout>
      <SectionLayout>
        <FetchDataHandler
          data={{
            data: hobbyData.description,
            isLoading: hobbyData.isLoading,
            error: hobbyData.error?.message ?? '',
          }}
        >
          <Title typeTitle="h3"> {hobbyData.title} </Title>
          <p> {hobbyData.description} </p>
        </FetchDataHandler>
      </SectionLayout>
      <SectionLayout>
        <Title typeTitle="h2" className="text-primaryDarkBlue xl:pb-8">
          {languageTitle}
        </Title>
        <LanguagesSection />
      </SectionLayout>
      <SectionLayout>
        <Title typeTitle="h2" className="pb-10">
          {workTitle}
        </Title>
        <FetchDataHandler
          data={{
            data: jobs.data,
            isLoading: jobs.isLoading,
            error: jobs.error?.message ?? '',
          }}
          SkeletonCount={25}
        >
          <ul
            className={classes([
              'relative grid auto-rows-fr gap-x-4 gap-y-14 pb-10 pt-2 md:gap-y-16 md:py-8 xl:gap-y-20 xl:py-8',
              'before:absolute before:left-auto before:right-4 before:top-0 before:h-full before:w-4 before:-translate-x-1/2 before:rounded before:bg-primaryDark before:content-[""]',
              'sm:before:left-1/2',
            ])}
          >
            {sortedJobs?.map(job => <Job key={job._id} {...job} />)}
          </ul>
        </FetchDataHandler>
      </SectionLayout>
    </>
  );
};

export default Blog;
