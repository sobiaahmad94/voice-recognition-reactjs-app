import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// styles
import { Container, Text, Link, Flex } from "@chakra-ui/react";
const Footer = () => {
    return (_jsx(Container, { as: "footer", borderRadius: "7px", backgroundColor: "blackAlpha.900", color: "pink.300", padding: 4, mt: 8, borderTop: "lightGrey", children: _jsx(Flex, { justify: "center", align: "center", fontSize: "10px", fontWeight: "bold", children: _jsxs(Text, { children: ["\u00A9 ", new Date().getFullYear(), _jsx(Link, { href: "https://github.com/sobiaahmad94", style: { textDecoration: "none" }, children: " - Sobia Ahmad" })] }) }) }));
};
export default Footer;
