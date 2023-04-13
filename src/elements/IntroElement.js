import {Button, Col, Container, FormText, Image, Row} from "react-bootstrap";
import {colors} from "../helpers/Colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faGithub } from "@fortawesome/free-brands-svg-icons";
import BetterButton from "../helpers/BetterButton";
import me from "../me.jpg";
import BetterText from "../helpers/BetterText";
import { HiOutlineMail } from "react-icons/hi";
import {links} from "../helpers/links";

function ContactButtons() {
    const discordClick = () => { window.open(links.DISCORD_LINK) };
    const gmailClick = () => { window.open(links.EMAIL_LINK) };
    const githubClick = () => { window.open(links.GITHUB_LINK) };
    const resumeClick = () => { window.open(links.RESUME_LINK) };

    return (
        <Container style={{
            display: "flex",
            flexDirection: "row",
        }} >
            {/* discord button */}
            <BetterButton initColor="transparent" hoverColor={colors.grays.campfire} onClick={discordClick} >
                <FontAwesomeIcon icon={faDiscord} style={{
                    width: 40,
                    height: 40,
                    color: colors.grays.offwhite
                }}/>
            </BetterButton>

            <div style={{ width: 5 }} />

            {/* git hub button */}
            <BetterButton initColor="transparent" hoverColor={colors.grays.campfire}  onClick={githubClick} >
                <FontAwesomeIcon icon={faGithub} style={{
                    width: 40,
                    height: 40,
                    color: colors.grays.offwhite
                }} />
            </BetterButton>

            <div style={{ width: 5 }} />

            {/* gmail button */}
            <BetterButton initColor="transparent" hoverColor={colors.grays.campfire} onClick={gmailClick} >
                <HiOutlineMail style={{
                    width: 40,
                    height: 40,
                    color: colors.grays.offwhite
                }} />
            </BetterButton>

            <div style={{ width: 100 }} />

            {/* resume button */}
            <BetterButton
                initColor={colors.grays.darkgray}
                radius={100}
                hoverColor={colors.grays.campfire}
                border={`2px solid ${colors.primaries.green}`}
                onClick={resumeClick}
            >
                <div style={{ width: 20 }} />
                <BetterText cursor={"pointer"} color={colors.grays.offwhite} >Resume</BetterText>
                <div style={{ width: 20 }} />
            </BetterButton>
        </Container>
    );
}

export default function IntroElement() {
    return (
        <Container style={{
            minHeight: '100vh',
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
                <BetterText size={35} color={colors.grays.offwhite}>Hi, I'm Noah Shaw!</BetterText>
                <Container style={{ height: 15 }} />
                <BetterText size={20} color={colors.grays.offwhite}>
                    I am a full-stack developer based in the United States.
                </BetterText>
                <Container style={{ height: 15 }} />
                <ContactButtons/>
            </Container>
        </Container>
    );
}