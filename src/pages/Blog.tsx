import { lazy } from 'react';

import { blogImgMe } from '@variables/blogImgMe';

import SectionLayout from '@components/Layouts/SectionLayout';
import Title from '@components/Title';

import Multilanguage from '@utils/Multilanguage';
import { classes } from '@utils/classes';

const Image = lazy(() => import('@components/Image'));

const Blog = () => {
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

  const languages = [
    {
      flag: 'https://mysite-ikinserhii.s3.eu-north-1.amazonaws.com/flags/danmark.webp',
      text: Multilanguage({
        ukr: 'Данська, вільна',
        eng: 'Danish, fluent',
        dk: 'Danish, flydende',
      }),
    },
    {
      flag: 'https://mysite-ikinserhii.s3.eu-north-1.amazonaws.com/flags/ukraine.webp',
      text: Multilanguage({
        ukr: 'Українська, рідна',
        eng: 'Ukrainian, native',
        dk: 'Ukrainsk, indfødt',
      }),
    },
    {
      flag: 'https://mysite-ikinserhii.s3.eu-north-1.amazonaws.com/flags/usa.webp',
      text: Multilanguage({
        ukr: 'Англійська, середній',
        eng: 'English, intermediate',
        dk: 'Engelsk, mellem',
      }),
    },
  ];
  const workTitle = Multilanguage({
    ukr: 'Де я працював?',
    eng: 'Where did I work?',
    dk: 'Hvor arbejdede jeg?',
  });

  const worksList = [
    {
      date: '2010 - 2017',
      text: Multilanguage({
        ukr: ' Кальянщик, працював в різних ресторанах в Києві в Україні. Це було приблизно 5 років.',
        eng: ' Hookah smoker, worked in various restaurants in Kyiv, Ukraine. It was about 5 years.',
        dk: ' Vandpiberyger, arbejdede på forskellige restauranter i Kiev, Ukraine. Det var omkring 5 år.',
      }),
    },
    {
      date: '2015 - 2016',
      text: Multilanguage({
        ukr: ' Таксист, працював в Києві в Україні близько півроку.',
        eng: ' Taxi driver, worked in Kyiv, Ukraine for about six months.',
        dk: ' Taxachauffør, arbejdede i Kyiv, Ukraine i omkring seks måneder.',
      }),
    },
    {
      date: '2017 - 2022',
      text: Multilanguage({
        ukr: ' Працівник свинячої ферми, працював в Данії 6 років на 3 різних фермах.',
        eng: ' Pig farm worker, worked in Denmark for 6 years on 3 different farms.',
        dk: ' Medarbejder på grisegården, arbejdede i Danmark i 6 år på 3 forskellige löde.',
      }),
    },
    {
      date: '2022 - 2023',
      text: Multilanguage({
        ukr: ' Працівник Бургер Кінг, працював у Данії близько 1 року в Бранде та Віборзі.',
        eng: ' Employee at Burger King, worked in Denmark for about 1 year in Brande and Viborg.',
        dk: ' Medarbejder hos Burger King , arbejdede i Danmark omkring 1 år i Brande og  Viborg.',
      }),
    },
    {
      date: '2023 - 2024',
      text: Multilanguage({
        ukr: "Кур'єр доставки їжі в Just Eat, працюю вже 6 місяців і продовжую.",
        eng: "Food delivery courier at Just Eat, I've been working for 6 months and counting.",
        dk: 'Madleveringsbud hos Just Eat, jeg har arbejdet i 6 måneder og forsætter.',
      }),
    },
    {
      date: '2024 - 2024',
      text: Multilanguage({
        ukr: 'Студент в Viborg Media College, навчаюсь на веб розробника.',
        eng: 'A student at Viborg Media College, studying to become a web developer.',
        dk: 'Studerende på Viborg Mediehøjskole, læser til webudvikler.',
      }),
    },
  ];

  const hobbyTitle = Multilanguage({
    ukr: 'Хоббі',
    eng: 'Hobby',
    dk: 'Hobby',
  });

  const hobbyText = Multilanguage({
    ukr: 'Я хочу розповісти про себе, як людину, якій подобається життя і насолоджується ним. Перш за все я хочу сказати про настільний тенніс. Я тренуюсь, їзджу на змагання, а також граю командні ігри. Це дуже весело, емоційно і дозволяє забувати про все і насолоджуватися життям. Це ж стосується і спортзалу, в який я також находжу час, щоб сходити і підтримувати себе в гарній фізичній формі.',
    eng: 'I want to tell about myself as a person who likes life and enjoys it. First of all, I want to say about table tennis. I train, go to competitions, and also play team games. It is very fun, emotional and allows you to forget about everything and enjoy life. The same applies to the gym, to which I also find time to go and keep myself in good physical shape.',
    dk: 'Jeg vil fortælle om mig selv som en person, der kan lide livet og nyder det. Først og fremmest vil jeg sige om bordtennis. Jeg træner, kører til stævner og spiller også holdkampe. Det er meget sjovt, følelsesladet og giver dig mulighed for at glemme alt og nyde livet. Det samme gælder fitnesscentret, hvor jeg også finder tid til at gå og holde mig i god fysisk form.',
  });

  return (
    <>
      <SectionLayout classNameContainer="md:grid md:grid-cols-2 gap-2 md:gap-4 xl:gap-6">
        <Image
          srcSM={blogImgMe.sm}
          srcMD={blogImgMe.md}
          srcXL={blogImgMe.xl}
          classNameImg="rounded-xl"
          classNameFigure="md:row-span-2"
        />
        <Title typeTitle="h2"> {resumeTitle} </Title>
        <p className="text-primaryDark"> {resumeText} </p>
      </SectionLayout>
      <SectionLayout classNameContainer="">
        <Title typeTitle="h3"> {hobbyTitle} </Title>
        <p> {hobbyText} </p>
      </SectionLayout>
      <SectionLayout>
        <Title typeTitle="h2" className="text-primaryDarkBlue xl:pb-8">
          {languageTitle}
        </Title>
        <ul className="flex justify-between gap-4">
          {languages.map((l, i) => (
            <li
              key={i}
              className="group grid place-items-center gap-2 rounded p-2 text-primaryDark shadow-lg shadow-primaryDarkBlue duration-500 xl:hover:bg-primaryOrange xl:hover:shadow-2xl xl:hover:shadow-primaryOrange xl:hover:duration-1000"
            >
              <img src={l.flag} alt="flag" />
              <span className="xl:group-hover:text-primaryLigth">{l.text}</span>
            </li>
          ))}
        </ul>
      </SectionLayout>
      <SectionLayout>
        <Title typeTitle="h2" className="pb-10">
          {workTitle}
        </Title>
        <ul
          className={classes([
            'relative grid gap-x-4 gap-y-10 py-4 pl-4 md:gap-y-16 xl:gap-y-20',
            'before:absolute before:left-[calc(50%+10px)] before:top-0 before:h-full before:w-4 before:-translate-x-1/2 before:rounded before:bg-primaryDark before:content-[""]',
          ])}
        >
          {worksList.map(work => (
            <li
              key={work.date}
              data-date={work.date}
              className={classes([
                'relative w-[calc(50%-30px)] break-words border-b-2 border-dashed border-primaryDarkBlue pb-2 text-primaryDark',
                'even:ml-auto [&_span]:odd:-right-[64px] [&_span]:even:-left-[59px]',
                '[&_p]:odd:pr-2 [&_p]:even:pl-3 [&_p]:odd:md:pr-4 [&_p]:even:md:pl-5 [&_p]:odd:xl:pr-6 [&_p]:even:xl:pl-6',
              ])}
            >
              <span className="absolute top-1/2 max-w-min -translate-y-1/2 rounded-full bg-primaryDarkBlue p-4 text-center text-sm text-primaryLigth">
                {work.date}
              </span>
              <p>{work.text}</p>
            </li>
          ))}
        </ul>
      </SectionLayout>
    </>
  );
};

export default Blog;
