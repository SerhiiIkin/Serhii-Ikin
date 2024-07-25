import { useQuery } from '@tanstack/react-query';

import type { DonutType } from '@modules/DonutType';
import { DonutContextValueDashboard } from '@variables/DonutContextValueDashboard';

import DonutContent from '@components/DonutContent';
import DashboardLayout from '@components/Layouts/DashboardLayout';
import { DonutContext } from '@components/Layouts/DonutContext';
import FetchDataHandlerLayout from '@components/Layouts/FetchDataHandlerLayout';
import IndexLayout from '@components/Layouts/IndexLayout';
import SectionLayout from '@components/Layouts/SectionLayout';

import axios from '@utils/axios';

const Donate = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['donate'],
    queryFn: async () => axios.get('api/donut').then(res => res.data),
  });

  return (
    <IndexLayout>
      <DashboardLayout>
        <SectionLayout>
          <DonutContext.Provider value={DonutContextValueDashboard}>
            <FetchDataHandlerLayout
              data={{
                data,
                error: error?.message ? error.message : '',
                isLoading,
              }}
            >
              <ul className="">
                {data?.map((donut: DonutType) => (
                  <DonutContent key={donut._id} {...donut} />
                ))}
              </ul>
            </FetchDataHandlerLayout>
          </DonutContext.Provider>
        </SectionLayout>
      </DashboardLayout>
    </IndexLayout>
  );
};

export default Donate;
