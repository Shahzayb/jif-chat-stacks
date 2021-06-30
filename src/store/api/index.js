import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {cvToHex, cvToJSON, cvToString, hexToCV} from '@stacks/transactions';
import {principalCV} from '@stacks/transactions/dist/clarity/types/principalCV';
import {JIF_CHAT_CONTRACT, JIF_TOKEN_CONTRACT, MESSAGE_FUNCTION} from 'common/constants';
import {accountsApiClient, smartContractApiClient, transactionsApiClient} from 'common/stacks';

const api = createApi({
  baseQuery: fetchBaseQuery({baseUrl: '/'}),

  endpoints: build => ({
    getJifBalance: build.query({
      async queryFn(address) {
        try {
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
        } catch {
          return {error: 'Failed: getJifBalance'};
        }
      },
    }),
    getJifTransactions: build.query({
      async queryFn() {
        try {
          const txs = await accountsApiClient.getAccountTransactions({
            limit: 50,
            principal: JIF_CHAT_CONTRACT,
          });
          const txids = txs.results
            .filter(
              tx =>
                tx.tx_type === 'contract_call' &&
                tx.contract_call.function_name === MESSAGE_FUNCTION &&
                tx.tx_status === 'success'
            )
            .map(tx => tx.tx_id);

          const final = await Promise.all(
            txids.map(async txId => transactionsApiClient.getTransactionById({txId}))
          );

          const feed = final.map(tx => {
            const content = tx.contract_call.function_args?.[0].repr.replace(`u"`, '').slice(0, -1);
            const attachment = tx.contract_call.function_args?.[1].repr
              .replace(`(some u"`, '')
              .slice(0, -2);

            // eslint-disable-next-line no-nested-ternary
            const contractLog = tx.events?.[0]
              ? tx.events?.[0]?.event_type === 'smart_contract_log' && tx.events?.[0].contract_log
                ? cvToJSON(hexToCV(tx.events?.[0]?.contract_log?.value?.hex))
                : null
              : null;

            return {
              content,
              attachment: attachment === 'no' ? undefined : attachment,
              sender: tx.sender_address,
              id: tx.tx_id,
              index: contractLog?.value?.index?.value,
              timestamp: tx.burn_block_time,
            };
          });
          return {data: feed};
        } catch {
          return {error: 'Failed: getJifTransactions'};
        }
      },
    }),
    getPendingJifTransactions: build.query({
      async queryFn() {
        try {
          const txs = await transactionsApiClient.getMempoolTransactionList({limit: 96});
          const heyTxs = txs.results
            .filter(
              tx =>
                tx.tx_type === 'contract_call' &&
                tx.contract_call.contract_id === JIF_CHAT_CONTRACT &&
                tx.contract_call.function_name === MESSAGE_FUNCTION &&
                tx.tx_status === 'pending'
            )
            .map(tx => tx.tx_id);

          const final = await Promise.all(
            heyTxs.map(async txId => transactionsApiClient.getTransactionById({txId}))
          );

          return {
            data:
              final.map(tx => {
                const attachment = tx.contract_call.function_args?.[1].repr
                  .replace(`(some u"`, '')
                  .slice(0, -1);

                return {
                  sender: tx.sender_address,
                  content: tx.contract_call.function_args?.[0].repr.replace(`u"`, '').slice(0, -1),
                  id: tx.tx_id,
                  attachment: attachment === 'non' ? undefined : attachment,
                  timestamp: tx.receipt_time,
                  isPending: true,
                };
              }) || [],
          };
        } catch {
          return {error: 'Failed: getPendingJifTransactions'};
        }
      },
    }),
    getGifFromGaia: build.query({
      async queryFn(url) {
        if (!url) {
          return {data: null};
        }
        try {
          const fetchRes = await fetch(url);
          const jsonRes = await fetchRes.json();
          return {data: jsonRes};
        } catch {
          return {error: 'Failed to fetch the data'};
        }
      },
    }),
  }),
});

export const {
  useGetJifBalanceQuery,
  useGetJifTransactionsQuery,
  useGetGifFromGaiaQuery,
  useGetPendingJifTransactionsQuery,
} = api;

export default api;
