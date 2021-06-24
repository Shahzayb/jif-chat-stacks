import {useUser} from './useUser';

export function useCurrentAddress() {
  const {addresses} = useUser();
  return addresses?.testnet;
}

export function useCurrentMainnetAddress() {
  const {addresses} = useUser();
  return addresses?.mainnet;
}
