import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
const TextConverter = () => {
    const [synth, setSynth] = useState(null);
    const [voices, setVoices] = useState([]);
    const [selectedVoice, setSelectedVoice] = useState("");
    const [text, setText] = useState("");
    const [rateValue, setRateValue] = useState(1);
    const [pitchValue, setPitchValue] = useState(1);
    useEffect(() => {
        var _a;
        const synthInstance = window.speechSynthesis;
        setSynth(synthInstance);
        const browserIsFirefox = typeof window.InstallTrigger !== "undefined";
        const browserIsChrome = !!((_a = window.chrome) === null || _a === void 0 ? void 0 : _a.webstore);
        if (browserIsFirefox || (browserIsChrome && synthInstance.onvoiceschanged !== undefined)) {
            getVoices();
        }
    }, []);
    useEffect(() => {
        if (synth) {
            getVoices();
        }
    }, [synth]);
    const getVoices = () => {
        if (synth) {
            const availableVoices = synth.getVoices();
            setVoices(availableVoices);
        }
    };
    const handleVoiceSelectChange = (event) => {
        setSelectedVoice(event.target.value);
        speak();
    };
    const handleRateChange = (event) => {
        setRateValue(parseFloat(event.target.value));
    };
    const handlePitchChange = (event) => {
        setPitchValue(parseFloat(event.target.value));
    };
    const speak = () => {
        if (synth) {
            if (synth.speaking) {
                console.error("already speaking");
                return;
            }
            if (text !== "") {
                const speakText = new SpeechSynthesisUtterance(text);
                speakText.onend = () => {
                    console.log("finished speaking");
                };
                speakText.onerror = () => {
                    console.error("oh no, something isn't working");
                };
                const selectedVoiceObject = voices.find((voice) => voice.name === selectedVoice);
                if (selectedVoiceObject) {
                    speakText.voice = selectedVoiceObject;
                }
                speakText.rate = rateValue;
                speakText.pitch = pitchValue;
                synth.speak(speakText);
            }
        }
    };
    return (_jsx("div", { children: _jsxs("form", { onSubmit: (e) => {
                e.preventDefault();
                speak();
            }, children: [_jsx("input", { type: "text", value: text, onChange: (e) => setText(e.target.value) }), _jsx("select", { value: selectedVoice, onChange: handleVoiceSelectChange, children: voices.map((voice) => (_jsxs("option", { value: voice.name, children: [voice.name, " (", voice.lang, ")"] }, voice.name))) }), _jsx("input", { type: "range", min: "0.5", max: "2", step: "0.1", value: rateValue, onChange: handleRateChange }), _jsx("span", { children: rateValue }), _jsx("input", { type: "range", min: "0.1", max: "2", step: "0.1", value: pitchValue, onChange: handlePitchChange }), _jsx("span", { children: pitchValue }), _jsx("button", { type: "submit", children: "Speak" })] }) }));
};
export default TextConverter;
