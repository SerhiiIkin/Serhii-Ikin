import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import FetchDataHandler from '@layouts/FetchDataHandler';
import SectionLayout from '@layouts/SectionLayout';

import Button from '@components/Button';
import CreateSectionTitleText from '@components/CreateSectionTitleText';
import Title from '@components/Title';

import { getAllSectionTitleDescription } from '@utils/axios';

import type { SectionTitleDesciptionType } from '@modules/textType';

const ListSectionTitleText = () => {
  const initialData = {
    title: {
      ukr: '',
      eng: '',
      dk: '',
    },

    description: {
      ukr: '',
      eng: '',
      dk: '',
    },
    key: '',
  };
  const { data, error, isLoading } = useQuery({
    queryKey: ['section-title-description'],
    queryFn: getAllSectionTitleDescription,
  });
  const [currentData, setCurrentData] =
    useState<SectionTitleDesciptionType>(initialData);

  const editSectionTitleText = (data: SectionTitleDesciptionType) => {
    setCurrentData(data);
  };

  return (
    <SectionLayout>
      <CreateSectionTitleText data={currentData} />
      <FetchDataHandler data={{ data, error: error?.message ?? '', isLoading }}>
        {data &&
          data?.map((sectionData: SectionTitleDesciptionType) => {
            return (
              <div className="py-2" key={sectionData.key}>
                <div className="flex gap-2">
                  <Title typeTitle="h3" className="text-left">
                    Key:{sectionData.key}
                  </Title>
                  <Button
                    type="button"
                    onClick={() => editSectionTitleText(sectionData)}
                  >
                    Edit
                  </Button>
                </div>
                <p className="grid grid-cols-3 gap-2">
                  <span>{sectionData.title.ukr}</span>
                  <span>{sectionData.title.eng}</span>
                  <span>{sectionData.title.dk}</span>
                </p>
                <p className="grid grid-cols-3 gap-2">
                  <span>{sectionData.description.ukr}</span>
                  <span>{sectionData.description.eng}</span>
                  <span> {sectionData.description.dk}</span>
                </p>
              </div>
            );
          })}
      </FetchDataHandler>
    </SectionLayout>
  );
};

export default ListSectionTitleText;
