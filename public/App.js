import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import TextToVoice from "./components/TextToVoice";
import VoiceToText from "./components/VoiceToText";
// styling
import { Container, Heading } from "@chakra-ui/react";
const App = () => {
    return (_jsx("div", { children: _jsxs(Container, { alignItems: "center", margin: "40px", children: [_jsx(Heading, { size: "2xl", margin: "10px", color: "pink.400", children: "Voice Recognition App" }), _jsx(TextToVoice, {}), _jsx(VoiceToText, {})] }) }));
};
export default App;
