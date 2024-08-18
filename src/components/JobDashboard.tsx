import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import type { ChangeEvent } from 'react';

import { ToastContext } from '@context/ToastContext';

import Button from '@components/Button';
import Input from '@components/Input';
import Textarea from '@components/Textarea';

import { removeJobAxios, updateJobAxios } from '@utils/axios';

import type { JobType } from '@modules/JobType';

const JobDashboard = (job: JobType) => {
  const queryClient = useQueryClient();
  const toast = useContext(ToastContext);

  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState(job);

  const dataHandler = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    if (name === 'date') {
      setFormData(prev => ({
        ...prev,
        date: value,
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        description: {
          ...prev.description,
          [name]: value,
        },
      }));
    }
  };

  const removeJobMutation = useMutation({
    mutationFn: (jobId: string) => removeJobAxios(jobId),
    onSuccess: () => {
      toast.success('Job removed');
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
    onError: () => toast.error('Error removing Job'),
  });

  const updateJobMutation = useMutation({
    mutationFn: (data: JobType) => updateJobAxios(data),
    onSuccess: () => {
      toast.success('Job updated');
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
    onError: () => toast.error('Error updating Job'),
  });

  const editJob = () => {
    setIsEdit(prev => !prev);
    if (isEdit) {
      updateJobMutation.mutate(formData);
    }
  };

  return (
    <article className="mb-2 border-b border-dashed border-primaryDarkBlue pb-2">
      <div className="flex flex-col">
        Date:
        <Input
          name="date"
          value={formData.date}
          onChange={dataHandler}
          disabled={!isEdit}
          className="disabled:bg-transparent"
        />
      </div>
      <div className="flex flex-col">
        Job Description ukr:
        <Textarea
          name="ukr"
          value={formData.description.ukr}
          onChange={dataHandler}
          disabled={!isEdit}
          className="disabled:bg-transparent disabled:outline-none"
        />
      </div>
      <div className="flex flex-col">
        Job Description eng:
        <Textarea
          name="eng"
          value={formData.description.eng}
          onChange={dataHandler}
          disabled={!isEdit}
          className="disabled:bg-transparent disabled:outline-none"
        />
      </div>
      <div className="flex flex-col pb-2">
        Job Description dk:
        <Textarea
          name="dk"
          value={formData.description.dk}
          onChange={dataHandler}
          disabled={!isEdit}
          className="disabled:bg-transparent disabled:outline-none"
        />
      </div>
      <Button onClick={editJob} type="button">
        {isEdit ? 'Save' : 'Edit'}
      </Button>
      <Button
        onClick={() => removeJobMutation.mutate(job._id ?? '')}
        className="ml-2 bg-secondaryRed"
        type="button"
      >
        Remove
      </Button>
    </article>
  );
};

export default JobDashboard;
