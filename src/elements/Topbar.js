import {Container, Form, FormText} from "react-bootstrap";
import {colors} from "../helpers/Colors";
import BetterText from "../helpers/BetterText";
import BetterButton from "../helpers/BetterButton";
import {useEffect, useState} from "react";

function TopbarElement(props) {
    // if we are clicked, we should goto the given page
    const goto = () => {
        window.scrollTo({
            top: window.innerHeight * (props.scrollMult ? props.scrollMult : 0),
            behavior: 'smooth'
        });
    };

    return (
        // eslint-disable-next-line no-restricted-globals
        <BetterButton initColor={props.isHighlighted ? colors.grays.offwhite : "transparent"} hoverColor={colors.grays.campfire} radius={100} onClick={goto} >
            <BetterText color={props.isHighlighted ? colors.grays.darkgray : colors.grays.offwhite} padding={5} >
                {props.children}
            </BetterText>
        </BetterButton>
    );
}

function Topbar() {
    // setup scroll state so we know which state we are in
    const [scroll, setScroll] = useState(0);
    useEffect(() => {
        window.addEventListener("scroll", (e) => setScroll(Math.round(window.scrollY / window.innerHeight)))
    }, [scroll]);

    return (
        <Container style={{
            position: "fixed",
            right: 10,
            top: 5,
            background: colors.grays.darkgray,
            padding: 10,
            borderRadius: 100,
            display: "flex",
            flexDirection: "row"
        }}>
            <TopbarElement scrollMult={0} isHighlighted={scroll === 0} >Introduction</TopbarElement>
            <div style={{ width: 10 }} />
            <TopbarElement scrollMult={1} isHighlighted={scroll === 1} >Technologies</TopbarElement>
            <div style={{ width: 10 }} />
            <TopbarElement scrollMult={2} isHighlighted={scroll === 2} >Projects</TopbarElement>
            <div style={{ width: 10 }} />
            <TopbarElement scrollMult={3} isHighlighted={scroll === 3} >Repositories</TopbarElement>
        </Container>
    );
}

export default Topbar;