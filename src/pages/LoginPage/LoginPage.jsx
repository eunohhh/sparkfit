import React, { useState } from 'react';
import { MdOutlineEmail } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form className="flex flex-col justify-center items-center my-0 mx-auto w-96 h-full gap-6 text-base">
      <h2 className="text-4xl font-semibold mb-10">로그인</h2>
      <div className="w-full items-center border border-none rounded-full flex gap-3 p-0 px-6">
        <MdOutlineEmail className="text-3xl" />
        <input
          className="w-full h-15 border-none text-lg p-2 focus:outline-none"
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="w-full items-center border border-none rounded-full flex gap-3 p-0 px-6">
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
  );
};

export default LoginPage;
