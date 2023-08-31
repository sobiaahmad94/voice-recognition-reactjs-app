import TextToVoice from "./components/TextToVoice";
import VoiceToText from "./components/VoiceToText";
import Footer from "./components/Footer";

// styling
import {Container, Heading} from "@chakra-ui/react";



const App = () => {
  return (
      <Container alignItems="center">
        <Heading size="lg" margin="10px" color="pink.400">Voice Recognition App</Heading>
        <TextToVoice />
        <VoiceToText />
        <Footer />
      </Container>

  )
}
export default App;