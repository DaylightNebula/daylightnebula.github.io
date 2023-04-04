import {Button, Container, FormText} from "react-bootstrap";
import {colors} from "./Colors";

function Left() {
    return (
        <Container style={{
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 10
        }} >
            <FormText style={{
                color: colors.grays.offwhite,
                fontFamily: 'Roboto Mono',
                fontSize: 35,
            }} >DaylightNebula</FormText>
        </Container>
    );
}

function Right() {
    const handleClick = () => {
        console.log("Bobs your uncle");
    };

    return (
        <Container style={{
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 10,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }} >
            {/*<FormText style={{*/}
            {/*    color: colors.grays.offwhite,*/}
            {/*    fontFamily: 'Roboto Mono',*/}
            {/*    fontSize: 25,*/}
            {/*}} >Projects</FormText>*/}
            <Button style={{
                // remove button ugliness
                overflow: 'hidden',
                backgroundColor: 'transparent',
                border: 'none',

                // hover stuff
                // ':hover': {
                //     backgroundColor: '#fff',
                //     color: '#3c52b2',
                // },

                // setup font
                color: colors.grays.offwhite,
                fontFamily: 'Roboto Mono',
                fontSize: 25
            }} onClick={handleClick} >Projects</Button>
        </Container>
    );
}

function Topbar() {
    return (
        <Container style={{ background: colors.grays.darkgray, display: "flex", justifyContent: "space-between" }} >
            <Left/>
            <Right/>
        </Container>
    );
}

export default Topbar;