import me from "./me.jpg";
import {Button, Container, FormText, Image} from "react-bootstrap";
import {colors} from "../../helpers/Colors";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDiscord, faGithub, faGoogle} from "@fortawesome/free-brands-svg-icons";

function ContactButtons() {
    const discordClick = () => { console.log("TODO discord link") };
    const gmailClick = () => { console.log("TODO gmail link") };
    const githubClick = () => { console.log("TODO github link") };

    return (
        <Container style={{
            display: "flex",
            flexDirection: "row"
        }} >
            <Button style={{
                background: "transparent",
                border: "none",
                width: 50,
                height: 50,
                borderRadius: 10,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }} className="contact-button"  onClick={discordClick} >
                <FontAwesomeIcon icon={faDiscord} style={{
                    width: 40,
                    height: 40,
                    color: colors.grays.offwhite
                }} />
            </Button>

            <Button style={{
                background: "transparent",
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
                background: "transparent",
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

function Intro() {
    return (
        <Container style={{
            height: '100vh',
            background: colors.grays.darkgray,
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }} >
            <Image src={me} style={{ width: 200, height: 200, borderRadius: 300, backgroundSize: "cover" }} />
            <Container style={{
                display: "flex",
                flexDirection: "column",
                padding: 20,
                height: 200,
                width: 400
            }} >
                <FormText style={{
                    fontFamily: "Roboto Mono",
                    fontSize: 35,
                    color: colors.grays.offwhite
                }} >Hi, I'm Noah Shaw!</FormText>
                <Container style={{ height: 15 }} />
                <FormText style={{
                    fontFamily: "Roboto Mono",
                    fontSize: 20,
                    color: colors.grays.offwhite
                }} >I am a full-stack developer based in the United States.</FormText>
                <Container style={{ height: 15 }} />
                <ContactButtons/>
            </Container>
        </Container>
    );
}

function MainPage() {
    return (
        <Container>
            <Intro/>
        </Container>
    );
}

export default MainPage;