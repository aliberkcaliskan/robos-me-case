'use client';

import classNames from 'classnames';
import React from 'react';
import { Controller } from 'react-hook-form';
import { TextareaComponentProps } from './interface';
import style from './style.module.scss';

const TextareaComponent: React.FC<TextareaComponentProps> = ({
  name,
  control,
  placeholder,
  label,
  error,
  externalClass,
  maxLength = 1000,
  onlyAlhabetic = false,
  onlyNumeric = false,
  ...props
}: TextareaComponentProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (onlyNumeric) {
      // Sadece sayı girilebilir hale getiriyor
      const numericValue = value.replace(/[^0-9]/g, '');
      e.target.value = numericValue;
    } else if (onlyAlhabetic) {
      // Sadece harf girilebilir hale getiriyor. Emoji, sayı ve noktalama işaretlerini engeller.
      const alphanumericValue = value.replace(/[^A-Za-zÇçĞğİıÖöŞşÜü\s]/g, '');
      e.target.value = alphanumericValue;
    } else {
      e.target.value = value;
    }
  };

  return (
    <div className={classNames(style.textarea_wrapper, externalClass)}>
      <span className={classNames(style.label_textarea, { [style.textarea_has_error]: error?.type })}>{label}</span>
      <div className={style.textarea_container}>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <textarea
              className={classNames(style.textarea, { [style.textarea_has_error]: error?.type })}
              {...field}
              value={field.value ?? ''}
              onChange={(e) => field.onChange(e.target.value)}
              placeholder={placeholder}
              maxLength={maxLength}
              onInput={handleInputChange}
              {...props}
            />
          )}
        />
      </div>
      {error?.message && (
        <div className={style.error_message}>
          <span>{error.message === 'Required' ? 'zorunlu alan' : error.message}</span>
        </div>
      )}
    </div>
  );
};

export default TextareaComponent;
