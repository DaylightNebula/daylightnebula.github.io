import {Button, Col, Container, Image, Row} from "react-bootstrap";
import {colors} from "../helpers/Colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faDiscord, faGithub, faGoogle} from "@fortawesome/free-brands-svg-icons";

function Text() {
    return (
        <Container>
            <Row>
                <Col style={{
                    fontFamily: "Roboto Mono",
                    color: colors.grays.offwhite,
                    fontSize: 35,
                    paddingLeft: 30
                }} >Hi, I'm Noah!</Col>
                <Col style={{
                    maxWidth: 305,
                    paddingLeft: 30,
                    fontFamily: "Roboto Mono",
                    fontSize: 18,
                    color: "black"
                }} >I am a young, self motivated software developer based in the United States.  Currently working on tools for making games more streamable.</Col>
            </Row>
        </Container>
    );
}

function ContactMeIcons() {
    const discordClick = () => { console.log("TODO discord link") };
    const gmailClick = () => { console.log("TODO gmail link") };
    const githubClick = () => { console.log("TODO github link") };

    return (
        <Container style={{
            display: "flex",
            justifyContent: "space-evenly",
            paddingTop: 10
        }} >
            <Button style={{
                background: colors.grays.darkgray,
                border: "none",
                width: 50,
                height: 50,
                borderRadius: 10,
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }} onClick={discordClick} >
                <FontAwesomeIcon icon={faDiscord} style={{
                    width: 40,
                    height: 40,
                    color: colors.grays.offwhite
                }} />
            </Button>

            <Button style={{
                background: colors.grays.darkgray,
                border: "none",
                width: 50,
                height: 50,
                borderRadius: 10,
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }} onClick={gmailClick} >
                <FontAwesomeIcon icon={faGoogle} style={{
                    width: 40,
                    height: 40,
                    color: colors.grays.offwhite
                }} />
            </Button>

            <Button style={{
                background: colors.grays.darkgray,
                border: "none",
                width: 50,
                height: 50,
                borderRadius: 10,
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }} onClick={githubClick} >
                <FontAwesomeIcon icon={faGithub} style={{
                    width: 40,
                    height: 40,
                    color: colors.grays.offwhite
                }} />
            </Button>
        </Container>
    );
}

function IntroCard() {
    return (
        <Container style={{ width: 600 }} >
            <Col style={{ background: colors.primaries.red, borderRadius: 20, padding:20 }} >
                <Row xs={6} md={4} style={{display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',}} >
                    <Image
                        src={me}
                        roundedCircle={true}
                        style={{ width: "150px", overflow: "hidden" }}
                        alt="Avatar"
                    />
                    <Text/>
                </Row>
                <ContactMeIcons/>
            </Col>
        </Container>
    );
}

export default IntroCard;