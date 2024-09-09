import AuthButton from '@components/AuthButton';
import AuthUserForm from '@components/AuthUserForm';
import UserChat from '@components/UserChat';

import { useAuthSection } from '@hooks/useAuthSection';

import type { tokenType } from '@modules/tokenType';

const AuthSection = () => {
  const {
    isOpenForm,
    isOpenChat,
    user,
    token,
    OpenCloseForm,
    submitHandler,
    isLoading,
    isPending,
    usernameInput,
    error,
    password,
    setPassword,
    type,
    setType,
    isFullScreen,
    onBtnFullScreenClick,
    onRollUpBtnClick,
    userNameHandler,
  } = useAuthSection();

  const AuthButtonProps = {
    isOpenForm,
    isOpenChat,
    user,
    token: token ?? ({} as tokenType),
    OpenCloseForm,
  };

  const AuthUserFormProps = {
    isOpenForm,
    user,
    submitHandler,
    isLoading,
    OpenCloseForm,
    isPending,
    usernameInput,
    error,
    userNameHandler,
    password,
    setPassword,
    type,
    setType,
  };

  const UserChatProps = {
    onRollUpBtnClick,
    onBtnFullScreenClick,
    isFullScreen,
    isOpenChat,
  };

  return (
    <>
      <AuthButton {...AuthButtonProps} />
      <AuthUserForm {...AuthUserFormProps} />
      <UserChat {...UserChatProps} />
    </>
  );
};

export default AuthSection;
