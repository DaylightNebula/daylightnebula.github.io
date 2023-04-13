import {FormText} from "react-bootstrap";
import {colors} from "./Colors";

export default function GradientText(props) {
    return (<FormText style={{
        fontFamily: "Roboto Mono",
        fontSize: props.size ? props.size : 35,
        cursor: props.cursor ? props.cursor : "default",
        padding: props.padding ? props.padding : 0,
        background: props.gradient ? props.gradient : "blue",
        "-webkit-background-clip": "text",
        color: "transparent",
    }} >{props.children}</FormText>);
}