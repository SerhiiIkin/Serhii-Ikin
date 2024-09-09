import { FaEye } from 'react-icons/fa';
import { IoCloseCircleSharp } from 'react-icons/io5';

import Button from '@components/Button';
import Input from '@components/Input';
import Loader from '@components/Loader';

import { classes } from '@utils/classes';

import { LoginFormText } from '@variables/LoginFormText';
import { loginName } from '@variables/loginName';

import type { AuthUserFormProps } from '@modules/AuthUserFormProps';

const AuthUserForm = ({
  isOpenForm,
  user,
  submitHandler,
  isLoading,
  OpenCloseForm,
  isPending,
  usernameInput,
  error,
  password,
  setPassword,
  type,
  setType,
  userNameHandler,
}: AuthUserFormProps) => {
  const { loginform, placeholderForm, submitForm, errorMessage } =
    LoginFormText();
  return (
    <>
      {isOpenForm && !user.username && (
        <form
          onSubmit={submitHandler}
          className={classes([
            'fixed bottom-5 right-4 z-20 flex flex-col rounded bg-white p-2 shadow-sm shadow-slate-500',
          ])}
        >
          {isLoading && (
            <Loader className="absolute inset-0 z-30 h-full w-full bg-primaryLigth [&_div]:absolute [&_div]:left-1/3 [&_div]:top-1/3" />
          )}

          <h2>{loginform}</h2>
          <Button
            onClick={OpenCloseForm}
            type="button"
            className="absolute right-2 top-2 bg-transparent p-0 text-primaryDarkBlue hover:text-red-400"
          >
            <IoCloseCircleSharp />
          </Button>
          <label className="relative pb-6">
            <Input
              autoFocus
              disabled={isPending}
              value={usernameInput}
              onChange={userNameHandler}
              className="p-2 focus-visible:outline-none disabled:cursor-not-allowed"
              type="text"
              placeholder={placeholderForm}
            />
            <span className="absolute bottom-1 left-0 text-sm text-secondaryRed">
              {error && errorMessage}
            </span>
          </label>
          {usernameInput === loginName && (
            <label className="relative" htmlFor="password">
              <Input
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="border-none p-2 outline-none focus-visible:outline-none"
                type={type ? 'password' : 'text'}
                placeholder="password"
                autoComplete="true"
              />
              <span
                onClick={() => setType(prev => !prev)}
                className="absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer"
              >
                <FaEye />
              </span>
            </label>
          )}

          <Button
            disabled={isPending}
            type="submit"
            className={classes([
              'relative rounded px-2 py-1 xl:hover:bg-primaryDarkBlue',
              'disabled:cursor-not-allowed disabled:bg-secondaryRed disabled:text-secondaryGrey disabled:hover:xl:bg-secondaryRed disabled:xl:hover:text-primaryLigth',
            ])}
          >
            {isPending && (
              <Loader size="little" className="absolute -top-5 right-16" />
            )}
            {submitForm}
          </Button>
        </form>
      )}
    </>
  );
};

export default AuthUserForm;
