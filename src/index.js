import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css";
import IntroElement from "./elements/IntroElement";
import TechElement from "./elements/TechElement";
import ProjectsElement from "./elements/ProjectsElement";
import RepositoriesElement from "./elements/RepositoriesElement";
import Topbar from "./elements/Topbar";
import fetchGithubData from "./github/GithubInfo";

fetchGithubData();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <IntroElement id={"intro"} />
      <ProjectsElement id={"projects"} />
      <TechElement id={"tech"} />
      {/*<RepositoriesElement id={"repo"} />*/}
      <Topbar/>
  </React.StrictMode>
);
