import {Button} from "react-bootstrap";
import {useState} from "react";

export default function BetterButton(props) {
    const [isHovering, setIsHovering] = useState();
    const handleMouseOver = () => setIsHovering(true);
    const handleMouseOut = () => setIsHovering(false);

    return (
        <Button
            style={{
                /* styling */
                background: isHovering ? props.hoverColor : props.initColor,
                border: props.border ? props.border : "none",
                padding: props.padding ? props.padding : 5,
                borderRadius: props.radius ? props.radius : 5,
                cursor: "pointer",

                /* center content */
                display: "flex",
                justifyContent: "center",
                alignItems: "center",

                /* shadow */
                boxShadow: props.boxShadow ? props.boxShadow : ``
            }}
            onClick={props.onClick}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
        >
            {props.children}
        </Button>
    );
}