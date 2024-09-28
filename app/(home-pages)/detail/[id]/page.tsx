'use client';

import Button from '@/components/button';
import { ButtonTypeEnum } from '@/components/button/enum';
import InputComponent from '@/components/forms/inputs/input';
import TextareaComponent from '@/components/forms/inputs/textarea';
import { ROUTES } from '@/constants/routes';
import usePostStore from '@/stores/slices/list';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as yup from 'yup';
import style from './style.module.scss';

const schema = yup.object().shape({
  title: yup
    .string()
    .required('Başlık zorunludur')
    .min(3, 'Başlık en az 3 karakter olmalıdır')
    .max(50, 'Başlık en fazla 50 karakter olabilir'),
  body: yup
    .string()
    .required('İçerik zorunludur')
    .min(10, 'İçerik en az 10 karakter olmalıdır')
    .max(500, 'İçerik en fazla 500 karakter olabilir'),
});

const DetailPage: React.FC = () => {
  const router = useRouter();

  const { id } = useParams();
  const { selectedPost, loadPostById, updatePost, isLoading, errorMessage } = usePostStore();
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (typeof id === 'string') {
      loadPostById(id);
    }
  }, [id]);

  useEffect(() => {
    if (selectedPost) {
      setValue('title', selectedPost.title);
      setValue('body', selectedPost.body);
    }
  }, [selectedPost, setValue]);

  const onSubmit = async (data: { title: string; body: string }) => {
    if (typeof id === 'string') {
      await updatePost(id, data);
      setIsEditing(false);
      toast.success('Başarıyla kaydedildi! yönlendirileceksiniz...');
      setTimeout(() => {
        router.push(ROUTES.LIST);
      }, 2000);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.detailContainer}>
        <ToastContainer />
        {isLoading ? (
          <p>Yükleniyor...</p>
        ) : errorMessage ? (
          <p>{errorMessage}</p>
        ) : selectedPost ? (
          <div>
            <h2>{selectedPost.id}</h2>

            {isEditing ? (
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className={style.formGroup}>
                  <Controller
                    name='title'
                    control={control}
                    render={({ field }) => (
                      <InputComponent
                        control={control}
                        placeholder='Başlık'
                        label='Başlık'
                        error={errors.title}
                        {...field}
                      />
                    )}
                  />
                </div>
                <div className={style.formGroup}>
                  <Controller
                    name='body'
                    control={control}
                    render={({ field }) => (
                      <TextareaComponent
                        control={control}
                        placeholder='İçerik'
                        label='İçerik'
                        error={errors.body}
                        {...field}
                      />
                    )}
                  />
                </div>
                <Button buttonType='submit'>Kaydet</Button>
                <Button type={ButtonTypeEnum.SECONDARY} onClick={() => setIsEditing(false)}>
                  İptal
                </Button>
              </form>
            ) : (
              <div>
                <h3>{selectedPost.title}</h3>
                <p>{selectedPost.body}</p>
                <Button onClick={() => setIsEditing(true)}>Düzenle</Button>
                <Button type={ButtonTypeEnum.SECONDARY} onClick={() => router.push(ROUTES.LIST)}>
                  Geri Dön
                </Button>
              </div>
            )}
          </div>
        ) : (
          <p>Post bulunamadı.</p>
        )}
      </div>{' '}
    </div>
  );
};

export default DetailPage;
