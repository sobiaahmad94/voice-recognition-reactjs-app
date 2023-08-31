import React from "react";

// styles
import {Container, Text, Link, Flex} from "@chakra-ui/react";


const Footer: React.FC = () => {
  return (
    <Container as="footer" borderRadius="7px" backgroundColor="blackAlpha.900" color="pink.300" padding={3} mt={8} borderTop="lightGrey">
      <Flex justify="center" align="center" fontSize="10px" fontWeight="bold">
        <Text >&copy; {new Date().getFullYear()}<Link href="https://github.com/sobiaahmad94" style={{textDecoration: "none"}}> - Sobia Ahmad</Link></Text>

      </Flex>
    </Container>
  );
};

export default Footer;
