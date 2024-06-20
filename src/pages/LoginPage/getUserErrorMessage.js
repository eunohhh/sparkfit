export const getUserErrorMessage = (error) => {
  const errorMessage = error.message;
  if (errorMessage.includes('User already registered')) {
    return '중복된 이메일입니다.';
  } else if (errorMessage.includes('duplicate key value violates unique constraint "unique_nickname"')) {
    return '중복된 닉네임입니다.';
  } else if (errorMessage.includes('Unable to validate email address: invalid format')) {
    return '이메일 형식에 맞게 제출해주세요.';
  } else if (errorMessage.includes('Anonymous sign-ins are disabled')) {
    return '입력창에 내용을 모두 입력해주세요.';
  } else if (errorMessage.includes('Password should be at least 6 characters.')) {
    return '비밀번호는 최소 8글자 이상 입력해주세요.';
  } else {
    return '알 수 없는 에러입니다. 다시 시도해주세요.';
  }
};
