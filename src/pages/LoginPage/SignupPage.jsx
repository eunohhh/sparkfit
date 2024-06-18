import React, { useState } from 'react';
import { RiMapPinUserLine } from 'react-icons/ri';
import { MdOutlineEmail } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';

import { Link } from 'react-router-dom';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form className="flex flex-col justify-center items-center my-0 mx-auto w-96 h-full gap-6 text-base">
      <h2 className="text-4xl font-semibold mb-10">회원가입</h2>

      <div className="w-full items-center border border-none rounded-full flex gap-3 p-0 px-6">
        <MdOutlineEmail className="text-3xl" />
        <input
          className="w-full h-15 border-none text-lg p-1.5 focus:outline-none"
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
      <div className="w-full items-center border border-none rounded-full flex gap-3 p-0 px-6">
        <RiMapPinUserLine className="text-3xl" />
        <input
          className="w-full h-15 border-none text-lg p-1.5 focus:outline-none"
          type="text"
          placeholder="nickname"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <Link
        to="/login"
        className="flex justify-center items-center w-full h-14 text-lg rounded-xl bg-customLoginButton text-white mt-4 p-1.5 cursor-pointer"
      >
        회원가입
      </Link>
    </form>
  );
};

export default SignupPage;
