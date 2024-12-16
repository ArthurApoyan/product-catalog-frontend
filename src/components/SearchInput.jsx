import {
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Input,
    Box,
    Button,
    useColorModeValue,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";
import { productsSelector } from "../store/features/reduxSelectors.js";
import { useState } from "react";

const SearchInput = ({ onSearch }) => {
    const { pattern } = useSelector(productsSelector);
    const [searchTerm, setSearchTerm] = useState(pattern || "");

    const bgColor = useColorModeValue("white", "gray.800");
    const borderColor = useColorModeValue("gray.300", "gray.600");

    const handleSearchClick = () => {
        onSearch(searchTerm);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            onSearch(searchTerm);
        }
    }

    return (
        <Box maxW="400px" mx="auto" mt={4}>
            <InputGroup>
                <InputLeftElement pointerEvents="none">
                    <SearchIcon color="gray.400" />
                </InputLeftElement>
                <Input
                    placeholder="Search products..."
                    bg={bgColor}
                    borderColor={borderColor}
                    focusBorderColor="blue.500"
                    value={searchTerm}
                    _hover={{
                        borderColor: "blue.400",
                    }}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <InputRightElement width="4.5rem">
                    <Button
                        h="25px"
                        w="60px"
                        bg="teal.400"
                        color="white"
                        _hover={{
                            backgroundColor: "teal.500"
                        }}
                        onClick={handleSearchClick}
                        fontWeight={400}
                    >
                        Search
                    </Button>
                </InputRightElement>
            </InputGroup>
        </Box>
    );
};

export default SearchInput;
