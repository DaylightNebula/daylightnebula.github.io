import me from "./me.jpg";
import {Col, Container, FormText, Image, Row} from "react-bootstrap";
import Topbar from "../../helpers/Topbar";
import {colors} from "../../helpers/Colors";
import IntroCard from "../../cards/IntroCard";

function Intro() {
    return (
        <Container style={{
            background: colors.grays.darkgray,
            padding: 20,
            display: "flex",
            justifyContent: "center"
        }} >
            <IntroCard/>
            <Container style={{ width: "2.5%" }} />
            <Container style={{ width: "30%", background: colors.primaries.green, borderRadius: 20, padding: 20, paddingLeft: 20 }} >

            </Container>
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