import { useQuery } from '@tanstack/react-query';
import { useContext, useRef, useState } from 'react';
import type { ChangeEvent, RefObject } from 'react';

import SectionLayout from '@layouts/SectionLayout';

import { ToastContext } from '@context/ToastContext';

import Button from '@components/Button';
import Title from '@components/Title';

import { getImagesAxios, updateImagesAxios } from '@utils/axios';

import { folderNames } from '@variables/folderNames';

const ForsideEditWelcomeImage = () => {
  const toast = useContext(ToastContext);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [images, setImages] = useState<FileList | null>(null);
  const inputFileRef: RefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null);

  const getImagesWelcome = useQuery({
    queryKey: [folderNames.forsideWelcome],
    queryFn: () => getImagesAxios(folderNames.forsideWelcome),
  });

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

  const uploadImages = async () => {
    const formData = new FormData();

    if (images?.length === 0 || images?.length === undefined) {
      toast.error('Забув загрузити картинки');
      return;
    }

    if (images) {
      for (let i = 0; i < images?.length; i++) {
        formData.append('images', images[i]);
      }
    }

    formData.append('title', folderNames.forsideWelcome);
    const uploadedFiles = await handleImages(formData);
    return uploadedFiles;
  };

  const handleImages = async (formData: FormData) => {
    try {
      const response = await updateImagesAxios(formData);
      toast.success('Картинки оновленно на сервері');

      return response.data.uploadedFiles;
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
    setImages(null);
    setPreviewImages([]);
    if (inputFileRef?.current !== null) {
      inputFileRef.current.value = '';
    }
  };

  return (
    <SectionLayout>
      <form className="pb-4">
        <input
          ref={inputFileRef}
          className="mb-2 mr-2"
          type="file"
          onChange={imageHandler}
          name="images"
          multiple
        />
        <Button type="button" onClick={uploadImages}>
          Upload image
        </Button>
        <Button
          type="reset"
          onClick={resetHandler}
          className="ml-2 bg-secondaryRed"
        >
          Reset
        </Button>
      </form>
      <Title typeTitle="h3"> Prewiview images </Title>
      <article className="flex flex-wrap">
        {images &&
          Array.from(images).map((image, index) => (
            <div key={index}> {image.name} </div>
          ))}
      </article>
      <article className="flex flex-wrap">
        {previewImages.length > 0 && (
          <>
            {previewImages.map((image, index) => (
              <div key={index} className="p-2">
                <img
                  key={index}
                  src={image}
                  width={200}
                  height={100}
                  alt={''}
                />
              </div>
            ))}
          </>
        )}
      </article>
      <Title typeTitle="h3"> Bucket images </Title>
      <article className="flex flex-wrap">
        {getImagesWelcome.data?.map((image: string, index: number) => (
          <div key={index} className="p-2">
            <img key={index} src={image} width={200} height={100} alt={''} />
          </div>
        ))}
      </article>
      
    </SectionLayout>
  );
};

export default ForsideEditWelcomeImage;
