import {Container, FormText} from "react-bootstrap";
import {colors} from "../helpers/Colors";
import {projectElementsInfo} from "./ProjectElementsInfo";
import BetterText from "../helpers/BetterText";
import {useEffect, useState} from "react";
import GradientText from "../helpers/GradientText";

function ProjectsSubElement(props) {
    return (
        <Container style={{
            // dimensions
            width: '100%',
            maxWidth: 600,
            padding: 10,
            margin: 20,

            // setup display
            display: "flex",
            flexDirection: "column",

            // border
            borderColor: colors.grays.campfire,
            borderRadius: 20,
            borderStyle: "solid",
        }}>
            <GradientText gradient={`linear-gradient(to right, ${colors.primaries.green}, ${colors.primaries.purple})`}>{props.element.name}</GradientText>
            <div style={{ height: 10 }} />
            <BetterText>{props.element.description}</BetterText>
        </Container>
    );
}

export default function ProjectsElement() {
    // setup up an affect that updates the aspect ratio for sizing
    const [aspectRatio, setAspectRatio] = useState(window.innerWidth / window.innerHeight)
    useEffect(() => {
        function handleResize() {
            setAspectRatio(window.innerWidth / window.innerHeight)
        }
        window.addEventListener('resize', handleResize)
    })

    return (
        <Container style={{
            // set base style
            minHeight: "100vh",
            background: colors.grays.offwhite,

            // setup cenetered display in column
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column"
        }} >
            <Container style={{
                // setup display for two elements
                display: "flex",
                flexDirection: aspectRatio > 1.0 ? "row" : "column"
            }}>
                <ProjectsSubElement element={projectElementsInfo[0]} />
                <ProjectsSubElement element={projectElementsInfo[1]} />
            </Container>


            <Container style={{
                // setup display for two elements
                display: "flex",
                flexDirection: aspectRatio > 1.0 ? "row" : "column"
            }}>
                <ProjectsSubElement element={projectElementsInfo[2]} />
                <ProjectsSubElement element={projectElementsInfo[3]} />
            </Container>
        </Container>
    );
}