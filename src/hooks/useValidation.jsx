import { useState } from 'react';

export const useValidation = () => {
  const [pwError, setPwError] = useState('');
  const [emailError, setEmailError] = useState('');

  const validatePassword = (pwd) => {
    const isValid = /^(?=.*[a-z])(?=.*\d)(?=.*[~!@#$%^&*()_+]).{8,}$/.test(pwd);
    if (!isValid) {
      setPwError('8자 이상의 소문자, 숫자, 특수문자를 사용해주세요.');
    } else {
      setPwError('');
    }
    return isValid;
  };

  const validateEmail = (email) => {
    const isValid = /^([0-9a-zA-Z_.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z]+){1,2}$/.test(email);
    if (!isValid) {
      setEmailError('이메일 형식을 맞춰 작성해주세요.');
    } else {
      setEmailError('');
    }
    return isValid;
  };

  return {
    pwError,
    setPwError,
    emailError,
    setEmailError,
    validatePassword,
    validateEmail
  };
};
