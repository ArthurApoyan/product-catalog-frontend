import { createApi } from '@reduxjs/toolkit/query/react'
import { customBaseQuery } from "src/customBaseQuery.js";

export const authApi = createApi({
        reducerPath: 'authApi',
        baseQuery: customBaseQuery,
        endpoints: (builder) => ({
            signUp: builder.mutation({
                query: (body) => ({
                    url: '/register',
                    method: 'POST',
                    data: body
                }),
            }),
            signIn: builder.mutation({
                query: (body) => ({
                    url: '/login',
                    method: 'POST',
                    data: body
                }),
                onQueryStarted: async (_, {queryFulfilled}) => {
                    const { data } = await queryFulfilled;

                    if (data?.token) {
                        localStorage.setItem('ACCESS_TOKEN', data?.token);
                    }
                }
            }),
            logout: builder.mutation({
                query: () => ({
                    url: '/logout',
                    method: 'POST'
                }),
            }),
        }),
})

export const {
    useSignUpMutation,
    useSignInMutation,
    useLogoutMutation,
} = authApi;