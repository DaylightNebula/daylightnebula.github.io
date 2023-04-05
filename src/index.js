import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css";
import IntroElement from "./elements/IntroElement";
import TechElement from "./elements/TechElement";
import ProjectsElement from "./elements/ProjectsElement";
import RepositoriesElement from "./elements/RepositoriesElement";
import Topbar from "./elements/Topbar";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <IntroElement id={"intro"} />
      <TechElement id={"tech"} />
      <ProjectsElement id={"projects"} />
      <RepositoriesElement id={"repo"} />
      <Topbar/>
  </React.StrictMode>
);
