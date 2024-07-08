import { ProjectContext } from '@components/Layouts/ProjectContext';
import Projects from '@components/Projects';
import Title from '@components/Title';
import Welcome from '@components/Welcome';

const Home = () => {
  const ProjectContentValue = {
    isAdmin: false,
    isDescription: true,
    classNameProject: {
      content: [
        'grid-cols-1',
        'md:grid-cols-2',
        '[&_img]:even:col-start-2 [&_h3]:even:col-start-1',
      ].join(' '),
      img: 'md:col-start-1 md:row-span-3 md:row-start-1 rounded-xl',
      title: 'md:col-start-2',
      link: 'self-center',
    },
    classNameProjects: {
      section: 'bg-gradient-to-b to-primaryGreen from-primaryLigthYellow',
      container: 'grid-cols-1',
    },
  };
  return (
    <>
      <Title className="invisible h-0 w-0" typeTitle="h1">
        Serhii Ikin
      </Title>
      <Welcome />
      <ProjectContext.Provider value={ProjectContentValue}>
        <Projects />
      </ProjectContext.Provider>
    </>
  );
};

export default Home;
