import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@chakra-ui/react";
import { clearToast } from "../store/features/toast/toastSlice";
import { toastSelector } from "../store/features/reduxSelectors.js";

let id;

const Toast = () => {
    const { toastMessage, toastOpen, toastType, toastTitleShow } = useSelector(toastSelector);

    const dispatch = useDispatch();
    const toast = useToast();

    useEffect(() => {
        if (toastOpen) {
            if (toastType === 'success') {
                toast({
                    title: toastTitleShow ? "Successfully" : "",
                    description: toastMessage,
                    status: toastType,
                    position: "bottom"
                });
            }
            if (toastType === 'error') {
                toast({
                    title: toastTitleShow ? "Invalid Request" : "",
                    description: toastMessage ?? "Something went wrong!",
                    status: toastType,
                    position: "bottom"
                });
            }
            id = setTimeout(() => dispatch(clearToast()), 3000);
        }
        return () => clearToast(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [toastOpen]);

    return <></>;
};

export { Toast };