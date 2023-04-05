import {Form, FormText} from "react-bootstrap";
import {colors} from "./Colors";

export default function BetterText(props) {
    return (<FormText style={{
        fontFamily: "Roboto Mono",
        fontSize: props.size ? props.size : 20,
        color: props.color ? props.color : colors.grays.darkgray,
        cursor: props.cursor ? props.cursor : "default",
        padding: props.padding ? props.padding : 0,
        backgroundColor: props.backgroundColor ? props.backgroundColor : "transparent"
    }} >{props.children}</FormText>);
}