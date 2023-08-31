import React, { useState, useEffect } from "react";

// Chakra UI styling
import {Heading, Container, Box, Button, Text} from "@chakra-ui/react";

  // styling for the list
  import { ListItem, UnorderedList} from '@chakra-ui/react'

// func comp 
const VoiceToText: React.FC = () => {
  // state for listening to voice
  const [isListening, setIsListening] = useState(false);
  // state for past recognised text from voice, will store an array of strings 
  const [recognisedText, setRecognisedText] = useState<string[]>([]);
  // state for current text that's being recognised, empty string
  const [currentText, setCurrentText] = useState<string>("");
  // state for the actual instance of speech recognition, set to any as had minor issues
  const [recognition, setRecognition] = useState<any>(null);

  // SpeechRecoginition or webkitSpeechRecognition objects are grabbed from the window globally then just stored in SpeechRecognition
  // useEffect is there as it'll only run once 
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    // there's another instance of SpeechRecognition() stored in a new var
    const newRecognition = new SpeechRecognition();

    // bang operator, just saying that if there's no SpeechRecognition instance then it'll just stop, return early

    if (!newRecognition) return;
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
    newRecognition.onresult = (event: any) => {
      const transcriptions = Array.from(event.results).map(
        (result: any) => result[0].transcript
      );
      setCurrentText(transcriptions.join(" "));
    };

    // error log
    newRecognition.onerror = (event: any) => {
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
      } else {
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
  const handleDeleteNote = (index: number) => {
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

  return (
    <Container p={4}>
      <Heading size="lg" color="pink.300">Voice To Text</Heading>

      <Box color="pink.300" display="flex" alignItems="center" mt={4}>
      <Button type="submit" mt={4} colorScheme="pink" size="lg" onClick={toggleListening}>
        {isListening ? "Stop Listening" : "Start Listening"}
      </Button>
      </Box>

  <Box color="pink.300" display="flex" alignItems="center" mt={4}>
  <Box><Text>Notes taken from recognised text:</Text></Box>
  <UnorderedList margin="10px" spacing={3}>
    {recognisedText.map((note, index) => (
      <ListItem key={index}>
        {note}
        <Button type="submit" mt={4} colorScheme="red" onClick={() => handleDeleteNote(index)}>Delete</Button>
      </ListItem>
      
    ))}
  </UnorderedList>
</Box>

        <Box color="pink.300" display="flex" alignItems="center" mt={4}>
        <Text>Current Text:</Text>
        <Text>{currentText}</Text>
        </Box>
        <Box ml={2} minWidth="40px">
        <Button type="submit" mt={4} colorScheme="pink" onClick={handleSaveNote}>Save Note</Button>
        </Box>

        <Box ml={2} minWidth="40px">
        <Button type="submit" mt={4} colorScheme="pink" onClick={handleClearCurrentNote}>Clear Current Note</Button>
        </Box>

      <Box ml={2} minWidth="40px">
      <Button type="submit" mt={4} colorScheme="pink" onClick={handleClearAllNotes}>Clear All Notes</Button>
    </Box>
    </Container>
  );
};

export default VoiceToText;
