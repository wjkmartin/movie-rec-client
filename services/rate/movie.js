import { createApi, retry } from '@reduxjs/toolkit/query/react';
import { gql } from 'graphql-request';
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query';

const staggeredBaseQuery = retry(
  graphqlRequestBaseQuery({ url: 'http://localhost:4000' }),
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
