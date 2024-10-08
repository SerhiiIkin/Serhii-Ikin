import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { ChangeEvent, FormEvent, RefObject } from 'react';
import { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import FetchDataHandler from '@layouts/FetchDataHandler';
import SectionLayout from '@layouts/SectionLayout';

import { ToastContext } from '@context/ToastContext';

import Button from '@components/Button';
import Input from '@components/Input';
import Textarea from '@components/Textarea';

import {
  createDonutAxios,
  getSingleDonutAxios,
  updateDonutAxios,
  updateImagesAxios,
  uploadImagesAxios,
} from '@utils/axios';

import type { DonutType } from '@modules/DonutType';

const DonutForm = () => {
  const toast = useContext(ToastContext);
  const queryClient = useQueryClient();
  const inputFileRef: RefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null);

  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [images, setImages] = useState<FileList | null>(null);

  const { id } = useParams();

  const initialData: DonutType = {
    images: [],
    title: {
      ukr: '',
      eng: '',
      dk: '',
    },
    link: '',
    description: {
      ukr: '',
      eng: '',
      dk: '',
    },
  };

  const {
    isPending,
    error,
    data: currentDonut,
  } = useQuery({
    queryKey: ['editdonut'],
    queryFn: () =>
      getSingleDonutAxios({
        id: id ?? '',
        initialData,
      }),
    initialData: initialData,
  });

  const [data, setData] = useState<DonutType>(initialData);

  const createDonutMutation = useMutation({
    mutationKey: ['donate'],
    mutationFn: createDonutAxios,
    onSuccess: () => {
      resetHandler();

      toast.success('Донат успішно створено');

      queryClient.invalidateQueries({ queryKey: ['donate'] });
    },
    onError: () => {
      toast.error('Помилка при створенні донату');
    },
  });
  const updateDonutMutation = useMutation({
    mutationKey: ['donate'],
    mutationFn: updateDonutAxios,
    onSuccess: data => {
      setData(data);
      setImages(null);

      toast.success('Донат успішно оновленно');
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ['donate', id] });
      }, 3000);
    },
    onError: () => {
      toast.error('Помилка при оновленні донату');
    },
  });

  const submitHander = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (Array.isArray(data.images) && data.images.length > 0) {
      id
        ? updateDonutMutation.mutate({ data, id: id ?? '' })
        : createDonutMutation.mutate(data);
      toast('Завантаження  на сервер');
    } else {
      toast.error('Забув загрузити картинки на сервер');
    }
  };

  const dataHandler = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value, placeholder } = event.target;
    if (placeholder.includes('title')) {
      setData(prevData => ({
        ...prevData,
        title: {
          ...prevData.title,

          [name]: value,
        },
      }));
    } else if (placeholder.includes('description')) {
      setData(prevData => ({
        ...prevData,
        description: {
          ...prevData.description,

          [name]: value,
        },
      }));
    } else if (name.includes('isFavorite')) {
      setData(prevData => ({
        ...prevData,
        [name]: (event.target as HTMLInputElement)?.checked,
      }));
    } else {
      setData(prevData => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const imageHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setImages(event.target.files);
    setPreviewImages([]);

    const uploadImage = (file: File) => {
      if (
        file.type === 'image/jpeg' ||
        file.type === 'image/jpg' ||
        file.type === 'image/png' ||
        file.type === 'image/webp' ||
        file.type === 'image/svg+xml'
      ) {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setPreviewImages(prev => [...prev, reader.result as string]);
          }
        };
        reader.readAsDataURL(file);
      } else {
        setPreviewImages([]);
      }
    };

    Array.from(event.target.files || []).forEach(e => {
      uploadImage(e);
    });
  };

  const uploadImages = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();

    if (images?.length === 0) {
      toast.error('Забув загрузити картинки');
      return;
    }

    if (images) {
      for (let i = 0; i < images?.length; i++) {
        formData.append('images', images[i]);
      }
    }

    if (!data.title.eng) {
      toast.error('Забув прописати titleENG');
      return;
    }

    formData.append('title', data.title.eng);
    handleImages(formData);
  };

  const handleImages = async (formData: FormData) => {
    try {
      const response = await (id
        ? uploadImagesAxios(formData)
        : updateImagesAxios(formData));
      toast.success(
        id ? 'Картинки оновленно на сервері' : 'Картинки завантажено на сервер'
      );

      setData(prevData => ({
        ...prevData,
        images: response.data.uploadedFiles,
      }));
    } catch (error) {
      console.error(error);
      let message;

      if (error instanceof Error) {
        message = error.message;
      } else if (error && typeof error === 'object' && 'message' in error) {
        message = error.message;
      } else if (typeof error === 'string') {
        message = error;
      } else {
        message = 'somethink went wrong';
      }

      toast.error(message as string);
    }
  };

  const resetHandler = () => {
    setData(initialData);
    setImages(null);
    setPreviewImages([]);
    if (inputFileRef?.current !== null) {
      inputFileRef.current.value = '';
    }
  };

  useEffect(() => {
    if (currentDonut) {
      setData(currentDonut);
    }
  }, [currentDonut]);

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['editDonut'] });
  }, [id, queryClient]);

  return (
    <>
      <SectionLayout>
        <form onSubmit={uploadImages} className="pb-4">
          <input
            ref={inputFileRef}
            className="mr-2"
            type="file"
            onChange={imageHandler}
            name="images"
            multiple
          />
          <Button type="submit">Upload image</Button>
          <Button
            type="reset"
            onClick={resetHandler}
            className="ml-2 bg-secondaryRed"
          >
            Reset
          </Button>
        </form>
        <h3 className="pb-4">Preview images</h3>
        {previewImages.length > 0 && (
          <div className="flex gap-4 pb-4">
            {previewImages.map((image, index) => (
              <img key={index} src={image} width={300} height={200} alt={''} />
            ))}
          </div>
        )}
        <FetchDataHandler
          data={{
            data: currentDonut,
            error: error?.message as string,
            isLoading: isPending,
          }}
        >
          {currentDonut && <h3 className="pb-4">Current images</h3>}
          {currentDonut && (
            <div className="flex flex-wrap gap-4 pb-4">
              {Array.isArray(data?.images) &&
                data?.images?.map((image, index) => (
                  <img
                    key={index}
                    src={image.fileUrl}
                    width={300}
                    height={200}
                    alt={data?.title.eng}
                  />
                ))}
            </div>
          )}
        </FetchDataHandler>
        <form onSubmit={submitHander} className="grid grid-cols-1 gap-4 pb-4">
          <Input
            type="text"
            name="ukr"
            className=""
            placeholder="title ukr"
            value={data?.title?.ukr || ''}
            onChange={dataHandler}
          />

          <Input
            type="text"
            required
            name="eng"
            className=""
            placeholder="title eng"
            value={data?.title?.eng || ''}
            onChange={dataHandler}
          />
          <Input
            type="text"
            name="dk"
            className=""
            placeholder="title dk"
            value={data?.title?.dk || ''}
            onChange={dataHandler}
          />
          <Textarea
            name="ukr"
            placeholder="descriptionUKR"
            value={data?.description?.ukr || ''}
            onChange={dataHandler}
          />
          <Textarea
            name="eng"
            placeholder="descriptionENG"
            value={data?.description?.eng || ''}
            onChange={dataHandler}
          />
          <Textarea
            name="dk"
            placeholder="descriptionDK"
            value={data?.description?.dk || ''}
            onChange={dataHandler}
          />
          <Input
            type="text"
            name="link"
            className=""
            placeholder="link"
            value={data?.link || ''}
            onChange={dataHandler}
          />

          <div>
            <Button className="bg-primaryDarkBlue" type="submit">
              Submit
            </Button>
            <Button
              type="reset"
              className="ml-2 bg-secondaryRed"
              onClick={resetHandler}
            >
              Reset
            </Button>
          </div>
        </form>
      </SectionLayout>
    </>
  );
};

export default DonutForm;
