import React, {useState, useEffect} from "react";

const TextToVoice: React.FC = () => {

  const [synth, setSynth] = useState<SpeechSynthesis | null>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState("");
  const [text, setText] = useState("");
  const [rateValue, setRateValue] = useState(1);
  // state for pitch number, value set to 1
  const [pitchValue, setPitchValue] = useState(1);


  useEffect(() => {
    const synthInstance = window.speechSynthesis;
    setSynth(synthInstance);

    const browserIsFirefox = typeof window.InstallTrigger !== "undefined";
    const browserIsChrome = !!window.chrome?.webstore;

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

  const handleVoiceSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedVoice(event.target.value);
    speak();
  };

  const handleRateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRateValue(parseFloat(event.target.value));
  };

  const handlePitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  return (
    <div>
      <h2>Text To Voice</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          speak();
        }}
      >
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <select value={selectedVoice} onChange={handleVoiceSelectChange}>
          {voices.map((voice) => (
            <option key={voice.name} value={voice.name}>
              {voice.name} ({voice.lang})
            </option>
          ))}
        </select>
        <input type="range" min="0.5" max="2" step="0.1" value={rateValue} onChange={handleRateChange}/>
        <span>{rateValue}</span>
        <input type="range" min="0.1" max="2" step="0.1" value={pitchValue} onChange={handlePitchChange}/>
        <span>{pitchValue}</span>
        <button type="submit">Speak</button>
      </form>
    </div>
    
  );
};

export default TextToVoice;
