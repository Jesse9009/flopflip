import type {
  TReconfigureAdapter,
  TAdapterContext,
  TAdapterStatus,
  TAdapterInterfaceIdentifiers,
} from '@flopflip/types';
import {
  AdapterSubscriptionStatus,
  AdapterConfigurationStatus,
} from '@flopflip/types';

import { createContext } from 'react';

const initialReconfigureAdapter: TReconfigureAdapter = () => undefined;
const initialAdapterStatus: TAdapterStatus = {
  subscriptionStatus: AdapterSubscriptionStatus.Subscribed,
  configurationStatus: AdapterConfigurationStatus.Unconfigured,
};
const createAdapterContext = (
  adapterInterfaceIdentifiers?: TAdapterInterfaceIdentifiers[],
  reconfigure?: TReconfigureAdapter,
  status?: TAdapterStatus
): TAdapterContext => ({
  adapterInterfaceIdentifiers: adapterInterfaceIdentifiers ?? [],
  reconfigure: reconfigure ?? initialReconfigureAdapter,
  status: status ?? initialAdapterStatus,
});

const initialAdapterContext = createAdapterContext();
const AdapterContext = createContext(initialAdapterContext);

const selectAdapterConfigurationStatus = (
  configurationStatus?: AdapterConfigurationStatus
) => ({
  isReady: configurationStatus === AdapterConfigurationStatus.Configured,
  isUnconfigured:
    configurationStatus === AdapterConfigurationStatus.Unconfigured,
  isConfiguring: configurationStatus === AdapterConfigurationStatus.Configuring,
  isConfigured: configurationStatus === AdapterConfigurationStatus.Configured,
});

export default AdapterContext;
export { createAdapterContext, selectAdapterConfigurationStatus };
