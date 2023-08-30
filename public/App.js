import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import TextToVoice from "./components/TextToVoice";
import VoiceToText from "./components/VoiceToText";
const App = () => {
    return (_jsxs(_Fragment, { children: [_jsx("h1", { children: "Voice Recognition App" }), _jsx(TextToVoice, {}), _jsx(VoiceToText, {})] }));
};
export default App;
