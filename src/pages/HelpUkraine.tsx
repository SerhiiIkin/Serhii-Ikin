import { useQuery } from '@tanstack/react-query';

import type { DonutType } from '@modules/DonutType';
import { DonutContextValueHelpUkraine } from '@variables/DonutContextValueHelpUkraine';
import HelpUkraineText from '@variables/HelpUkraineText';

import Converter from '@components/Converter';
import DonutContent from '@components/DonutContent';
import { DonutContext } from '@components/Layouts/DonutContext';
import FetchDataHandler from '@components/Layouts/FetchDataHandlerLayout';
import SectionLayout from '@components/Layouts/SectionLayout';
import Title from '@components/Title';

import axios from '@utils/axios';

const HelpUkraine = () => {
  const { convertorTitle, convertorText, title } = HelpUkraineText();

  const { data, error, isLoading } = useQuery({
    queryKey: ['donate'],
    queryFn: async () => axios.get('api/donut').then(res => res.data),
  });

  return (
    <SectionLayout className="pt-8">
      <Title typeTitle="h2">{convertorTitle}</Title>
      <p className="pb-4">{convertorText}</p>
      <Converter />
      <Title typeTitle="h1">{title}</Title>
      <DonutContext.Provider value={DonutContextValueHelpUkraine}>
        <FetchDataHandler
          data={{ data, error: error?.message ? error.message : '', isLoading }}
        >
          <ul className="list-decimal marker:font-bold marker:text-primaryDarkBlue">
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
