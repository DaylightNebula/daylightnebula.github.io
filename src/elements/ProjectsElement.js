import {Container} from "react-bootstrap";
import {colors} from "../helpers/Colors";
import {projectElementsInfo} from "./ProjectElementsInfo";
import BetterText from "../helpers/BetterText";
import {useEffect, useState} from "react";
import GradientText from "../helpers/GradientText";

function ProjectDescription(props) {
    console.log(`Descrition: ${props.project.description}`)
    return (
        <Container style={{ margin: 10 }} >
            <BetterText color={colors.grays.offwhite} size={15} >{props.project.hover}</BetterText>
        </Container>
    );
}

function ProjectHoverable(props) {
    const [isHovering, setIsHovering] = useState();
    const handleMouseOver = () => {
        setIsHovering(true)
    };
    const handleMouseOut = () => {
        setIsHovering(false)
    };

    return (
        <Container
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            style={{
                // style
                background: isHovering ? `linear-gradient(to right, ${colors.primaries.green}, ${colors.primaries.purple})` : "transparent",
                padding: 5,
                paddingLeft: 15,

                // border
                borderRadius: 25,

                // center content
                display: "flex",
                flexDirection:"column",
                alignItems: "center"
            }}
        >
            {/* title */}
            <BetterText
                size={20}
                color={isHovering ? colors.grays.offwhite : colors.primaries.purple}
                padding={5}
            >
                {props.project.name}
            </BetterText>

            {/* if user is hovering, draw description, tech, and link button */}
            {
                isHovering ? <ProjectDescription project={props.project} /> : null
            }
        </Container>
    );
}

function ProjectsSubElement(props) {
    return (
        <Container style={{
            // dimensions
            width: '100%',
            maxWidth: 600,
            padding: 15,
            margin: 20,

            // setup display
            display: "flex",
            flexDirection: "column",

            // border
            borderColor: colors.grays.campfire,
            borderRadius: 20,
            borderStyle: "solid",

            // extra effects
            boxShadow: `0 5px 2px rgba(0, 0, 0, 0.1)`
        }}>
            {/* fancy title */}
            <Container style={{ display: "flex", justifyContent: "center", alignItems: "center" }} >
                <GradientText
                    gradient={`linear-gradient(to right, ${colors.primaries.green}, ${colors.primaries.purple})`}
                >{props.element.name}</GradientText>
            </Container>
            <div style={{ height: 10 }} />

            {/* project description */}
            <BetterText>{props.element.description}</BetterText>
            <div style={{ height: 10 }}/>

            {/* add projects list */}
            {props.element.projects.map(project => <ProjectHoverable project={project} />)}
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