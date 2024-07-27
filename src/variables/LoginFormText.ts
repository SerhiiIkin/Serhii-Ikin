import Multilanguage from '@utils/Multilanguage';

export const LoginFormText = () => {
  const loginform = Multilanguage({
    ukr: 'Форма входу',
    eng: 'Login form',
    dk: 'Login formular',
  });
  const placeholderForm = Multilanguage({
    ukr: "Напишіть своє ім'я",
    eng: 'Write your name',
    dk: 'Skriv dit navn',
  });
  const submitForm = Multilanguage({
    ukr: 'Почати чат',
    eng: 'Start a chat',
    dk: 'Start en chat',
  });
  const errorMessage = Multilanguage({
    ukr: 'Недостатньо літер',
    eng: 'Not enough letters',
    dk: 'Ikke nok bogstaver',
  });
  return {
    loginform,
    placeholderForm,
    submitForm,
    errorMessage,
  };
};
