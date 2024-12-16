import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Box, Image, Text, HStack, IconButton, Badge, SimpleGrid, Flex} from "@chakra-ui/react";
import {useLazyGetAllProductsQuery} from "src/store/features/products/productsApi/productsApi.js";
import {productsSelector} from "src/store/features/reduxSelectors.js";
import ContentLoader from "src/components/ContentLoader.jsx";
import Categories from "src/components/Categories.jsx";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import {
    setBagQTY,
    setCategory, setPattern,
} from "src/store/features/products/productsSlice/productsSlice.js";
import SearchInput from "src/components/SearchInput.jsx";

const Products = () => {

    const dispatch = useDispatch();
    const { category, pattern } = useSelector(productsSelector);
    const [getProducts, { data: productList, isFetching }] = useLazyGetAllProductsQuery();

    const [quantities, setQuantities] = useState({});

    useEffect(() => {
        const qty = JSON.parse(localStorage.getItem("productsQty"));

        if (qty && Object.keys(quantities).length === 0) {
            setQuantities(qty);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (category) {
            dispatch(setPattern(""));
            getProducts({ category });
        } else if (pattern) {
            dispatch(setCategory(null));
            getProducts({ pattern });
        } else {
            getProducts({});
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category, pattern]);

    useEffect(() => {
        localStorage.setItem("productsQty", JSON.stringify(quantities));
        const qty = Object.values(quantities).reduce((acc, item) => {
            acc += item;
            return acc;
        }, 0)
        dispatch(setBagQTY(qty));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [quantities])

    const incrementQty = (id) => {
        setQuantities((prev) => ({
            ...prev,
            [id]: (prev[id] || 0) + 1,
        }));
        const bagProductsIds = JSON.parse(localStorage.getItem("bagProductsIds"));
        if (bagProductsIds && !bagProductsIds.includes(id)) {
            localStorage.setItem("bagProductsIds", JSON.stringify([...bagProductsIds, id]));
        }
    };

    const decrementQty = (id) => {
        setQuantities((prev) => {
            const bagProductsIds = JSON.parse(localStorage.getItem("bagProductsIds"));
            if (bagProductsIds && bagProductsIds.includes(id) && Math.max((prev[id] || 0) - 1, 0) === 0) {
                localStorage.setItem("bagProductsIds", JSON.stringify([...bagProductsIds.filter(productId => productId !== id)]));
            }
            return (
                {
                    ...prev,
                    [id]: Math.max((prev[id] || 0) - 1, 0),
                }
            )
        });
    };

    const handleSearch = (value) => {
        dispatch(setPattern(value));
    }

    return (
        <>
            {
                isFetching ? (
                    <ContentLoader height={"100vh"} />
                ) : (
                    <Box p={8} bg="gray.50" minH="100vh">
                        <Categories />
                        <Text fontSize="2xl" fontWeight="bold" mt="16px" textAlign="center" color="teal.600">
                            Our Products
                        </Text>
                        <Flex mb="32px">
                            <SearchInput onSearch={handleSearch} />
                        </Flex>
                        <SimpleGrid
                            columns={{ base: 1, md: 2, lg: 3, xl: 4 }}
                            justifySelf="center"
                            gap="48px"
                        >
                            {
                                productList?.map((product) => (
                                    <Box
                                        key={product.id}
                                        bg="white"
                                        boxShadow="md"
                                        borderRadius="md"
                                        overflow="hidden"
                                        _hover={{ boxShadow: "lg", transform: "scale(1.02)" }}
                                        transition="all 0.2s ease-in-out"
                                        width="300px"
                                    >
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            objectFit="cover"
                                            width="100%"
                                            height="200px"
                                        />
                                        <Box p={4}>
                                            <Text fontWeight="bold" fontSize="lg" color="teal.700" mb={2}>
                                                {product.name}
                                            </Text>
                                            <Text fontSize="sm" color="gray.600" noOfLines={2}>
                                                {product.description}
                                            </Text>
                                            <HStack justify="space-between" mt={3}>
                                                <Badge colorScheme="teal" fontSize="md">
                                                    ${product.price}
                                                </Badge>
                                            </HStack>
                                            <HStack justify="center" mt={4} align="center">
                                                <HStack spacing={2}>
                                                    <IconButton
                                                        size="sm"
                                                        icon={<MinusIcon />}
                                                        onClick={() => decrementQty(product.id)}
                                                        aria-label="Decrease quantity"
                                                        colorScheme="teal"
                                                        variant="outline"
                                                        isDisabled={quantities[product.id] === 0}
                                                    />
                                                    <Text fontSize="md" fontWeight="medium">
                                                        {quantities[product.id] || 0}
                                                    </Text>
                                                    <IconButton
                                                        size="sm"
                                                        icon={<AddIcon />}
                                                        onClick={() => incrementQty(product.id)}
                                                        aria-label="Increase quantity"
                                                        colorScheme="teal"
                                                    />
                                                </HStack>
                                            </HStack>
                                        </Box>
                                    </Box>
                                ))
                            }
                        </SimpleGrid>
                    </Box>
                )
            }
        </>
    );
};

export default Products;
