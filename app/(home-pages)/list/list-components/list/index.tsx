'use client';
import React from 'react';
import { ListProps } from './interface';
import style from './style.module.scss';

const List: React.FC<ListProps> = ({ data, onItemClick }) => {
  return (
    <ul className={style.list}>
      {data.map((item) => (
        <li key={item.id} onClick={() => onItemClick(item.id)} className={style.item}>
          <h3>{item.title}</h3>
          <p>{item.body}</p>
        </li>
      ))}
    </ul>
  );
};

export default List;
