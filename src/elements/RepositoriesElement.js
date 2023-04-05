import {Container, FloatingLabel, Form, FormText} from "react-bootstrap";
import {colors} from "../helpers/Colors";
import BetterButton from "../helpers/BetterButton";
import BetterText from "../helpers/BetterText";
import {BsFillCaretDownFill, BsSearch} from "react-icons/bs";

function Filter() {
    return (
        <Container style={{
            margin: 5,
            background: `linear-gradient(to right, ${colors.primaries.green}, ${colors.primaries.purple})`,
            borderRadius: 100,
            boxShadow: `0 5px 2px rgba(0, 0, 0, 0.1)`
        }}>
            <BetterButton initColor={"transparent"} hoverColor={"rgba(1, 1, 1, 0.1)"} radius={100} padding={20} >
                <BetterText color={colors.grays.offwhite} cursor="pointer" >
                    <Container style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        Filter
                        <div style={{ width: 10 }} />

                        {/* fix spacing issues with caret */}
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <div style={{ height: 5 }} />
                            <BsFillCaretDownFill/>
                        </div>
                    </Container>
                </BetterText>
            </BetterButton>
        </Container>
    );
}

function Search() {
    return (
        <Container style={{
            margin: 5,
            borderRadius: 100,
            boxShadow: `0 5px 2px rgba(0, 0, 0, 0.1)`
        }}>
            <BetterButton initColor={colors.grays.lightgray} hoverColor={colors.grays.midgray} radius={100} padding={20} >
                <Container style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <BsSearch style={{ width: 20, height: 20 }} />
                    <div style={{ width: 10 }} />
                    <Form.Control style={{
                        border: "none",
                        background: "transparent",
                        overflow: "auto",
                        outline: "none",
                        boxShadow: "none",
                        resize: "none",
                        rows: "1",
                        fontFamily: "Roboto Mono",
                        fontSize: 20
                    }} placeholder="Search..." />
                </Container>
            </BetterButton>
        </Container>
    );
}

export default function RepositoriesElement() {
    return (
        <Container style={{
            minHeight: "100vh",
            display: "flex",
            background: colors.grays.offwhite,
            flexDirection: "column"
        }} >
            <Container style={{
                display: "flex",
                flexDirection: "row"
            }}>
                <Filter/>
                <Search/>
            </Container>
        </Container>
    );
}