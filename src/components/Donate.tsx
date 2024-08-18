import { useQuery } from '@tanstack/react-query';

import FetchDataHandlerLayout from '@layouts/FetchDataHandler';
import SectionLayout from '@layouts/SectionLayout';

import { DonutContext } from '@context/DonutContext';

import DonutContent from '@components/DonutContent';

import { getDonuts } from '@utils/axios';

import { DonutContextValueDashboard } from '@variables/DonutContextValueDashboard';

import type { DonutType } from '@modules/DonutType';

const Donate = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['donate'],
    queryFn: getDonuts,
  });

  return (
    <SectionLayout>
      <DonutContext.Provider value={DonutContextValueDashboard}>
        <FetchDataHandlerLayout
          data={{
            data,
            error: error?.message ? error.message : '',
            isLoading,
          }}
        >
          <ul className="grid gap-2">
            {data?.map((donut: DonutType) => (
              <DonutContent key={donut._id} {...donut} />
            ))}
          </ul>
        </FetchDataHandlerLayout>
      </DonutContext.Provider>
    </SectionLayout>
  );
};

export default Donate;
