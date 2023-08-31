import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import TextToVoice from "./components/TextToVoice";
import VoiceToText from "./components/VoiceToText";
import Footer from "./components/Footer";
// styling
import { Container, Heading } from "@chakra-ui/react";
const App = () => {
    return (_jsxs(Container, { alignItems: "center", children: [_jsx(Heading, { size: "xl", margin: "10px", color: "pink.400", children: "Voice Recognition App" }), _jsx(TextToVoice, {}), _jsx(VoiceToText, {}), _jsx(Footer, {})] }));
};
export default App;
