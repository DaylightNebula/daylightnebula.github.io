import {Button, Container, FormText, Image} from "react-bootstrap";
import IntroElement from "../../elements/IntroElement";
import ProjectsElement from "../../elements/ProjectsElement";
import TechElement from "../../elements/TechElement";
import React from "react";
import RepositoriesElement from "../../elements/RepositoriesElement";
import Topbar from "../../elements/Topbar";


function MainPage() {
    return (
        <Container>
            <IntroElement/>
            <TechElement/>
            <ProjectsElement/>
            <RepositoriesElement/>
            <Topbar/>
        </Container>
    );
}

export default MainPage;