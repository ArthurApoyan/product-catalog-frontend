import {useEffect, useState} from "react";
import {
    Box,
    Button,
    Divider,
    Flex,
    Heading,
    Image,
    Stack,
    Text,
    useDisclosure
} from "@chakra-ui/react";
import {useGetBagProductsMutation} from "../store/features/products/productsApi/productsApi.js";
import ContentLoader from "../components/ContentLoader.jsx";
import SuccessfulOrderPopUp from "../components/SuccessfulOrderPopUp.jsx";
import {useNavigate} from "react-router-dom";

const Bag = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();
    const [getBagProducts, { data: productList, isLoading }] = useGetBagProductsMutation();
    const [productsQty, setProductsQty] = useState(null);

    useEffect(() => {
        const qty = JSON.parse(localStorage.getItem("productsQty"));
        if (qty) {
            setProductsQty(qty);
        }

        const ids = JSON.parse(localStorage.getItem("bagProductsIds"));
        if (ids && ids.length) {
            getBagProducts({ ids });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const totalPrice = (!isLoading && productList && productsQty) ? productList.reduce(
        (acc, product) => acc + parseFloat(product?.price) * productsQty[product?.id],
        0
    ) : 0;

    const onCheckout = () => {
        onOpen();
    }

    const onConfirm = () => {
        navigate("/products");
    }

    return (
        <>
            {
                isLoading ? (
                    <ContentLoader height="100vh" />
                ) : (
                    <Box
                        maxW="container.lg"
                        mx="auto"
                        p={6}
                        bg={"gray.100"}
                    >
                        <Heading as="h1" size="lg" mb={6}>
                            Your Bag
                        </Heading>
                        <Stack spacing={6}>
                            {productList?.map((product) => (
                                <Flex
                                    key={product.id}
                                    p={4}
                                    shadow="md"
                                    borderRadius="md"
                                    bg={"teal.100"}
                                    align="center"
                                    justify="space-between"
                                >
                                    <Flex align="center">
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            boxSize="80px"
                                            objectFit="cover"
                                            borderRadius="md"
                                            mr={4}
                                        />
                                        <Box>
                                            <Text fontWeight="bold" fontSize="lg">
                                                {product.name}
                                            </Text>
                                            <Text fontSize="sm" color="gray.500">
                                                {product.description}
                                            </Text>
                                        </Box>
                                    </Flex>

                                    <Box textAlign="right">
                                        <Text fontWeight="bold">${product?.price}</Text>
                                        <Text fontSize="sm" color="gray.500">
                                            Qty: {productsQty[product?.id] ? productsQty[product?.id] : 0}
                                        </Text>
                                    </Box>
                                </Flex>
                            ))}
                        </Stack>

                        <Divider my={6} />

                        <Box
                            p={4}
                            shadow="md"
                            borderRadius="md"
                            bg={"gray.300"}
                        >
                            <Flex justify="space-between" align="center" mb={4}>
                                <Text fontWeight="bold" fontSize="lg">
                                    Total Price:
                                </Text>
                                <Text fontWeight="bold" fontSize="lg" color="blue.500">
                                    ${totalPrice.toFixed(2)}
                                </Text>
                            </Flex>
                            <Button
                                backgroundColor="teal.500"
                                color="white"
                                size="lg"
                                width="full"
                                _hover={{
                                    backgroundColor: "teal.600"
                                }}
                                onClick={onCheckout}
                            >
                                Proceed to Checkout
                            </Button>
                        </Box>
                    </Box>
                )
            }
            {isOpen && <SuccessfulOrderPopUp isOpen={isOpen} onClose={onClose} onConfirm={onConfirm} />}
        </>
    );
};

export default Bag;
