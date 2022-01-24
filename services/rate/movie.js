import { createApi, retry } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { gql } from 'graphql-request';

const staggeredBaseQuery = retry(
  fetchBaseQuery({ baseUrl: 'http://localhost:4000' }),
  {
    maxRetries: 5,
  }
);

export const movieAPI = createApi({
  reducerPath: 'movieAPI',
  baseQuery: staggeredBaseQuery,
  endpoints: (builder) => ({
    getNextMovieToRate: builder.query({
      query: () => ({
        document: gql`
          query Query($userId: Int!) {
            getMovie(userId: $userId) {
              id
            }
          }
        `,
        variables: {
          userId: 1, // TODO: pull user index id from redux
        },
      }),
    }),
  }),
});

export const { useGetNextMovieToRateQuery } = movieAPI;
