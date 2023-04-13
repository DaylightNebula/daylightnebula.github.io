import {Container, Image} from "react-bootstrap";
import {colors} from "../helpers/Colors";
import {links} from "../helpers/links";

export default function TechElement() {
    return (
        <Container style={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: colors.grays.darkgray
        }} >
            <Container style={{
                display: "flex",
                flexDirection: "column"
            }} >
                <Container style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                }} >
                    <Image src={links.GITHUB_STATS_PROFILE} />
                    <div style={{ width: 50 }} />
                    <Image src={links.GITHUB_STATS_LANGUAGES} />
                </Container>

                <div style={{ height: 50 }} />
                <Container style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                }} >
                    <Image src={links.GITHUB_STATS} />
                </Container>
            </Container>
        </Container>
    );
}