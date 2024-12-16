import {Box, Link as ChakraLink, HStack, Button, Flex} from "@chakra-ui/react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useLogoutMutation} from "src/store/features/auth/authAPI/authAPI.js";
import {useDispatch, useSelector} from "react-redux";
import {productsSelector} from "src/store/features/reduxSelectors.js";
import {setCategory, setPattern} from "src/store/features/products/productsSlice/productsSlice.js";

const DefaultHeader = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const [logout] = useLogoutMutation();
    const { bagQTY } = useSelector(productsSelector);

    const handleLogOut = async () => {
        try {
            const response = await logout(undefined);
            if (response?.data?.message === 'Logged out') {
                localStorage.removeItem('ACCESS_TOKEN');
                localStorage.removeItem('bagProductsIds');
                localStorage.removeItem('productsQty');
                dispatch(setCategory(null));
                dispatch(setPattern(""));
                navigate('/');
            }
        } catch (err) {
            console.error(err);
        }
    }

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
                    to="/products"
                    _hover={{ textDecoration: "none" }}
                >
                    <Button colorScheme={ location.pathname === "/products" ? "whiteAlpha" : "teal" } variant="solid">
                        Products
                    </Button>
                </ChakraLink>
                <ChakraLink
                    as={Link}
                    to="/bag"
                    _hover={{ textDecoration: "none" }}
                    position="relative"
                >
                    <Flex
                        width="15px"
                        height="15px"
                        justifyContent="center"
                        alignItems="center"
                        bg="red"
                        color="white"
                        padding="2px"
                        rounded="50%"
                        position="absolute"
                        zIndex={10}
                        right="0"
                        fontSize="11px"
                    >
                        {bagQTY}
                    </Flex>
                    <Button colorScheme={ location.pathname === "/bag" ? "whiteAlpha" : "teal" } variant="solid">
                        Bag
                    </Button>
                </ChakraLink>
                <Button onClick={handleLogOut} colorScheme="blackAlpha" variant="solid">
                    Log Out
                </Button>
            </HStack>
        </Box>
    );
};

export default DefaultHeader;
