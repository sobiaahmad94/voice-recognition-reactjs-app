import TextToVoice from "./components/TextToVoice";
import VoiceToText from "./components/VoiceToText";

// styling
import {Container, Heading} from "@chakra-ui/react";



const App = () => {
  return (
    <div>
      <Container alignItems="center" margin="40px">
        <Heading size="2xl" margin="10px" color="pink.400">Voice Recognition App</Heading>
        <TextToVoice />
        <VoiceToText />
        </Container>

    </div>
  )
}
export default App;