import { Link } from 'react-router-dom';
import MainLogo from '../../assets/MainLogo.png';

const HomePage = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-customBackground">
      <div className="flex flex-col justify-center items-center mx-auto gap-3 w-96">
        <img src={MainLogo} className="w-32 h-32 object-cover mb-8" />

        <Link
          to="/login"
          className="flex justify-center items-center w-full h-16 text-lg font-semibold rounded-xl bg-customLoginButton text-white mt-4 p-1.5 cursor-pointer"
        >
          로그인
        </Link>
        <Link
          to="/signup"
          className="flex justify-center items-center w-full h-16 text-lg font-semibold rounded-xl bg-customSignupButton text-black mt-4 p-1.5 cursor-pointer"
        >
          회원가입
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
