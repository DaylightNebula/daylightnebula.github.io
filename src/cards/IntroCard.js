import {Col, Container, Image, Row} from "react-bootstrap";
import {colors} from "../helpers/Colors";
import me from "../pages/mainpage/me.jpg";

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
    return (
        <Container>
            <i className="fab fa-google"></i>
        </Container>
    );
}

function IntroCard() {
    return (
        <Container style={{ width: "30%" }} >
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