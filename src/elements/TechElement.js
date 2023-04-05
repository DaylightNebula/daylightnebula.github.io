import {Container, FormText} from "react-bootstrap";
import {colors} from "../helpers/Colors";

export default function TechElement() {
    return (
        <Container style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: colors.grays.offwhite
        }} >
            <FormText style={{
                fontFamily: "Roboto Mono",
                fontSize: 50,
                color: colors.grays.darkgray
            }} >TODO Tech</FormText>
        </Container>
    );
}