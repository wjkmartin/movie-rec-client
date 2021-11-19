import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { gql } from 'graphql-request';
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query';

export const movieAPI = createApi({
  reducerPath: 'movieAPI',
  baseQuery: graphqlRequestBaseQuery({ url: 'http://localhost:4000' }),
  endpoints: (builder) => ({
    getMovieRandom: builder.query
    ({
      query: () => ({
      document: gql`
        query TestQuery {
          getRandomMovie {
            title
            id
            IMDB_ID
            popularity
            overview
            release_date
          }
        }
      `,
      })
    })
  }),
});

export const { useGetMovieRandomQuery } = movieAPI;
