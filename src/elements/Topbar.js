import {Container, Form, FormText} from "react-bootstrap";
import {colors} from "../helpers/Colors";
import BetterText from "../helpers/BetterText";

function Topbar() {
    return (
        <Container style={{
            position: "fixed",
            right: 10,
            top: 5,
            background: colors.grays.darkgray,
        }}>
            <BetterText color={colors.grays.offwhite} >Technologies</BetterText>
            <BetterText color={colors.grays.offwhite} >Projects</BetterText>
            <BetterText color={colors.grays.offwhite} >Repositories</BetterText>
        </Container>
    );
}

export default Topbar;