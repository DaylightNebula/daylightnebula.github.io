import {Container, Image} from "react-bootstrap";
import {colors} from "../helpers/Colors";
import {projectElementsInfo} from "./ProjectElementsInfo";
import BetterText from "../helpers/BetterText";
import {useEffect, useState} from "react";
import GradientText from "../helpers/GradientText";
import BetterButton from "../helpers/BetterButton";
import {BiLinkExternal} from "react-icons/bi";

function ProjectDescription(props) {
    // function to handle git hub link button
    const handleGithubLink = () => {
        window.open(props.project.url)
    };

    return (
        <Container style={{ margin: 0, width: '100%' }} >
            {/* description text */}
            <Container style={{ display: "flex", justifyContent: "center", padding: 20 }} >
                <BetterText color={colors.grays.offwhite} size={15} >{props.project.hover}</BetterText>
            </Container>

            <div style={{ height: 10 }} />

            {/* icons and link */}
            <Container style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 20
            }} >
                <Container style={{
                    // center
                    display: "flex",
                    flexDirection: "center",
                    justifyContent: "center",
                    alignItems: "center",

                    // background
                    background: colors.grays.darkgray,
                    padding: 15,
                    borderRadius: 10,

                    // internal shadow
                    boxShadow: `0 5px 2px rgba(0, 0, 0, 0.1)`
                }} >
                    {
                        props.project.icons.map(icon => <Image src={icon} style={{ height: 40, paddingRight: 5 }} />)
                    }
                </Container>

                <BetterButton
                    initColor={"#FFFFFF22"}
                    hoverColor={"#FFFFFF66"}
                    radius={100}
                    onClick={handleGithubLink}
                    boxShadow={`0 5px 2px rgba(0, 0, 0, 0.1)`}
                >
                    <Container style={{
                        padding: 10,

                        // display row and center
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center"
                    }} >
                        <BetterText cursor={"pointer"} color={colors.grays.offwhite} size={15} >GitHub</BetterText>
                        <div style={{ width: 10 }} />
                        <BiLinkExternal style={{ color: colors.grays.offwhite }} />
                    </Container>
                </BetterButton>
            </Container>
        </Container>
    );
}

function ProjectHoverable(props) {
    // track hover state
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
                flexDirection: aspectRatio > 1.2 ? "row" : "column"
            }}>
                <ProjectsSubElement element={projectElementsInfo[0]} />
                <ProjectsSubElement element={projectElementsInfo[1]} />
            </Container>


            <Container style={{
                // setup display for two elements
                display: "flex",
                flexDirection: aspectRatio > 1.2 ? "row" : "column"
            }}>
                <ProjectsSubElement element={projectElementsInfo[2]} />
                {/*<ProjectsSubElement element={projectElementsInfo[3]} />*/}
            </Container>
        </Container>
    );
}