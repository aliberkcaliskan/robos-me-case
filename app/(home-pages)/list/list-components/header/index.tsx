'use client';

import React from 'react';
import style from './style.module.scss';
import { HeaderProps } from './interface';
import LOGO from '@/public/logo.svg';
import UserProfile from '@/public/user.png';
import Image from 'next/image';
import useUserStore from '@/stores/slices/user';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';

const Header: React.FC<HeaderProps> = ({ email, searchTerm, setSearchTerm }) => {
  const { clearUser } = useUserStore();
  const router = useRouter();

  const logout = async () => {
    await clearUser();
    router.push(ROUTES.LOGIN);
  };
  return (
    <header className={style.headerContainer}>
      <Image className={style.logo} src={LOGO} alt='logo' />
      <div className={style.searchBox}>
        <input
          type='text'
          placeholder='Aradığınızı yazın...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={style.searchInput}
        />
      </div>
      <div onClick={logout} className={style.userProfile}>
        <h2>
          <span>{email}</span>
        </h2>
        <Image width={30} height={30} src={UserProfile} alt='logo' />
      </div>
    </header>
  );
};

export default Header;
