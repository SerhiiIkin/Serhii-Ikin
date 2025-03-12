import Button from '@components/Button';
import Loader from '@components/Loader';
import Textarea from '@components/Textarea';

import { useCommentForm } from '@hooks/useCommentForm';

import { classes } from '@utils/classes';

const CommentForm = ({ closeReplyForm } : { closeReplyForm?: () => void }) => {
  const {
    createCommentMutation,
    textarea,
    handleSubmit,
    textareaError,
    handleChange,
    idTextarea,
    placeholderTextarea,
  } = useCommentForm(closeReplyForm || (() => {}));

  return (
    <form onSubmit={handleSubmit} className="mx-auto grid max-w-xs gap-2">
      <label htmlFor={idTextarea} className="relative inline-block">
        <Textarea
          id={idTextarea}
          value={textarea}
          autoFocus
          onChange={handleChange}
          className={classes([
            'peer h-full w-full bg-secondaryGrey',
            textareaError
              ? 'outline-dashed outline-1 outline-secondaryRed'
              : '',
          ])}
        />
        <span
          className={classes([
            'absolute left-2 top-1/2 -translate-y-1/2 duration-700',
            'peer-focus:top-0 peer-focus:bg-secondaryGrey peer-focus:text-xs',
            textarea ? 'top-0 bg-secondaryGrey text-xs' : '',
          ])}
        >
          {placeholderTextarea}
        </span>
      </label>
      <Button
        type="submit"
        disabled={createCommentMutation.isPending}
        className="relative flex-shrink-0 disabled:bg-secondaryGrey disabled:text-primaryLigth disabled:outline disabled:outline-1 disabled:outline-primaryOrange"
      >
        Tilføj kommentar
        {createCommentMutation.isPending && (
          <Loader className="absolute -top-4 left-1/4" size="little" />
        )}
      </Button>
    </form>
  );
};

export default CommentForm;
