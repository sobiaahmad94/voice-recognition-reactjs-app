import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
// func comp 
const VoiceToText = () => {
    // state for listening to voice
    const [isListening, setIsListening] = useState(false);
    // state for past recognised text from voice, will store an array of strings 
    const [recognisedText, setRecognisedText] = useState([]);
    // state for current text that's being recognised, empty string
    const [currentText, setCurrentText] = useState("");
    // state for the actual instance of speech recognition, set to any as had minor issues
    const [recognition, setRecognition] = useState(null);
    // SpeechRecoginition or webkitSpeechRecognition objects are grabbed from the window globally then just stored in SpeechRecognition
    // useEffect is there as it'll only run once 
    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition ||
            window.webkitSpeechRecognition;
        // there's another instance of SpeechRecognition() stored in a new var
        const newRecognition = new SpeechRecognition();
        // bang operator, just saying that if there's no SpeechRecognition instance then it'll just stop, return early
        if (!newRecognition)
            return;
        // this just makes sure SpeechRecognition object continuously listens to speech
        newRecognition.continuous = true;
        // this makes sure the SpeechRecognition object gives results each time
        newRecognition.interimResults = true;
        // event handler for when user clicks the start listening button
        // state for listening toggles to true as should be listening
        newRecognition.onstart = () => {
            setIsListening(true);
            console.log("listening has started");
        };
        // event handler for when user clicks the stop listening button to stop listening
        // state for listening toggles to false, as shouldn't be listening anymore
        newRecognition.onend = () => {
            setIsListening(false);
            console.log("listening has stopped");
        };
        // another event handler, it gets the recognised text and shows them as 
        // gets transcripts from results and then updates the state for currentText
        newRecognition.onresult = (event) => {
            const transcriptions = Array.from(event.results).map((result) => result[0].transcript);
            setCurrentText(transcriptions.join(" "));
        };
        // error log
        newRecognition.onerror = (event) => {
            console.error("oh no, error during recognition", event);
        };
        // newRecognition instance gets stored in the recognition state var
        setRecognition(newRecognition);
        // empty array [] means it'll only run once
    }, []);
    // toggles between isListening and not listening
    const toggleListening = () => {
        if (recognition) {
            if (isListening) {
                recognition.stop();
            }
            else {
                recognition.start();
            }
        }
    };
    // save note function
    // checks the string isn't empty and removes white spaces
    const handleSaveNote = () => {
        if (currentText.trim() !== "") {
            // adds current text to recognised text
            setRecognisedText([...recognisedText, currentText]);
            // clears to empty
            setCurrentText("");
        }
    };
    // delete note function
    const handleDeleteNote = (index) => {
        const updatedNotes = recognisedText.filter((_, i) => i !== index);
        setRecognisedText(updatedNotes);
    };
    // clear note function, just sets the currentText to an empty string
    const handleClearCurrentNote = () => {
        setCurrentText("");
    };
    // clear all of the notes function, makes recognisedText an empty array
    const handleClearAllNotes = () => {
        setRecognisedText([]);
    };
    return (_jsxs("div", { children: [_jsx("h2", { children: "Voice To Text" }), _jsx("button", { onClick: toggleListening, children: isListening ? "Stop Listening" : "Start Listening" }), _jsx("p", { children: "Notes taken from recognised text:" }), _jsx("ul", { children: recognisedText.map((note, index) => (_jsxs("li", { children: [note, _jsx("button", { onClick: () => handleDeleteNote(index), children: "Delete" })] }, index))) }), _jsxs("div", { children: [_jsx("p", { children: "Current Text:" }), _jsx("p", { children: currentText }), _jsx("button", { onClick: handleSaveNote, children: "Save Note" }), _jsx("button", { onClick: handleClearCurrentNote, children: "Clear Current Note" })] }), _jsx("button", { onClick: handleClearAllNotes, children: "Clear All Notes" })] }));
};
export default VoiceToText;
