import Multilanguage from '@utils/Multilanguage';

export const userChatText = () => {
  const hello = Multilanguage({ ukr: 'Привіт', eng: 'Hello', dk: 'Hej' });
  const welcome = Multilanguage({
    ukr: 'Ласкаво прошу до нашого чату.',
    eng: 'Welcome to our chat.',
    dk: 'Velkommen til vores chat.',
  });
  const chatTime = Multilanguage({
    ukr: 'Наш чат зберігається 24 години.',
    eng: 'Our chat is saved 24 hour .',
    dk: 'Vores chat er gemt 24 timer.',
  });
  const typingtext = Multilanguage({
    ukr: 'друкує',
    eng: 'prints',
    dk: 'udskrifter',
  });
  return {
    hello,
    welcome,
    chatTime,
    typingtext,
  };
};
