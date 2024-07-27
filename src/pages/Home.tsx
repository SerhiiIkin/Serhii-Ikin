import { ProjectContentValueHomePage } from '@variables/ProjectContentValueHomePage';

import { ProjectContext } from '@components/Context/ProjectContext';
import Projects from '@components/Projects';
import Title from '@components/Title';
import Welcome from '@components/Welcome';

const Home = () => {
  return (
    <>
      <Title
        className="invisible fixed left-0 top-0 -z-10 h-0 w-0"
        typeTitle="h1"
      >
        Serhii Ikin
      </Title>
      <Welcome />
      <ProjectContext.Provider value={ProjectContentValueHomePage()}>
        <Projects />
      </ProjectContext.Provider>
    </>
  );
};

export default Home;
