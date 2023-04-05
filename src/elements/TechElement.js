import {Container, FormText} from "react-bootstrap";
import {colors} from "../helpers/Colors";

export default function TechElement() {
    return (
        <Container style={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: colors.grays.darkgray
        }} >
        </Container>
    );
}