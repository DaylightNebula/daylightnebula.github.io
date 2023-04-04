import me from "./me.jpg";
import {Col, Container, FormText, Image, Row} from "react-bootstrap";
import Topbar from "../../helpers/Topbar";
import {colors} from "../../helpers/Colors";
import IntroCard from "../../cards/IntroCard";
import {Grid} from "@mui/material";
import TechCard from "../../cards/TechCard";

function Intro() {
    return (
        <Container style={{
            background: colors.grays.darkgray,
            padding: 20,
            display: "flex",
            justifyContent: "center",
            gridTemplateColumns: "repeat(auto-fit, minmax(600px, 600px))"
        }} >
            <IntroCard style={{ aspectRatio: 0.75, width: "100%" }} />
            <Container style={{ width: 100 }} />
            <TechCard/>
        </Container>
    );
}

function MainPage() {
    return (
        <Container>
            <Topbar/>
            <Intro/>
        </Container>
    );
}

export default MainPage;