import {AppConfig, UserSession} from '@stacks/connect-react';
import {StacksMainnet, StacksTestnet} from '@stacks/network';

export const appConfig = new AppConfig(['store_write', 'publish_data'], document.location.href);
export const userSession = new UserSession({appConfig});

const testNetwork = new StacksTestnet();
testNetwork.coreApiUrl = 'https://stacks-node-api.regtest.stacks.co';

const mainNetwork = new StacksMainnet();
mainNetwork.coreApiUrl = 'https://stacks-node-api.stacks.co';

export {testNetwork, mainNetwork};
