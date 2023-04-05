import {Form, FormText} from "react-bootstrap";
import {colors} from "./Colors";

export default function BetterText(props) {
    return (<FormText style={{
        fontFamily: "Roboto Mono",
        fontSize: props.size ? props.size : 20,
        color: props.color ? props.color : colors.grays.darkgray
    }} >{props.children}</FormText>);
}