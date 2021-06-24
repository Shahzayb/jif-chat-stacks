import {mainNetwork} from 'common/stacks';
import {setAccountNames} from 'store/auth';

const STALE_TIME = 30 * 60 * 1000;

const makeKey = (networkUrl, address) => `${networkUrl}__${address}`;

function getLocalNames(networkUrl, address) {
  const key = makeKey(networkUrl, address);
  const value = localStorage.getItem(key);
  if (!value) return null;
  return JSON.parse(value);
}

function setLocalNames(networkUrl, address, data) {
  const key = makeKey(networkUrl, address);
  return localStorage.setItem(key, JSON.stringify(data));
}

async function fetchNamesByAddress(param) {
  const res = await fetch(`${param.networkUrl}/v1/addresses/stacks/${param.address}`);
  const data = await res.json();
  return data?.names || [];
}

export const getAccountNamesByAddress = address => async dispatch => {
  if (!address) return;

  if (!mainNetwork) return;

  const local = getLocalNames(mainNetwork.coreApiUrl, address);

  if (local) {
    const [names, timestamp] = local;
    const now = Date.now();
    const isStale = now - timestamp > STALE_TIME;
    if (!isStale) {
      dispatch(setAccountNames(names));
      return;
    }
  }

  try {
    const names = await fetchNamesByAddress({
      networkUrl: mainNetwork.coreApiUrl,
      address,
    });
    if (names?.length) {
      setLocalNames(mainNetwork.coreApiUrl, address, [names, Date.now()]);
    }
    dispatch(setAccountNames(names || []));
  } catch (e) {
    dispatch(setAccountNames([]));
  }
};
