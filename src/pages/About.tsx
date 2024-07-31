import SectionLayout from '@components/Layouts/SectionLayout';
import Title from '@components/Title';

import Multilanguage from '@utils/Multilanguage';

const About = () => {
  const resumeTitle = Multilanguage({
    ukr: 'Резюме',
    eng: 'Resume',
    dk: 'Resume',
  });
  const resumeText = Multilanguage({
    ukr: `Я навчаюсь у Viborg Media College в Данії, спеціалізуючись на веб-розробці. Маю ґрунтовні знання з Figma та Adobe XD для створення привабливих та функціональних дизайнів сайтів. Також опанував базові навички роботи з WordPress для розробки веб-сайтів. Постійно вдосконалюю свої знання з JavaScript і React.

Для керування кодом використовую GitHub, що дозволяє ефективно співпрацювати над проектами. Самостійно вивчив такі технології, як TypeScript, Next.js, Redux/Redux-toolkit, Node.js та Tailwind CSS. Також маю досвід роботи з Docker, C#, Angular, Vue, Bootstrap, Blazor, Scss і jQuery.

Моя пристрасть до веб-розробки підкріплюється постійним прагненням до самовдосконалення та вивчення нових технологій, що робить мене цінним членом будь-якої команди.`,
    eng: `I am studying at Viborg Media College in Denmark, specializing in web development. I have solid knowledge of Figma and Adobe XD for creating attractive and functional website designs. I have also mastered basic skills in WordPress for developing websites. I am continuously improving my knowledge of JavaScript and React.

For version control, I use GitHub, which allows for effective collaboration on projects. I have self-taught technologies such as TypeScript, Next.js, Redux/Redux-toolkit, Node.js, and Tailwind CSS. I also have experience working with Docker, C#, Angular, Vue, Bootstrap, Blazor, Scss, and jQuery.

My passion for web development is driven by a constant desire for self-improvement and learning new technologies, making me a valuable member of any team.`,
    dk: `Jeg studerer på Viborg Media College i Danmark med speciale i webudvikling. Jeg har solid viden om Figma og Adobe XD til at skabe attraktive og funktionelle webdesigns. Jeg har også mestret grundlæggende færdigheder i WordPress til udvikling af websites. Jeg forbedrer løbende mine færdigheder i JavaScript og React.

Til versionskontrol bruger jeg GitHub, som muliggør effektivt samarbejde om projekter. Jeg har selvlært teknologier som TypeScript, Next.js, Redux/Redux-toolkit, Node.js og Tailwind CSS. Jeg har også erfaring med Docker, C#, Angular, Vue, Bootstrap, Blazor, Scss og jQuery.

Min passion for webudvikling er drevet af et konstant ønske om selvforbedring og læring af nye teknologier, hvilket gør mig til et værdifuldt medlem af ethvert team.`,
  });
  const languageTitle = Multilanguage({
    ukr: 'Мови',
    eng: 'Languages',
    dk: 'Sprog',
  });
  const languagesList = [
    Multilanguage({
      ukr: 'Українська, рідна',
      eng: 'Ukrainian, native',
      dk: 'Ukrainsk, indfødt',
    }),
    Multilanguage({
      ukr: 'Данська, вільна',
      eng: 'Danish, fluent',
      dk: 'Danish, flydende',
    }),
    Multilanguage({
      ukr: 'Англійська, середній',
      eng: 'English, intermediate',
      dk: 'Engelsk, mellem',
    }),
  ];
  const workTitle = Multilanguage({
    ukr: 'Де я працював?',
    eng: 'Where did I work?',
    dk: 'Hvor arbejdede jeg?',
  });

  const worksList = [
    Multilanguage({
      ukr: '2010 - 2017, Кальянщик, працював в різних ресторанах в Києві в Україні. Це було приблизно 5 років.',
      eng: '2010 - 2017, Hookah smoker, worked in various restaurants in Kyiv, Ukraine. It was about 5 years.',
      dk: '2010 - 2017, Vandpiberyger, arbejdede på forskellige restauranter i Kiev, Ukraine. Det var omkring 5 år.',
    }),
    Multilanguage({
      ukr: '2015-2016, Таксист, працював в Києві в Україні близько півроку.',
      eng: '2015-2016, Taxi driver, worked in Kyiv, Ukraine for about six months.',
      dk: '2015-2016, Taxachauffør, arbejdede i Kiev, Ukraine i omkring seks måneder.',
    }),
    Multilanguage({
      ukr: '2017 - 2022, Працівник свинячої ферми, працював в Данії 6 років на 3 різних фермах.',
      eng: '2017 - 2022, Pig farm worker, worked in Denmark for 6 years on 3 different farms.',
      dk: '2017 - 2022, Medarbejder på grisegården, arbejdet i Danmark i 6 år på 3 forskellige gårde.',
    }),
    Multilanguage({
      ukr: '2022-2023, Співробітник Burger King, працював у Данії близько 1 року в Бранде та Віборзі.',
      eng: '2022-2023, Employee at Burger King, worked in Denmark for about 1 year in Brande and Viborg.',
      dk: '2022-2023, Medarbejder hos Burger King , arbejdet i Danmark omkring 1 år i Brande og  Viborg.',
    }),
    Multilanguage({
      ukr: "2023-2024, Кур'єр доставки їжі в Just Eat, працюю вже 6 місяців і продовжую.",
      eng: "2023-2024, Food delivery courier at Just Eat, I've been working for 6 months and counting.",
      dk: '2023-2024, Madleveringsbud hos Just Eat, jeg har arbejdet i 6 måneder og forsætter.',
    }),
    Multilanguage({
      ukr: '2024-2024, Студент в Viborg Media College, навчаюсь на веб розробника.',
      eng: '2024-2024, A student at Viborg Media College, studying to become a web developer.',
      dk: '2024-2024, Studerende på Viborg Mediehøjskole, læser til webudvikler.',
    }),
  ];

  return (
    <>
      <SectionLayout>
        <Title typeTitle="h2"> {resumeTitle} </Title>
        <p className="text-secondaryDarkGrey"> {resumeText} </p>
      </SectionLayout>
      <SectionLayout>
        <Title typeTitle="h2" className="text-primaryDarkBlue">
          {languageTitle}
        </Title>
        <ul className="list-decimal pl-4">
          {languagesList.map(l => (
            <li key={l} className="text-primaryLigth">
              {l}
            </li>
          ))}
        </ul>
      </SectionLayout>
      <SectionLayout>
        <Title typeTitle="h2" className="text-primaryOrange">
          {workTitle}
        </Title>
        <ul className="list-decimal pl-4">
          {worksList.map(w => (
            <li key={w} className="text-secondaryDarkGrey">
              {w}
            </li>
          ))}
        </ul>
      </SectionLayout>
    </>
  );
};

export default About;
