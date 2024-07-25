import { useEffect, useState } from 'react';

import { skillsListGoup } from '@variables/skillsList';

import Image from '@components/Image';
import SectionLayout from '@components/Layouts/SectionLayout';
import Title from '@components/Title';

import Multilanguage from '@utils/Multilanguage';

const Welcome = () => {
  const minLength = 10;
  const intervalDuration = 100;
  const [lengthText, setLengthText] = useState(minLength);
  let index = lengthText;

  const textAboutMe = Multilanguage({
    ukr: 'Привіт! Я Сергій Ікін, відданий і пристрасний full-stack розробник з комплексним набором навичок, що охоплює як інтерфейс, так і сервер технології Маючи міцну основу в HTML, CSS/SCSS і JavaScript/TypeScript, я спеціалізуюся на створенні динамічних і адаптивних веб-додатки.',
    eng: "Hello! I'm Serhii Ikin, a dedicated and passionate full-stack developer with a comprehensive skill set spanning both front-end and back-en technologies. With a strong foundation in HTML, CSS/SCSS, and JavaScript/TypeScript, I specialize in building dynamic and responsiveweb applications.",
    dk: 'Hej! Jeg er Serhii Ikin, en dedikeret og passioneret fuld stack-udvikler med et omfattende færdighedssæt, der spænder over både front-end og back-en teknologier. Med et stærkt fundament i HTML, CSS/SCSS og JavaScript/TypeScript er jeg specialiseret i at bygge dynamiske og responsive webapplikationer.',
  });

  useEffect(() => {
    let timerId: NodeJS.Timeout | null = null;
    const startTimer = () => {
      timerId = setInterval(() => {
        setLengthText(prev => prev + 1);
        index++;
        if (index >= textAboutMe.length) {
          stopTimer();
        }
      }, intervalDuration);
    };
    const stopTimer = () => {
      if (timerId) clearInterval(timerId);
      timerId = null;
    };
    startTimer();
    return () => stopTimer();
  }, []);

  return (
    <SectionLayout
      className="bg-gradient-to-b from-primaryLigthBlue to-primaryLigthYellow"
      classNameContainer="grid md:grid-cols-3 h-full gap-2 md:gap-4 xl:gap-6  pt-6"
    >
      <Title
        typeTitle="h3"
        className={[
          'isolate pt-10 text-left backdrop-blur-2xl md:col-span-3 md:row-start-1 xl:col-span-2',
          'before:absolute before:-left-0 before:-top-4 before:-z-10 before:font-serif before:text-9xl before:font-bold before:text-primaryLigth before:content-[open-quote]',
        ].join(' ')}
      >
        {textAboutMe.length > lengthText ? (
          <> {textAboutMe.substring(0, lengthText)} </>
        ) : (
          <> {textAboutMe}</>
        )}
      </Title>
      <Image
        srcSM="profilePic/profilePic-sm.webp"
        srcMD="profilePic/profilePic-md.webp"
        srcXL="profilePic/profilePic.webp"
        classNamePicture="relative after:content-[''] after:absolute after:inset-0 after:backdrop-grayscale hover:after:backdrop-grayscale-0 focus-within:after:backdrop-grayscale-0 after:duration-1000"
        classNameImg="rounded-xl shadow-2xl shadow-primaryLigthYellow "
        classNameFigure="flex justify-center md:col-span-3 md:row-start-2 md:col-start-1 xl:col-start-3 xl:row-start-1 "
      />
      {skillsListGoup.map((skill, i) => (
        <ul key={i} className="md:row-start-3">
          <Title typeTitle="h6" className="text-primaryLigth">
            {skill.title}:
          </Title>
          {skill.list.map((item, index) => (
            <li
              key={index}
              className="list-disc pl-4 text-primaryDarkBlue marker:text-primaryLigthBlue"
            >
              <b>{item.b}</b> {item.li.join(', ')}
            </li>
          ))}
        </ul>
      ))}
    </SectionLayout>
  );
};

export default Welcome;
