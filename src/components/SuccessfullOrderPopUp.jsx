import React from "react";
import {
    Button,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
    Icon,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";

const SuccessPopup = ({ isOpen, onClose, onConfirm }) => {
    const cancelRef = React.useRef();

    return (
        <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
            isCentered
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        <Icon as={CheckCircleIcon} color="green.500" boxSize={6} mr={2} />
                        Order Placed Successfully
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        Your order has been placed! Thank you for shopping with us. You will receive a confirmation email shortly.
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button colorScheme="blue" onClick={onConfirm} ml={3}>
                            Continue Shopping
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
};

export default SuccessPopup;
