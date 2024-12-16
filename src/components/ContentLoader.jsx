import { Box, Spinner, Text } from "@chakra-ui/react";

const ContentLoader = ({ message = "Loading", height = "30vh" }) => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            height={height}
            bg="gray.50"
        >
            <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
            />
            <Text mt={4} fontSize="lg" color="gray.600">
                {message}
            </Text>
        </Box>
    );
};

export default ContentLoader;
