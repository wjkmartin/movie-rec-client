import { createApi, retry } from '@reduxjs/toolkit/query/react';
import { gql } from 'graphql-request';
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query';

const staggeredBaseQuery = retry(
  graphqlRequestBaseQuery({ url: 'http://localhost:4000' }),
  {
    maxRetries: 5,
  }
);

export const ratingAPI = createApi({
  reducerPath: 'ratingAPI',
  baseQuery: staggeredBaseQuery,
  tagTypes: ['movieRating'],
  endpoints: (builder) => ({
    addRating: builder.mutation({
      query: (data) => ({
        document: gql`
          mutation AddMovieRating(
            $userId: Int!
            $movieId: Int!
            $rating: Int!
          ) {
            addMovieRating(
              userId: $userId
              id: $movieId
              rating: $rating
            ) {
              userId
              id
              rating
            }
          }
        `,
        variables: {
          userId: data.userId,
          movieId: data.movieId,
          rating: data.rating,
        }
      })

    }),
  }),
});

export const { useAddRatingMutation } = ratingAPI;
