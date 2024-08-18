import { useQuery } from '@tanstack/react-query';

import FetchDataHandler from '@layouts/FetchDataHandler';
import SectionLayout from '@layouts/SectionLayout';

import { DonutContext } from '@context/DonutContext';

import Converter from '@components/Converter';
import DonutContent from '@components/DonutContent';
import Title from '@components/Title';

import { getDonuts } from '@utils/axios';

import { DonutContextValueHelpUkraine } from '@variables/DonutContextValueHelpUkraine';
import HelpUkraineText from '@variables/HelpUkraineText';

import type { DonutType } from '@modules/DonutType';

const HelpUkraine = () => {
  const { convertorTitle, convertorText, title } = HelpUkraineText();

  const { data, error, isLoading } = useQuery({
    queryKey: ['donate'],
    queryFn: getDonuts,
  });

  return (
    <SectionLayout>
      <Title typeTitle="h2">{convertorTitle}</Title>
      <p className="pb-4">{convertorText}</p>
      <Converter />
      <Title typeTitle="h1">{title}</Title>
      <DonutContext.Provider value={DonutContextValueHelpUkraine}>
        <FetchDataHandler
          data={{
            data,
            error: error?.message ? error.message : '',
            isLoading,
          }}
        >
          <ul className="grid list-decimal gap-2 marker:font-bold marker:text-primaryDarkBlue">
            {data?.map((donut: DonutType) => (
              <DonutContent key={donut._id} {...donut} />
            ))}
          </ul>
        </FetchDataHandler>
      </DonutContext.Provider>
    </SectionLayout>
  );
};

export default HelpUkraine;
