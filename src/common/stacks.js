import {AppConfig, UserSession} from '@stacks/connect-react';
import {StacksMainnet, StacksTestnet} from '@stacks/network';
import {Storage} from '@stacks/storage';
import {
  AccountsApi,
  Configuration,
  SmartContractsApi,
  TransactionsApi,
} from '@stacks/blockchain-api-client';

export const appConfig = new AppConfig(['store_write', 'publish_data'], document.location.href);
export const userSession = new UserSession({appConfig});
export const storage = new Storage({userSession});

const testNetwork = new StacksTestnet();
testNetwork.coreApiUrl = 'https://stacks-node-api.regtest.stacks.co';

const mainNetwork = new StacksMainnet();
mainNetwork.coreApiUrl = 'https://stacks-node-api.stacks.co';

export const testNetworkConfig = new Configuration({basePath: testNetwork.coreApiUrl});

export const smartContractApiClient = new SmartContractsApi(testNetworkConfig);

export const accountsApiClient = new AccountsApi(testNetworkConfig);

export const transactionsApiClient = new TransactionsApi(testNetworkConfig);

export {testNetwork, mainNetwork};
