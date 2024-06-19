import React, { useState } from 'react';
import { RiUser3Line } from 'react-icons/ri';
import { MdOutlineEmail } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useUserStore } from '@/zustand/auth.store';

const SignupPage = () => {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pwError, setPwError] = useState('');
  const signUp = useUserStore((state) => state.signUp);
  const navigate = useNavigate();

  const validatePassword = (pwd) => {
    const isValid = /^(?=.*[a-z])(?=.*\d)(?=.*[~!@#$%^&*()_+]).{8,}$/.test(pwd);
    if (!isValid) {
      setPwError('8자 이상의 소문자, 숫자, 특수문자를 사용해주세요.');
    } else {
      setPwError('');
    }
    return isValid;
  };

  const handleChangePassword = (e) => {
    const { value } = e.target;
    setPassword(value);
    if (value) {
      validatePassword(value);
    } else if (!value) {
      setPwError('');
    }
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      if (!email || !password || !nickname) {
        Swal.fire({
          icon: 'error',
          title: '모든 필드를 입력해주세요!',
          text: '회원가입이 완료되지 않았습니다'
        });
        return;
      }
      //값 보내기
      await signUp(email, password, nickname);

      setEmail('');
      setPassword('');
      setNickname('');

      Swal.fire({
        title: '회원가입 완료!',
        text: '로그인을 해주세요',
        icon: 'success'
      });
      navigate('/login'); // 회원가입 후 로그인 페이지로 이동
    } catch (error) {
      Swal.fire({
        icon: 'error',
        text: { error }
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-customBackground">
      <form
        onSubmit={handleSignUp}
        className="flex flex-col justify-center items-center my-0 mx-auto w-96 h-full gap-5 text-base"
      >
        <h2 className="text-4xl font-semibold mb-10">회원가입</h2>
        <div className="w-full items-center border bg-white rounded-full flex gap-3 p-2 px-6">
          <RiUser3Line className="text-3xl" />
          <input
            className="w-full h-15 border-none text-lg p-1.5 focus:outline-none"
            type="text"
            placeholder="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>

        <div className="w-full items-center border bg-white rounded-full flex gap-3 p-2 px-6">
          <MdOutlineEmail className="text-3xl" />
          <input
            className="w-full h-15 border-none text-lg p-1.5 focus:outline-none"
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="w-full items-center border bg-white rounded-full flex gap-3 p-2 px-6">
          <RiLockPasswordLine className="text-3xl" />
          <input
            className="w-full h-15 border-none text-lg p-1.5 focus:outline-none"
            type="password"
            placeholder="password"
            value={password}
            onChange={handleChangePassword}
          />
        </div>
        {pwError && <p className="text-gray-400 text-sm">{pwError}</p>}
        <button className="flex justify-center items-center w-full h-14 text-lg rounded-xl bg-customLoginButton text-white mt-4 p-1.5 cursor-pointer">
          회원가입
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
