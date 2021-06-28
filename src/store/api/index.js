import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {cvToHex, cvToString, hexToCV} from '@stacks/transactions';
import {principalCV} from '@stacks/transactions/dist/clarity/types/principalCV';
import {JIF_TOKEN_CONTRACT} from 'common/constants';
import {smartContractApiClient} from 'common/stacks';

const api = createApi({
  baseQuery: fetchBaseQuery({baseUrl: '/'}),

  endpoints: build => ({
    getJifBalance: build.query({
      async queryFn(address) {
        if (!address) return {data: 0};

        const [contractAddress, contractName] = JIF_TOKEN_CONTRACT.split('.');
        const data = await smartContractApiClient.callReadOnlyFunction({
          contractAddress,
          contractName,
          functionName: 'get-balance',
          readOnlyFunctionArgs: {
            sender: address,
            arguments: [cvToHex(principalCV(address || ''))],
          },
        });

        if (data.okay && data.result) {
          return {data: cvToString(hexToCV(data.result)).replace('(ok u', '').replace(')', '')};
        }
        return {data: 0};
      },
    }),
  }),
});

export const {useGetJifBalanceQuery} = api;

export default api;
