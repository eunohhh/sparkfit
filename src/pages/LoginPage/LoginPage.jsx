import { useUserStore } from '@/zustand/auth.store';
import React, { useState } from 'react';
import { MdOutlineEmail } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const signIn = useUserStore((state) => state.signIn);

  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      if (!email || !password) {
        Swal.fire({
          icon: 'error',
          title: '모든 필드를 입력해주세요!',
          text: '로그인 할 수 없습니다'
        });
        return;
      }
      await signIn(email, password);

      setPassword('');
      setEmail('');
      Swal.fire({
        title: '로그인 완료!',
        icon: 'success'
      });
      navigate('/');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: '로그인 실패',
        text: `오류가 발생했습니다: ${error.message}`
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-customBackground">
      <form
        onSubmit={handleSignIn}
        className="flex flex-col justify-center items-center my-0 mx-auto w-96 h-full gap-5 text-base"
      >
        <h2 className="text-4xl font-semibold mb-10">로그인</h2>
        <div className="w-full items-center border bg-white rounded-full flex gap-3 p-2 px-6">
          <MdOutlineEmail className="text-3xl" />
          <input
            className="w-full h-15 border-none text-lg p-2 focus:outline-none"
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
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="w-full h-14 text-lg rounded-xl bg-customLoginButton text-white mt-4 p-1.5 cursor-pointer">
          로그인하기
        </button>
        <div className="flex justify-evenly w-full">
          <p className="text-slate-400">* 아직 회원이 아니신가요?</p>
          <Link to="/signup">회원가입</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
