export const getUserLoginErrorMessage = (error) => {
  console.log(error);

  if (error.includes('Invalid login credentials')) {
    return '잘못된 이메일과 비밀번호를 입력했습니다. 다시 입력해주세요.';
  } else {
    return '알 수 없는 에러입니다. 다시 시도해주세요.';
  }
};
