import { useQuery } from '@tanstack/react-query';

import type { DonutType } from '@modules/DonutType';
import { DonutContextValueDashboard } from '@variables/DonutContextValueDashboard';

import { DonutContext } from '@components/Context/DonutContext';
import DonutContent from '@components/DonutContent';
import FetchDataHandlerLayout from '@components/Layouts/FetchDataHandlerLayout';
import SectionLayout from '@components/Layouts/SectionLayout';

import { getDonuts } from '@utils/axios';

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
