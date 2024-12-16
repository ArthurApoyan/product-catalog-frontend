import {useDispatch} from "react-redux";
import {Controller, useForm} from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";
import {Box, Input, FormControl, FormLabel, FormErrorMessage, Button, Text, Flex} from "@chakra-ui/react";
import {useSignUpMutation} from "../store/features/auth/authAPI/authAPI.js";
import { showToast } from '../store/features/toast/toastSlice.js';

const SignUp = () => {

    const { control, handleSubmit, formState: { errors: err }, } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [signUp, { isLoading }] = useSignUpMutation();

    const onSubmit = async (data) => {
        try {
            const response = await signUp(data);

            if (response?.data?.error) {
                dispatch(showToast({ type: 'error', message: response?.data?.error }));
            } else {
                dispatch(showToast({ type: 'success', message: 'You have created an account successfully.' }));

                await new Promise(resolve => setTimeout(resolve, 300));

                navigate("/");
            }
        } catch (err) {
            dispatch(showToast({ type: 'error', message: err.message }));
        }
    }

    return (
        <Box maxWidth="400px" m="auto" p={6} border="1px solid #14142B" borderRadius="md" bg="white" mt="50px">
            <Box textAlign="center" fontWeight={500}>Sign Up</Box>
            <form onSubmit={handleSubmit(onSubmit)}>
                {[
                    { name: "first_name", label: "First Name" },
                    { name: "last_name", label: "Last Name" },
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
                    { isLoading ? "Loading..." : "Sign Up" }
                </Button>
                <Flex width="full" justifyContent="center" gap="8px" mt="16px">
                    Have an account?
                    <Link to={"/signIn"}>
                        <Box color={"#1769bc"}>
                            Sign In.
                        </Box>
                    </Link>
                </Flex>
            </form>
        </Box>
    );
};

export default SignUp;