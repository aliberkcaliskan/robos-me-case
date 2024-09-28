'use client';
import React from 'react';

import style from './style.module.scss';
import classNames from 'classnames';

import { ButtonInterface } from './interface';
import { ButtonTypeEnum } from './enum';

import { gothamFont } from '../font';

export default function Button({
  type = ButtonTypeEnum.PRIMARY,
  buttonType = 'button',
  children,
  onClick,
  disabled,
  externalClass,
  ...props
}: ButtonInterface) {
  const buttonClass = classNames(gothamFont.className, style.button, {
    [style.primary]: type === ButtonTypeEnum.PRIMARY,
    [style.secondary]: type === ButtonTypeEnum.SECONDARY,
    [style.disabled]: disabled,
    [externalClass || '']: !!externalClass,
  });

  return (
    <button className={buttonClass} type={buttonType} onClick={onClick} disabled={disabled} {...props}>
      {children}
    </button>
  );
}
