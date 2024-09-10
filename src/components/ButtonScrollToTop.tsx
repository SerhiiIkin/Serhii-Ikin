import { useEffect, useState } from 'react';
import { IoIosArrowUp } from 'react-icons/io';

import Button from '@components/Button';

import { classes } from '@utils/classes';

const ButtonScrollToTop = () => {
  const [isScrollBtn, setIsScrollBtn] = useState(false);
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setIsScrollBtn(true);
    } else {
      setIsScrollBtn(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <Button
      className={classes([
        'fixed bottom-28 right-2 translate-x-0 duration-500',
        !isScrollBtn ? 'right-0 translate-x-full' : '',
      ])}
      type="button"
      onClick={scrollToTop}
    >
      <IoIosArrowUp />
    </Button>
  );
};

export default ButtonScrollToTop;
