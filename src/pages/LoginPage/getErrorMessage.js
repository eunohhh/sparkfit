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
const handleChangePassword = (e) => {
  const { value } = e.target;
  setPassword(value);
  if (value) {
    validatePassword(value);
  } else if (!value) {
    setPwError('');
  }
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

const handleChangeEmail = (e) => {
  const { value } = e.target;
  setEmailError(value);
  if (value) {
    validateEmail(value);
  } else if (!value) {
    setEmailError('');
  }
};
