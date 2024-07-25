import { useQuery } from '@tanstack/react-query';
import type { ChangeEvent, SyntheticEvent } from 'react';
import { useMemo, useState } from 'react';

import type { BankDataType } from '@modules/bankDataType';
import { UKR } from '@variables/UkrData';
import { convertorRegex } from '@variables/convertorRegex';
import axios from 'axios';

import Input from '@components/Input';
import FetchDataHandlerLayout from '@components/Layouts/FetchDataHandlerLayout';
import Select from '@components/Select';

import Multilanguage from '@utils/Multilanguage';

const Converter = () => {
  const { isPending, data, error } = useQuery({
    queryKey: ['valuta'],
    queryFn: () =>
      axios.get(import.meta.env.VITE_BankApi).then(res => res.data),
  });

  const [inputOne, setInputOne] = useState('1');
  const [inputTwo, setInputTwo] = useState('1');
  const [selectOne, setSelectOne] = useState('1');
  const [selectTwo, setSelectTwo] = useState('1');
  const [isCheckedSelectOne, setIsCheckedSelectOne] = useState(false);
  const [isCheckedSelectTwo, setIsCheckedSelectTwo] = useState(false);


  const errorMessage = Multilanguage({
    ukr: 'Помилка завантаження даних з банку!',
    eng: 'Error downloading data from the bank!',
    dk: 'Fejl ved download af data fra bank!',
  });

  const filteredValuta = useMemo(() => {
    if (data === undefined) return;
    const valutas = data?.filter((v: BankDataType) => {
      if (v.cc === 'DKK') {
        setSelectOne(v.rate.toString());
      }

      return v.cc === 'USD' || v.cc === 'DKK' || v.cc === 'EUR';
    });
    valutas.push(UKR);
    return valutas;
  }, [data]);

  const onBlur = () => {
    setIsCheckedSelectOne(false);
    setIsCheckedSelectTwo(false);
  };

  const selectOneChange = () => setIsCheckedSelectOne(prev => !prev);
  const selectTwoChange = () => setIsCheckedSelectTwo(prev => !prev);

  const calculateAnotherInput = (
    thisInput: string,
    thisSelect: number,
    anotherSelect: number
  ) => {
    const result = (+thisInput * thisSelect) / anotherSelect;
    return !isNaN(result) ? result.toFixed(2) : '0';
  };

  const onChangeInputOne = (e: ChangeEvent<HTMLInputElement>) => {
    if (!convertorRegex.test(e.target.value)) return;
    setInputOne(e.target.value);
    setInputTwo(calculateAnotherInput(e.target.value, +selectOne, +selectTwo));
  };

  const onChangeInputTwo = (e: ChangeEvent<HTMLInputElement>) => {
    if (!convertorRegex.test(e.target.value)) return;
    setInputTwo(e.target.value);
    setInputOne(calculateAnotherInput(e.target.value, +selectTwo, +selectOne));
  };

  const onChangeSelectOne = (event: SyntheticEvent<EventTarget, Event>) => {
    if (!(event.target instanceof HTMLLIElement)) {
      return;
    }
    event.stopPropagation();
    setSelectOne(event.target.dataset.value ?? '');
    setInputOne(
      calculateAnotherInput(
        selectTwo,
        +inputTwo,
        +(event.target.dataset.value ?? '')
      )
    );
    setIsCheckedSelectOne(false);
  };

  const onChangeSelectTwo = (event: SyntheticEvent<EventTarget, Event>) => {
    if (!(event.target instanceof HTMLLIElement)) {
      return;
    }
    event.stopPropagation();
    setSelectTwo(event.target.dataset.value ?? '');
    setInputTwo(
      calculateAnotherInput(
        selectOne,
        +inputOne,
        +(event.target.dataset.value ?? '')
      )
    );
    setIsCheckedSelectTwo(false);
  };

  return (
    <FetchDataHandlerLayout
      data={{
        data,
        error: error?.message ? errorMessage : '',
        isLoading: isPending,
      }}
    >
      <div className="inline-grid grid-cols-1 gap-2 pb-4 sm:grid-cols-2 lg:grid-cols-4">
        <Input
          type="text"
          value={inputOne}
          onChange={onChangeInputOne}
          placeholder="сумма"
        />

        <Select
          className="mr-4"
          value={selectOne}
          onClickOption={onChangeSelectOne}
          onChange={selectOneChange}
          filteredValuta={filteredValuta}
          isChecked={isCheckedSelectOne}
          onBlur={onBlur}
        />
        <Input
          type="text"
          value={inputTwo}
          onChange={onChangeInputTwo}
          placeholder="сумма"
        />
        <Select
          value={selectTwo}
          isChecked={isCheckedSelectTwo}
          onChange={selectTwoChange}
          onClickOption={onChangeSelectTwo}
          filteredValuta={filteredValuta}
          onBlur={onBlur}
        />
      </div>
    </FetchDataHandlerLayout>
  );
};

export default Converter;
