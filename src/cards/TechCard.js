import {Col, Container, FormText, Image, Row} from "react-bootstrap";
import {colors} from "../helpers/Colors";
import kotlin from "../../public/Kotlin_Icon.png"

function TechCard() {
    return (
        <Container style={{ width: 600, background: colors.primaries.green, borderRadius: 20, padding: 20, paddingLeft: 20 }} >
            <Col>
                {/* languages header */}
                <Row>
                    <FormText style={{
                        fontFamily: "Roboto Mono",
                        fontSize: 35,
                        color: colors.grays.offwhite
                    }} >Languages</FormText>
                </Row>

                {/* languages list */}
                <Row>
                    <Image src={kotlin} />
                </Row>

                {/* technologies header */}
                <Row>
                    <FormText style={{
                        fontFamily: "Roboto Mono",
                        fontSize: 35,
                        color: colors.grays.offwhite
                    }}>Technologies</FormText>
                </Row>
            </Col>
        </Container>
    );
}

export default TechCard;