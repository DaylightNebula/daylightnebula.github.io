import {Container, FormText} from "react-bootstrap";
import {colors} from "../helpers/Colors";

export default function RepositoriesElement() {
    return (
        <Container style={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: colors.grays.offwhite
        }} >
            <FormText style={{
                fontFamily: "Roboto Mono",
                fontSize: 50,
                color: colors.grays.darkgray
            }} >TODO Repositories</FormText>
        </Container>
    );
}