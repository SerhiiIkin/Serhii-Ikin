import { useMutation } from '@tanstack/react-query';
import { type MouseEvent, useContext, useEffect, useState } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { ToastContext } from '@context/ToastContext';

import Button from '@components/Button';
import Loader from '@components/Loader';

import { setRoomId } from '@store/Slices/adminSlice';
import { removeUser } from '@store/Slices/usersSlice';
import type { RootState } from '@store/store';

import { useAppDispatch, useAppSelector } from '@hooks/redux';

import { deleteUserAxios } from '@utils/axios';

import type { userType } from '@modules/userType';

const SideBar = () => {
  const [isLoading, setIsLoading] = useState(true);
  const toast = useContext(ToastContext);

  const users: userType[] = useAppSelector(
    (state: RootState) => state.users.users
  );
  const removeUserMutation = useMutation({
    mutationKey: ['users'],
    mutationFn: (_id: string) => deleteUserAxios(_id),
    onSuccess: (data, variables) => {
      dispatch(removeUser(variables));
      toast.success(data.message);
    },
    onError: () => toast.error('Error deleting user'),
  });

  const dispatch = useAppDispatch();

  const setUserAndAdmin = (event: MouseEvent, user: userType) => {
    event.stopPropagation();
    dispatch(setRoomId(user.roomId));
  };

  useEffect(() => {
    if (users.length >= 0) {
      setIsLoading(false);
    }
  }, [users.length]);

  const removeUserById = (event: MouseEvent, _id: string) => {
    event.stopPropagation();
    event.preventDefault();
    removeUserMutation.mutate(_id);
  };

  return (
    <aside className="basis-1/3 sm:w-56 sm:basis-auto sm:overflow-y-auto">
      <div className="grid grid-cols-3 gap-2 p-2 sm:grid-cols-1">
        {isLoading && <Loader />}
        {users.length > 0 && !isLoading
          ? users.map((user: userType) => {
              const { messages, _id, username, roomId } = user;
              return (
                <Link
                  to={`/dashboard/chat/${roomId}`}
                  onClick={event => setUserAndAdmin(event, user)}
                  key={roomId}
                  className="group relative grid gap-1 rounded bg-primaryOrange p-1 sm:w-full sm:px-5 sm:py-4 lg:grid-cols-2 xl:hover:bg-primaryLigth xl:hover:text-primaryOrange xl:hover:duration-500"
                >
                  <Button
                    onClick={event => removeUserById(event, _id as string)}
                    className="xl:hover:text-primaryLigthBlue absolute right-1 top-1 z-10 bg-transparent p-0 text-primaryLigth xl:hover:bg-transparent group-hover:xl:text-primaryOrange"
                  >
                    <FaRegTrashAlt />
                  </Button>
                  {messages?.length > 0 &&
                  messages[messages?.length - 1]?.img ? (
                    <div className="mx-auto aspect-square w-8">
                      <img
                        className="aspect-square w-6 rounded-full"
                        src={messages[messages?.length - 1]?.img}
                        alt={messages[messages?.length - 1]?.imgAlt}
                      />
                    </div>
                  ) : (
                    <span className="mx-auto aspect-square max-w-8 justify-self-start rounded-full bg-gray-600 px-4 py-2">
                      {username[0]}
                    </span>
                  )}

                  <p>{username}</p>

                  <p className="truncate break-words text-left lg:col-span-2">
                    {messages?.length > 0 &&
                    messages[messages.length - 1]?.message
                      ? messages[messages.length - 1].message
                      : 'No message'}
                  </p>
                </Link>
              );
            })
          : 'No users'}
      </div>
    </aside>
  );
};

export default SideBar;
