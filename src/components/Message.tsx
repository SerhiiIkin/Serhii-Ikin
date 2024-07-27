import type { messageType } from '@modules/messageType';

const Message = ({ msg }: { msg: messageType }) => {
  const { username, time, message, imgAlt, img, dato } = msg;
  return (
    <div className="flex gap-4 pb-4 pr-1">
      <div>
        <div className="sticky top-0 flex flex-col items-center">
          <img
            className="mx-auto aspect-square max-w-5 rounded-full"
            src={img}
            alt={imgAlt}
          />
          {username}
        </div>
      </div>
      <span className="break-all text-sm">{message}</span>

      <span className="ml-auto text-sm">
        {dato} <p> {time} </p>
      </span>
    </div>
  );
};

export default Message;
