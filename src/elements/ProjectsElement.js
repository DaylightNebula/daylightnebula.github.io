import {Container, FormText} from "react-bootstrap";
import {colors} from "../helpers/Colors";

export default function ProjectsElement() {
    return (
        <Container style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: colors.grays.darkgray
        }} >
            <FormText style={{
                fontFamily: "Roboto Mono",
                fontSize: 50,
                color: colors.grays.offwhite
            }} >TODO Projects</FormText>
        </Container>
    );
}