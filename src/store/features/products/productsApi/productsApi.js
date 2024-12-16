import { createApi } from '@reduxjs/toolkit/query/react'
import { customBaseQuery } from "../../../../customBaseQuery.js";

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: customBaseQuery,
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: (params) => ({
                url: `/products${params.category ? `?category=${params.category}` : params.pattern ? `?pattern=${params.pattern}` : ''}`,
                method: 'GET',
            }),
            providesTags: ['products'],
            transformResponse(response) {
                return response?.products;
            }
        }),
        getAllCategories: builder.query({
            query: () => ({
                url: '/categories',
                method: 'GET',
            }),
            providesTags: ['categories'],
            transformResponse(response) {
                return response?.categories;
            }
        }),
        getBagProducts: builder.mutation({
            query: (body) => ({
                url: '/bag-products',
                method: 'POST',
                data: body
            }),
            providesTags: ['bagProducts'],
            transformResponse(response) {
                return response?.products;
            }
        }),
    }),
})

export const {
    useLazyGetAllProductsQuery,
    useGetBagProductsMutation,
    useGetAllCategoriesQuery,
} = productsApi;