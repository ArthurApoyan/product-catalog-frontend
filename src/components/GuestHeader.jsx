import { Box, Link as ChakraLink, HStack, Button } from "@chakra-ui/react";
import {Link, useLocation} from "react-router-dom";

const GuestHeader = () => {

    const location = useLocation();

    return (
        <Box
            as="header"
            bg="teal.500"
            color="white"
            px={6}
            py={4}
            boxShadow="md"
        >
            <HStack justify="flex-end" spacing={4}>
                <ChakraLink
                    as={Link}
                    to="/signUp"
                    _hover={{ textDecoration: "none" }}
                >
                    <Button colorScheme={ location.pathname === "/signUp" ? "whiteAlpha" : "teal" } variant="solid">
                        Sign Up
                    </Button>
                </ChakraLink>
                <ChakraLink
                    as={Link}
                    to="/signIn"
                    _hover={{ textDecoration: "none" }}
                >
                    <Button colorScheme={ location.pathname === "/signIn" ? "whiteAlpha" : "teal" } variant="solid">
                        Sign In
                    </Button>
                </ChakraLink>
            </HStack>
        </Box>
    );
};

export default GuestHeader;
