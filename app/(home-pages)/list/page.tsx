'use client';

import { useEffect, useState } from 'react';
import useUserStore from '@/stores/slices/user';
import usePostStore from '@/stores/slices/list';
import style from './style.module.scss';
import Header from './list-components/header';
import List from './list-components/list';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';

const ListPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { email } = useUserStore();
  const { posts, loadPosts, isLoading, errorMessage } = usePostStore();
  const router = useRouter();
  const filteredPosts = posts.filter((post) => post.title.toLowerCase().includes(searchTerm.toLowerCase()));

  useEffect(() => {
    loadPosts();
  }, []);

  const handlePostClick = (id: number) => {
    router.push(`${ROUTES.DETAIL}/${id}`);
  };

  return (
    <div className={style.listContainer}>
      <Header email={email} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {isLoading && <div>Yükleniyor...</div>}
      {errorMessage && <p>{errorMessage}</p>}
      {!isLoading && !errorMessage && <List data={filteredPosts} onItemClick={handlePostClick} />}
    </div>
  );
};

export default ListPage;
