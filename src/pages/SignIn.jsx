import {Box, Input, FormControl, FormLabel, FormErrorMessage, Button, Text, Flex} from "@chakra-ui/react";
import {Controller, useForm} from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";
import {useSignInMutation} from "src/store/features/auth/authAPI/authAPI.js";

const SignUp = () => {

    const { control, handleSubmit, formState: { errors: err }, } = useForm();
    const [signIn] = useSignInMutation();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await signIn(data);

            if (response?.data?.token) {
                navigate('/products');
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <Box maxWidth="400px" m="auto" p={6} border="1px solid #14142B" borderRadius="md" bg="white" mt="50px">
            <Box textAlign="center" fontWeight={500}>Sign In</Box>
            <form onSubmit={handleSubmit(onSubmit)}>
                {[
                    { name: "email", label: "Email" },
                    { name: "password", label: "Password" },
                ].map(({ name, label }) => (
                    <FormControl
                        key={name}
                        isInvalid={err?.[name]}
                        mb={4}
                        position="relative"
                    >
                        <FormLabel fontWeight="bold" color="gray.700">
                            {label}
                            <Text as="span" color="red.500" ml={1}>
                                *
                            </Text>
                        </FormLabel>
                        <Controller
                            control={control}
                            name={name}
                            rules={{
                                required: {
                                    value: true,
                                    message: `${label} is required`,
                                },
                            }}
                            render={({ field }) => <Input {...field} placeholder={`Enter your ${label.toLowerCase()}`} />}
                        />
                        <FormErrorMessage>
                            {err?.[name]?.message}
                        </FormErrorMessage>
                    </FormControl>
                ))}
                <Button
                    type="submit"
                    colorScheme="teal"
                    size="lg"
                    width="full"
                    mt={6}
                    _hover={{ bg: "teal.600" }}
                >
                    Submit
                </Button>
                <Flex width="full" justifyContent="center" gap="8px" mt="16px">
                    Do not have an account?
                    <Link to={"/signUp"}>
                        <Box color={"#1769bc"}>
                            Sign Up.
                        </Box>
                    </Link>
                </Flex>
            </form>
        </Box>
    );
};

export default SignUp;