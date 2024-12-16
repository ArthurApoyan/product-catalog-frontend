import {Box, Button, Flex, Text} from "@chakra-ui/react";
import {useGetAllCategoriesQuery} from "src/store/features/products/productsApi/productsApi.js";
import ContentLoader from "src/components/ContentLoader.jsx";
import {useDispatch, useSelector} from "react-redux";
import {setCategory} from "src/store/features/products/productsSlice/productsSlice.js";
import {productsSelector} from "src/store/features/reduxSelectors.js";

const Categories = () => {

    const dispatch = useDispatch();
    const { data: categories, isFetching } = useGetAllCategoriesQuery();
    const { category } = useSelector(productsSelector);

    const handleCategoryClick = (id) => {
        dispatch(setCategory(id));
    }

    return (
        <Box>
            <Text fontSize="2xl" fontWeight="bold" mb={2} textAlign="center" color="teal.600">
                Categories
            </Text>
            {
                isFetching ? (
                    <ContentLoader />
                ) : (
                    <Flex justifyContent="center" gap="24px" mb={2}>
                        <Box
                            fontSize="xl"
                            color={!category ? "#FCFCFC" : "teal.300"}
                            background={!category ? "#b9baba" : "#EDF2F7"}
                            minW="100px"
                            as={Button}
                            onClick={() => handleCategoryClick(null)}
                        >
                            All
                        </Box>
                        {
                            categories?.map(cat => {
                                return (
                                    <Box
                                        key={cat?.id}
                                        fontSize="xl"
                                        color={cat?.id === category ? "#FCFCFC" : "teal.300"}
                                        background={cat?.id === category ? "#b9baba" : "#EDF2F7"}
                                        minW="100px"
                                        as={Button}
                                        onClick={() => handleCategoryClick(cat?.id)}
                                    >
                                        {cat?.name}
                                    </Box>
                                );
                            })
                        }
                    </Flex>
                )
            }
        </Box>
    );
};

export default Categories;