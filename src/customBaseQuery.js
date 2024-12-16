import axiosClient from "src/axios-client.js";

export const customBaseQuery = async ({ url, method, data }) => {
    try {
        const response = await axiosClient({
            url,
            method,
            data,
        });

        return { data: response.data };
    } catch (error) {
        return { error: error.response || error.message };
    }
};