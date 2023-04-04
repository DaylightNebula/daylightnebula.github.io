import me from "./me.jpg";
import {Col, Container, Image, Row} from "react-bootstrap";
import Topbar from "../../helpers/Topbar";
import {colors} from "../../helpers/Colors";

function Intro() {
    return (
        <Col style={{ background: colors.primaries.red }} >
            <Row xs={6} md={4} style={{display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',}} >
                <Image
                    src={me}
                    roundedCircle={true}
                    style={{ width: "150px", overflow: "hidden" }}
                    alt="Avatar"
                />
                <text>Hi</text>
            </Row>
        </Col>
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