'use client';

import classNames from 'classnames';
import React from 'react';
import { Controller } from 'react-hook-form';
import { InputComponentProps } from './interface';
import style from './style.module.scss';

const InputComponent: React.FC<InputComponentProps> = ({
  name,
  control,
  placeholder,
  label,
  type = 'text',
  error,
  step,
  externalClass,
  maxLength = 1000,
  onlyAlhabetic = false,
  onlyNumeric = false,
  ...props
}: InputComponentProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (onlyNumeric) {
      // sadece sayı girilebilir hale getiriyor
      const numericValue = value.replace(/[^0-9]/g, '');
      e.target.value = numericValue;
    } else if (onlyAlhabetic) {
      // sadece harf girilebilir hale getiriyor. emoji-sayı-noktalama hepsini engeller.
      const alphanumericValue = value.replace(/[^A-Za-zÇçĞğİıÖöŞşÜü\s]/g, '');
      e.target.value = alphanumericValue;
    } else {
      e.target.value = value;
    }
  };
  return (
    <div className={classNames(style.input_wrapper, externalClass)}>
      <span className={classNames(style.label_input, { [style.input_has_error]: error?.type })}>{label}</span>
      <div className={style.input_container}>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <input
              type={type}
              className={classNames(style.input, { [style.input_has_error]: error?.type })}
              {...field}
              value={field.value ?? ''}
              onChange={(e) => field.onChange(e.target.value)}
              placeholder={placeholder}
              maxLength={maxLength}
              step={type === 'number' ? (step ? step : 'any') : undefined}
              onInput={handleInputChange}
              {...props}
            />
          )}
        />
      </div>
      {error?.message && (
        <div className={style.error_message}>
          <span>{error.message === 'Required' ? 'Zorunlu alan' : error.message}</span>
        </div>
      )}
    </div>
  );
};

export default InputComponent;
