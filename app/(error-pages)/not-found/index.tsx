'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import style from './style.module.scss';
import Button from '@/components/button';

const WebNotFoundPage: React.FC = () => {
  const router = useRouter();

  const goToHome = () => {
    router.push('/');
  };

  return (
    <div className={style.notFoundContainer}>
      <h1 className={style.title}>404</h1>
      <p className={style.description}>Üzgünüz, aradığınız sayfa bulunamadı.</p>
      <Button onClick={goToHome}>Anasayfaya Dön</Button>
    </div>
  );
};

export default WebNotFoundPage;
