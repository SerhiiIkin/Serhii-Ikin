import Multilanguage from '@utils/Multilanguage';

export const LanguagesSection = () => {
  const danish = Multilanguage({
    ukr: 'Данська, вільна',
    eng: 'Danish, fluent',
    dk: 'Danish, flydende',
  });
  const ukrainian = Multilanguage({
    ukr: 'Українська, рідна',
    eng: 'Ukrainian, native',
    dk: 'Ukrainsk, indfødt',
  });
  const english = Multilanguage({
    ukr: 'Англійська, середній',
    eng: 'English, intermediate',
    dk: 'Engelsk, mellem',
  });

  const data = [
    {
      flag: 'https://mysite-ikinserhii.s3.eu-north-1.amazonaws.com/flags/danmark.webp',
      text: danish,
    },
    {
      flag: 'https://mysite-ikinserhii.s3.eu-north-1.amazonaws.com/flags/ukraine.webp',
      text: ukrainian,
    },
    {
      flag: 'https://mysite-ikinserhii.s3.eu-north-1.amazonaws.com/flags/usa.webp',
      text: english,
    },
  ];

  return (
    <ul className="flex justify-between gap-4">
      {data.map((l, i) => (
        <li
          key={i}
          className="group grid place-items-center gap-2 rounded p-2 text-primaryDark shadow-lg shadow-primaryDarkBlue duration-500 xl:hover:bg-primaryOrange xl:hover:shadow-2xl xl:hover:shadow-primaryOrange xl:hover:duration-1000"
        >
          <img src={l.flag} alt="flag" />
          <span className="xl:group-hover:text-primaryLigth">{l.text}</span>
        </li>
      ))}
    </ul>
  );
};
