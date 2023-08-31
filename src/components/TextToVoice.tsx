import React, {useState, useEffect} from "react";

// Chakra UI styled components
import {Heading, Container, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Box,
  Input, Select, Button, Text} from "@chakra-ui/react";

const TextToVoice: React.FC = () => {

  // taking the window object and grabbing window.SpeechSynthesis then setting its state to null
  const [synth, setSynth] = useState<SpeechSynthesis | null>(null);
  // taking the window object and grabbing window.SpeechSynthesisVoice then setting the state to en empty array
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  // state for the voice selected (e.g. British English) set to an empty syting
  const [selectedVoice, setSelectedVoice] = useState("");
  // state for the text in the input field to be an empty string
  const [text, setText] = useState("");
  // state for speed slider, 50% default
  const [rateSliderValue, setRateSliderValue] = useState(50); 
   // state for pitch slider, 50% default
  const [pitchSliderValue, setPitchSliderValue] = useState(50); 

  // the synth object is being set using the setSync func, which will update the value
  useEffect(() => {
    // this is the web speech API
    const synthInstance = window.speechSynthesis;
    setSynth(synthInstance);

    // checks to see which browser it is
    const browserIsFirefox = typeof window.InstallTrigger !== "undefined";
    const browserIsChrome = !!window.chrome?.webstore;

    if (
      browserIsFirefox ||
      (browserIsChrome && synthInstance.onvoiceschanged !== undefined)
    ) {
      getVoices();
    }
    // will run code once only 
  }, []);

  // checks synth state, if it's not empty then the getVoices() func is called
  useEffect(() => {
    if (synth) {
      getVoices();
    }
  }, [synth]);

  // getVoices function gets all the available voices from the synth obj
  // then voices state with arr of all of the voices updates
  const getVoices = () => {
    if (synth) {
      const availableVoices = synth.getVoices();
      setVoices(availableVoices);
    }
  };

  // when a voice is selected then this func will be called and update the state of selected voice to that 
  const handleVoiceSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedVoice(event.target.value);
  };

  // func for when the slider value is changed the rate slider value state is changed
  const handleRateSliderChange = (value: number) => {
    setRateSliderValue(value);
  };

    // func for when the slider value is changed the pitch value state is changed
  const handlePitchSliderChange = (value: number) => {
    setPitchSliderValue(value);
  };

  // if pitch is less than 50 then it gets lower and if the pitch is higher than 50 the pitch gets higher
  const calculatePitch = (value: number) => {
    if (value <= 50) {
      return 0.5 + (0.5 * value) / 50;
    }
    return 1 + (value - 50) / 50;
  };

  // func to recognise that it's speaking so the speech needs to finish before speaking again
  // if synth object is speaking then it will log a wee error message
  const speak = () => {
    if (synth) {
      if (synth.speaking) {
        console.error("already speaking");
        return;
      }

      // checks if the text is empty so it knows if it needs to speak or not
      if (text !== "") {
        // if not empty then a new obj created 
        const speakText = new SpeechSynthesisUtterance(text);

        // onend property confirms speaking is finished
        speakText.onend = () => {
          console.log("finished speaking");
        };

        // if it doesn't speak or there's an error it's accounted for here
        speakText.onerror = () => {
          console.error("oh no, something isn't working");
        };

        // gets the voices array and selectedVoice value to find the matching name of the voice
        const selectedVoiceObject = voices.find(
          (voice) => voice.name === selectedVoice
        );
        // if the voice is valid and they match then speakText will be called
        if (selectedVoiceObject) {
          speakText.voice = selectedVoiceObject;
        }

        // adjusting the speed and pitch of the voice
        const rateValue =
          rateSliderValue <= 50 ? rateSliderValue / 50 : 1 + (rateSliderValue - 50) / 50;
        const pitchValue = calculatePitch(pitchSliderValue);

        speakText.rate = rateValue;
        speakText.pitch = pitchValue;

        synth.speak(speakText);
      }
    }
  };

  return (
    <div>
      <Container p={4}>
        <Heading size="lg" color="blackAlpha.800">Text To Voice</Heading>

        <form onSubmit={(event) => {event.preventDefault();
            speak();}}>
          <Input color="pink.300" type="text" value={text} onChange={(event) => setText(event.target.value)} mt={4} placeholder="Please enter some text here..."/>
  
          <Select color="pink.300" backgroundColor="blackAlpha.900" cursor="pointer" value={selectedVoice} onChange={handleVoiceSelectChange} mt={2}>{voices.map((voice) => (
              <option key={voice.name} value={voice.name}>
                {voice.name} ({voice.lang})
              </option>
            ))}
          </Select>
  
          <Box color="pink.300" display="flex" alignItems="center" mt={4}>
            
            <Slider colorScheme="pink" aria-label="Rate" value={rateSliderValue} onChange={handleRateSliderChange} flex="1">
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>

            <Box ml={2} minWidth="40px">
              <Text>Speed</Text>
            </Box>

          </Box>
  
          <Box color="pink.300" display="flex" alignItems="center" mt={4}>
            <Slider aria-label="Pitch" colorScheme="pink" value={pitchSliderValue} onChange={handlePitchSliderChange}flex="1">
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb/>
            </Slider >

            <Box ml={2} minWidth="40px">
              <Text>Pitch</Text>
            </Box>

          </Box>
  
          <Button type="submit" mt={4} colorScheme="pink">Speak</Button>
        </form>
      </Container>
    </div>
  );
};

export default TextToVoice;